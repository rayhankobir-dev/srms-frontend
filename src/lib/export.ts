/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export function exportToExcel(data: any[]) {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
  const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" })
  saveAs(dataBlob, `data.xlsx`)
}

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export const exportTableToPDF = (data: any[], columns: any[]) => {
  const doc = new jsPDF()

  const companyName =
    process.env.NEXT_COMPANY_NAME ||
    process.env.NEXT_PUBLIC_COMPANY_NAME ||
    "কাচ্চি ভাই"
  const currentDate = new Date().toLocaleString()

  doc.setFontSize(16)
  doc.text(companyName, 14, 20)

  doc.setFontSize(11)
  doc.text(`Report at: ${currentDate}`, 14, 28)

  const tableColumn = columns
    .filter((col: any) => col.accessorKey)
    .map((col: any) => {
      if (typeof col.header === "function") {
        const headerElement = col.header()
        if (typeof headerElement === "string") return headerElement
        if (typeof headerElement?.props?.children === "string")
          return headerElement.props.children
        return col.accessorKey
      }
      return col.header ?? col.accessorKey
    })

  const tableRows = data.map((row: any) =>
    columns
      .filter((col: any) => col.accessorKey)
      .map((col: any) => row[col.accessorKey]),
  )

  autoTable(doc, {
    startY: 35,
    head: [tableColumn],
    body: tableRows,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
    },
  })

  doc.save("report.pdf")
}
