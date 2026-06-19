import React from 'react';
import type { Sale } from '../../types';

interface PrintLayoutProps {
  sale: Partial<Sale>;
}

export const PrintLayout: React.FC<PrintLayoutProps> = ({ sale }) => {
  if (!sale) return null;

  // Split date string "YYYY-MM-DD" into digits
  const dateStr = sale.date || '';
  const parts = dateStr.split('-');
  const y1 = parts[0]?.[0] || '';
  const y2 = parts[0]?.[1] || '';
  const y3 = parts[0]?.[2] || '';
  const y4 = parts[0]?.[3] || '';
  const m1 = parts[1]?.[0] || '';
  const m2 = parts[1]?.[1] || '';
  const d1 = parts[2]?.[0] || '';
  const d2 = parts[2]?.[1] || '';

  // Make sure we have 5 rows exactly
  const rows = Array.from({ length: 5 }, (_, index) => {
    const item = sale.items?.[index];
    return {
      index: index + 1,
      itemName: item?.itemName || '',
      modelNumber: item?.modelNumber || '',
      cashPrice: item?.cashPrice 
        ? item.cashPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
        : '',
      rental: item?.rental 
        ? item.rental.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
        : '',
      term: item?.term ? `${item.term}` : '',
    };
  });

  return (
    <div className="print-only hidden print:block text-black bg-white p-4 w-[210mm] min-h-[297mm] mx-auto text-[10px] leading-snug font-serif">
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }
          body {
            background: white !important;
            color: black !important;
          }
          .print-only {
            display: block !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
      
      {/* Top Part: Invoice Border Box */}
      <div className="border-[1.5px] border-black p-3 mb-2 rounded-none relative">
        {/* Header Details */}
        <div className="text-center pb-2 mb-3 border-b border-black">
          <div className="absolute right-4 top-2 text-red-600 font-bold text-base font-serif">
            <span className="text-[12px] font-normal text-red-600 mr-2 font-sans">Nº</span>
            <span className="font-bold text-red-600 font-serif text-[15px] tracking-wider">
              {sale.invoiceNo ? sale.invoiceNo.replace('SF-', '') : '      '}
            </span>
          </div>
          <h2 className="text-[14px] font-bold tracking-wide font-serif">Financed by Singer Finance (Lanka) PLC</h2>
          <p className="text-[9px] font-serif font-semibold mt-0.5">No. 498, R. A. De Mel Mawatha, Colombo 03.</p>
          <p className="text-[9px] font-serif font-semibold">Tel : 0112 400 400</p>
        </div>

        {/* Metadata Details Grid */}
        <div className="flex justify-between items-start gap-4 mb-3">
          {/* Left Fields */}
          <div className="flex-1 flex flex-col gap-2.5 font-serif text-[10px]">
            <div className="flex items-end">
              <span className="font-normal w-24 whitespace-nowrap">Institution</span>
              <span className="font-normal pr-2">:</span>
              <div className="flex-1 border-b border-dotted border-black min-h-[14px] pl-1 font-sans font-semibold text-[10px]">
                {sale.institution || ''}
              </div>
            </div>
            <div className="flex items-end">
              <span className="font-normal w-24 whitespace-nowrap">Customer Name</span>
              <span className="font-normal pr-2">:</span>
              <div className="flex-1 border-b border-dotted border-black min-h-[14px] pl-1 font-sans font-semibold text-[10px]">
                {sale.customerName || ''}
              </div>
            </div>
            <div className="flex items-end">
              <span className="font-normal w-24 whitespace-nowrap">Contact Number</span>
              <span className="font-normal pr-2">:</span>
              <div className="flex-1 border-b border-dotted border-black min-h-[14px] pl-1 font-sans font-semibold text-[10px]">
                {sale.contactNumber || ''}
              </div>
            </div>
          </div>

          {/* Right EPF & Date Boxes */}
          <div className="flex flex-col gap-2.5 items-end">
            <div className="flex items-center gap-2">
              <span className="font-normal text-[9px] uppercase">EPF Number :</span>
              <div className="border border-black w-[130px] h-[32px] flex items-center justify-center font-sans font-bold text-xs tracking-wide bg-white">
                {sale.epfNumber || ''}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-normal text-[9px] uppercase w-[60px] text-right">Date :</span>
              <div className="flex border border-black text-[9px] divide-x divide-black h-7 items-center bg-white">
                <div className="w-[15px] text-center flex flex-col justify-between h-full py-0.5">
                  <span className="text-[5px] leading-none text-gray-500 font-sans font-semibold">DD</span>
                  <span className="font-sans font-bold text-[9px] leading-none">{d1 || ' '}</span>
                </div>
                <div className="w-[15px] text-center flex flex-col justify-between h-full py-0.5">
                  <span className="text-[5px] leading-none text-gray-500 font-sans font-semibold">DD</span>
                  <span className="font-sans font-bold text-[9px] leading-none">{d2 || ' '}</span>
                </div>
                <div className="w-[15px] text-center flex flex-col justify-between h-full py-0.5">
                  <span className="text-[5px] leading-none text-gray-500 font-sans font-semibold">MM</span>
                  <span className="font-sans font-bold text-[9px] leading-none">{m1 || ' '}</span>
                </div>
                <div className="w-[15px] text-center flex flex-col justify-between h-full py-0.5">
                  <span className="text-[5px] leading-none text-gray-500 font-sans font-semibold">MM</span>
                  <span className="font-sans font-bold text-[9px] leading-none">{m2 || ' '}</span>
                </div>
                <div className="w-[15px] text-center flex flex-col justify-between h-full py-0.5">
                  <span className="text-[5px] leading-none text-gray-500 font-sans font-semibold">YYYY</span>
                  <span className="font-sans font-bold text-[8px] leading-none">{y1 || ' '}</span>
                </div>
                <div className="w-[15px] text-center flex flex-col justify-between h-full py-0.5">
                  <span className="text-[5px] leading-none text-gray-500 font-sans font-semibold">YYYY</span>
                  <span className="font-sans font-bold text-[8px] leading-none">{y2 || ' '}</span>
                </div>
                <div className="w-[15px] text-center flex flex-col justify-between h-full py-0.5">
                  <span className="text-[5px] leading-none text-gray-500 font-sans font-semibold">YYYY</span>
                  <span className="font-sans font-bold text-[8px] leading-none">{y3 || ' '}</span>
                </div>
                <div className="w-[15px] text-center flex flex-col justify-between h-full py-0.5">
                  <span className="text-[5px] leading-none text-gray-500 font-sans font-semibold">YYYY</span>
                  <span className="font-sans font-bold text-[8px] leading-none">{y4 || ' '}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Item Table */}
        <table className="w-full border-collapse border border-black text-center text-[9px] mb-2 font-serif">
          <thead>
            <tr className="h-6">
              <th className="border border-black p-1 w-6"></th>
              <th className="border border-black p-1 text-center w-72">ITEM</th>
              <th className="border border-black p-1 text-center w-[150px]">MODEL</th>
              <th className="border border-black p-1 text-center w-[120px]">
                <div>CASH PRICE</div>
                <div className="text-[8px] font-normal leading-none mt-0.5">Rs</div>
              </th>
              <th className="border border-black p-1 text-center w-[100px]">RENTAL</th>
              <th className="border border-black p-1 text-center w-[80px]">TERM</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.index} className="h-6">
                <td className="border border-black p-1 text-center font-serif">{row.index}</td>
                <td className="border border-black p-1 text-left pl-2 font-sans text-[9px] font-semibold">{row.itemName}</td>
                <td className="border border-black p-1 text-center font-sans text-[9px] font-semibold">{row.modelNumber}</td>
                <td className="border border-black p-1 text-right pr-2 font-sans">{row.cashPrice}</td>
                <td className="border border-black p-1 text-right pr-2 font-sans">{row.rental}</td>
                <td className="border border-black p-1 text-center font-sans">{row.term}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL UNDERLINE SECTION */}
        <div className="flex justify-between items-center mb-3 font-serif text-[10px]">
          <div className="w-[498px] text-right font-bold tracking-wider pr-10">TOTAL</div>
          <div className="flex text-right font-sans font-bold text-[9px]">
            <div className="w-[120px] pr-2 border-b-[2.5px] border-double border-black">
              {sale.totalCashPrice 
                ? sale.totalCashPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                : '0.00'}
            </div>
            <div className="w-[100px] pr-2 border-b-[2.5px] border-double border-black">
              {sale.totalRentalMonthly 
                ? sale.totalRentalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                : '0.00'}
            </div>
          </div>
          <div className="w-[80px]"></div>
        </div>

        {/* Totals boxes and Signatures */}
        <div className="flex justify-between items-stretch gap-4 mt-2">
          {/* Left Values Stack */}
          <div className="flex flex-col gap-2 justify-center font-serif text-[9.5px]">
            <div className="flex items-center gap-2">
              <span className="w-32 font-normal leading-tight">Total Rental<br />(Monthly)</span>
              <div className="border border-black px-2 py-1 w-[90px] h-[26px] text-right font-sans font-bold text-xs flex items-center justify-end bg-white">
                {sale.totalRentalMonthly 
                  ? sale.totalRentalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                  : '0.00'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-32 font-normal">Term</span>
              <div className="flex items-center gap-1.5">
                <div className="border border-black px-2 py-1 w-[50px] h-[26px] text-center font-sans font-bold text-xs flex items-center justify-center bg-white">
                  {sale.overallTerm || '0'}
                </div>
                <span className="font-bold text-xs">M</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-32 font-normal leading-tight">Interest Rate<br />(Nominal)</span>
              <div className="flex items-center gap-1.5">
                <div className="border border-black px-2 py-1 w-[70px] h-[26px] text-center font-sans font-bold text-[10px] flex items-center justify-center bg-white">
                  {sale.interestRate ? `${(sale.interestRate * 100).toFixed(3)}` : '0.000'}
                </div>
                <span className="font-bold text-xs">%</span>
              </div>
            </div>
          </div>

          {/* Supplier Stamp Box */}
          <div className="flex-1 border border-black p-2 h-24 text-center font-serif relative flex flex-col justify-end rounded-none bg-white">
            <span className="absolute top-1 left-2 text-[8px] text-gray-500 font-bold uppercase tracking-wider">Supplier Details</span>
            
            {/* Custom Stamp rendering */}
            <div className="flex-1 flex flex-col justify-center text-indigo-700 font-sans font-bold uppercase text-[8px] border-[1px] border-dashed border-indigo-400 p-1 rounded-sm bg-indigo-50/20 transform -rotate-1 max-w-[210px] mx-auto w-full mb-1">
              <div>SINGER Showroom</div>
              <div className="text-[7.5px] leading-tight mt-0.5">No. 91, New Galle Road,</div>
              <div className="text-[7.5px] leading-tight">Moratuwa.</div>
              <div className="text-[7.5px] leading-tight">(Opposite NSB Bank)</div>
              <div className="text-[7px] font-normal leading-none mt-0.5">Tel: 0112-647856 / 0755-144000</div>
            </div>

            <div className="border-t border-dotted border-gray-600 w-11/12 mx-auto pt-0.5 text-black font-semibold text-[8px]">Authorized Signature & Stamp</div>
          </div>

          {/* Singer Finance Box */}
          <div className="flex-1 border border-black p-2 h-24 text-center font-serif relative flex flex-col justify-end rounded-none bg-white">
            <span className="absolute top-1 left-2 text-[8px] text-gray-500 font-bold uppercase tracking-wider">Singer Finance (Lanka) PLC</span>
            <div className="border-t border-dotted border-gray-600 w-11/12 mx-auto pt-0.5 text-black font-semibold text-[8px] mb-1">Authorized Signatory</div>
          </div>
        </div>
      </div>

      {/* Double Separator Line */}
      <div className="border-t-[3px] border-double border-black my-2 w-full"></div>

      {/* Bottom Part: Offer Letter Border Box */}
      <div className="border-[1.5px] border-black p-3 rounded-none text-[8.5px] leading-relaxed font-serif bg-white">
        <h3 className="text-center font-serif text-[11px] font-bold uppercase tracking-wider mb-2">Offer Letter Group sale Facility</h3>
        
        {/* Detail List */}
        <div className="grid grid-cols-[110px_10px_auto] gap-y-0.5 mb-2 font-serif text-[8.5px]">
          <div className="font-bold">1. Facility Amount</div>   <div>:</div> <div>As mentioned in the invoice</div>
          <div className="font-bold">2. Rental</div>            <div>:</div> <div>As mentioned in the invoice</div>
          <div className="font-bold">3. Interest Rate</div>     <div>:</div> <div>As mentioned in the invoice</div>
          <div className="font-bold">4. Default Rate</div>      <div>:</div> <div>Not Applicable</div>
          
          <div className="font-bold col-span-3">5.Security Offered,</div>
          <div className="pl-3 col-span-3">
            <div>(I) Items describe in the invoice</div>
            <div>(ii) Personal guarantee of two employees in the institute</div>
          </div>
          
          <div className="font-bold">6. Due date</div>           <div>:</div> <div>Informing via SMS</div>
        </div>

        {/* General Conditions */}
        <h4 className="font-bold text-[9px] uppercase mt-2 mb-0.5">General Conditions</h4>
        <ol className="list-decimal pl-4 space-y-0.5 text-justify font-serif text-[8.5px]">
          <li>We reserve the right to include/pass on any new taxes/levies imposed by the government by time to time.</li>
          <li>If the customer changes the current employment should be notified to the Singer Finance (Lanka) PLC.</li>
          <li>The company reserves the right to review facility at its sole discretion from time to time and discontinue or vary the terms and conditions relating thereto including but not limited to the interest in default.</li>
          <li>The facilities hereunder shall be available to you only on perfection of the security documents.</li>
          <li>In additional to the above stated terms and conditions, the facility contains herein shall be subject to all clauses, terms and condition stipulated in the agreement and other contractual documents already executed by you and any other documents which may be required to be executed by you in the future.</li>
          <li>All expenses, stamp duty, legal and other charges in this connection will be borne by you,</li>
          <li>Singer finance is not liable for the defects or title of the items described in the invoice and defects of the item or title of the ownership of the item will not affect the obligation to the repayment of the monthly instalments.</li>
        </ol>

        {/* Validity and Acceptance Footer */}
        <div className="mt-2.5 pt-2 border-t border-gray-300 space-y-1.5 text-[8.5px] font-serif">
          <p className="font-semibold">This offer is valid only for 07 days.</p>
          <p className="text-justify leading-normal">
            Please return the attached copy of this letter duly signed thereby indicating your understanding and acceptance of the terms and condition under which this facility is granted and of the security which is stipulated herein.
          </p>
          
          <div className="flex justify-between items-end pt-3">
            <div className="leading-tight">
              <p>We look forward to a manually beneficial relationship.</p>
              <p className="mt-3">Your faithfully,</p>
              <p className="font-bold mt-1">Singer Finance (Lanka) PLC</p>
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <div className="border-t border-black w-56"></div>
              <div className="font-bold text-[8px] text-center w-56 pt-0.5 leading-none">
                Accepted the terms and conditions of the facility
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintLayout;
