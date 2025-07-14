"use client";

import React from "react";
import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";
import { IOrder, ITable } from "@/types";

type Props = {
  order: IOrder;
  table: ITable;
};

export default function PrintInvoice({ order, table }: Props) {
  // const handlePrint = async () => {
  //   try {
  //     const blob = await pdf(
  //       <InvoicePDF order={order} table={table} />
  //     ).toBlob();
  //     const blobURL = URL.createObjectURL(blob);

  //     const iframe = document.createElement("iframe");
  //     iframe.style.display = "none";
  //     iframe.src = blobURL;
  //     document.body.appendChild(iframe);

  //     iframe.onload = () => {
  //       setTimeout(() => {
  //         iframe.contentWindow?.focus();
  //         iframe.contentWindow?.print();

  //         // Clean up
  //         URL.revokeObjectURL(blobURL);
  //         document.body.removeChild(iframe);
  //       }, 1000); // Increased delay to ensure iframe loads
  //     };
  //   } catch (error) {
  //     console.error("Print failed:", error);
  //   }
  // };

  const handleDownload = async () => {
    const blob = await pdf(<InvoicePDF order={order} table={table} />).toBlob();
    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "invoice.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobURL);
  };

  return (
    <button
      onClick={handleDownload}
      type="button"
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      🖨️ Print Invoice
    </button>
  );
}
