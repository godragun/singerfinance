import React from 'react';
import './PrintLayout.css';

interface SaleItem {
  modelNumber: string;
  itemName: string;
  cashPrice: number;
  rental: number;
  term: number;
}

interface PrintLayoutProps {
  saleData?: {
    invoiceNo: string;
    date: string;
    customerName: string;
    institution: string;
    epfNumber: string;
    contactNumber: string;
    items: SaleItem[];
    totalCashPrice: number;
    totalRental: number;
    term: number;
    interestRate: number;
  } | null;
}

export const PrintLayout: React.FC<PrintLayoutProps> = ({ saleData }) => {
  if (!saleData) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className="print-layout">
      <div className="a4-invoice">
        {/* Header */}
        <div className="invoice-header">
          <div className="invoice-title">
            <h2>Financed by Singer Finance (Lanka) PLC.</h2>
            <p>No. 498, R. A. De Mel Mawatha, Colombo 03.</p>
            <p>Tel : 0112 400 400</p>
          </div>
          <div className="invoice-number">
            <span className="no-label">N°</span>
            <span className="no-value">{saleData.invoiceNo || '19471'}</span>
          </div>
        </div>

        {/* Customer Information Section */}
        <div className="customer-info">
          <div className="info-row">
            <label>Institution</label>
            <span className="info-value">
              {saleData.institution}
            </span>
            <label className="epf-label">EPF Number :</label>
            <span className="info-box">{saleData.epfNumber}</span>
          </div>

          <div className="info-row">
            <label>Customer Name</label>
            <span className="info-value">
              {saleData.customerName}
            </span>
            <label className="date-label">Date</label>
            <span className="date-input">{formatDate(saleData.date)}</span>
          </div>

          <div className="info-row">
            <label>Contact Number</label>
            <span className="info-value">
              {saleData.contactNumber}
            </span>
          </div>
        </div>

        {/* Items Table */}
        <table className="items-table">
          <thead>
            <tr>
              <th className="col-num">#</th>
              <th className="col-item">ITEM</th>
              <th className="col-model">MODEL</th>
              <th className="col-cash-price">CASH PRICE<br />Rs</th>
              <th className="col-rental">RENTAL</th>
              <th className="col-term">TERM</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => {
              const item = saleData.items[index];
              return (
                <tr key={index}>
                  <td className="col-num">{index + 1}</td>
                  <td className="col-item">{item?.itemName || ''}</td>
                  <td className="col-model">{item?.modelNumber || ''}</td>
                  <td className="col-cash-price">
                    {item ? item.cashPrice.toLocaleString('en-LK') : ''}
                  </td>
                  <td className="col-rental">
                    {item ? item.rental.toFixed(2) : ''}
                  </td>
                  <td className="col-term">{item?.term || ''}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Total Section */}
        <div className="total-section">
          <div className="total-row">
            <span className="total-label">TOTAL</span>
            <div className="total-line"></div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="summary-section">
          <div className="summary-left">
            <div className="summary-item">
              <label>Total Rental<br />(Monthly)</label>
              <span className="summary-box">{saleData.totalRental.toFixed(2)}</span>
            </div>

            <div className="summary-item">
              <label>Term</label>
              <div className="term-box">
                <span className="term-value">{saleData.term}</span>
                <span className="term-unit">M</span>
              </div>
            </div>

            <div className="summary-item">
              <label>Interest Rate<br />(Nominal)</label>
              <div className="rate-box">
                <span className="rate-value">{saleData.interestRate.toFixed(2)}</span>
                <span className="rate-unit">%</span>
              </div>
            </div>
          </div>

          <div className="summary-right">
            <div className="showroom-box">
              <p><strong>Singer Showroom</strong></p>
              <p>Details</p>
            </div>

            <div className="company-box">
              <p><strong>Singer Finance (Lanka) PLC</strong></p>
              <p>No. 91, New Galle Road,</p>
              <p>Moratuwa.</p>
              <p>Tel: 0112-647855 / 0755-144000</p>
            </div>
          </div>
        </div>

        {/* Offer Letter Section */}
        <div className="offer-letter-section">
          <h3>Offer Letter Group sale Facility</h3>
          <ol className="terms-list-compact">
            <li><strong>Facility Amount</strong> : As mentioned in the Invoice2. <strong>Rental</strong> : As mentioned in the Invoice3. <strong>Interest Rate</strong> : As mentioned in the Invoice4. <strong>Default Rate</strong> : Not Applicable5. <strong>Security Offered,</strong> (i) Items describe in the invoice (ii) Personal guarantee of two employees in the institute6. <strong>Due date</strong> : Informing via SMS</li>
          </ol>
          <p className="general-conditions-compact"><strong>General Conditions</strong><br/>1. We reserve the right to include/pass on any new taxes/levies imposed by the government by time to time. 2. If the customer changes the current employment should be notified to the Singer Finance (Lanka) PLC. 3. The company reserves the right to review facility at its sole discretion from time to time and discontinue or vary the terms and conditions relating thereto including but not limited to the interest in default. 4. The facilities hereunder shall be available to you only on perfection of the security documents. 5. In addition to the above stated terms and conditions, the facility contains herein shall be subject to all clauses, terms and condition stipulated in the agreement and other contractual documents already executed by you and any other such documents which may be required to be executed by you in the future. 6. All expenses, stamp duty, legal and other charges in this connection will be borne by you. 7. Singer finance is not liable for the defects or title of the items described in the invoice and defects of the item or title of the ownership of the item will not be affected to the repayment of the monthly instalments.</p>
          <p className="validity-note">This offer is valid only for 07 days.</p>
        </div>
      </div>
    </div>
  );
};

export default PrintLayout;
