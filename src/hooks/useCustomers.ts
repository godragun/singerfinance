import { useEffect, useState } from 'react';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, writeBatch, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import type { Customer } from '../types';

export const useCustomers = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const local = localStorage.getItem('sf_customers');
    return local ? JSON.parse(local) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setCustomers([]);
      setLoading(false);
      return;
    }

    // Scoped to /users/{uid}/customers
    const customersRef = collection(db, 'users', user.uid, 'customers');
    const q = query(customersRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: Customer[] = [];
        snapshot.forEach((doc) => {
          list.push(doc.data() as Customer);
        });
        // Sort customers alphabetically by customerName
        list.sort((a, b) => a.customerName.localeCompare(b.customerName));
        localStorage.setItem('sf_customers', JSON.stringify(list));
        setCustomers(list);
        setLoading(false);
      },
      (err) => {
        console.error('Error listening to customers:', err);
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const addCustomer = async (customer: Customer) => {
    if (!user) throw new Error('User not authenticated');
    // epfNumber is the unique string (primary key)
    const docRef = doc(db, 'users', user.uid, 'customers', customer.epfNumber);
    await setDoc(docRef, customer);

    setCustomers((prev) => {
      const updated = [...prev.filter(c => c.epfNumber !== customer.epfNumber), customer];
      updated.sort((a, b) => a.customerName.localeCompare(b.customerName));
      localStorage.setItem('sf_customers', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteCustomer = async (epfNumber: string) => {
    if (!user) throw new Error('User not authenticated');
    const docRef = doc(db, 'users', user.uid, 'customers', epfNumber);
    await deleteDoc(docRef);

    setCustomers((prev) => {
      const updated = prev.filter((c) => c.epfNumber !== epfNumber);
      localStorage.setItem('sf_customers', JSON.stringify(updated));
      return updated;
    });
  };

  const bulkAddCustomers = async (customerList: Customer[]) => {
    if (!user) throw new Error('User not authenticated');
    
    // Chunk into batches of 500 documents
    const chunkSize = 500;
    for (let i = 0; i < customerList.length; i += chunkSize) {
      const chunk = customerList.slice(i, i + chunkSize);
      const batch = writeBatch(db);
      
      chunk.forEach((cust) => {
        const docRef = doc(db, 'users', user.uid, 'customers', cust.epfNumber);
        batch.set(docRef, cust);
      });
      
      await batch.commit();
    }

    setCustomers((prev) => {
      const map = new Map(prev.map(c => [c.epfNumber, c]));
      customerList.forEach(c => map.set(c.epfNumber, c));
      const updated = Array.from(map.values());
      updated.sort((a, b) => a.customerName.localeCompare(b.customerName));
      localStorage.setItem('sf_customers', JSON.stringify(updated));
      return updated;
    });
  };

  const clearAllCustomers = async () => {
    if (!user) throw new Error('User not authenticated');
    
    const customersRef = collection(db, 'users', user.uid, 'customers');
    const snapshot = await getDocs(customersRef);
    const docs = snapshot.docs;
    
    const chunkSize = 500;
    for (let i = 0; i < docs.length; i += chunkSize) {
      const chunk = docs.slice(i, i + chunkSize);
      const batch = writeBatch(db);
      
      chunk.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });
      
      await batch.commit();
    }

    setCustomers([]);
    localStorage.removeItem('sf_customers');
  };

  return { customers, loading, error, addCustomer, deleteCustomer, bulkAddCustomers, clearAllCustomers };
};
