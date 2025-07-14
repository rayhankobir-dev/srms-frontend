"use client";

import { IOrder, ITable } from "@/types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  header: { marginBottom: 20 },
  logo: { width: 80, height: 80, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  section: { marginBottom: 10 },
  tableHeader: { flexDirection: "row", borderBottom: 1, marginBottom: 4 },
  tableRow: { flexDirection: "row", marginBottom: 4 },
  cell: { flex: 1 },
  bold: { fontWeight: "bold" },
});

type Props = {
  order: IOrder;
  table: ITable;
};

export default function InvoicePDF({ order, table }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Order Invoice</Text>
          <Text>Table: {table.name}</Text>
          <Text>
            Assigned to: {table.assignedStaff.firstName}{" "}
            {table.assignedStaff.lastName}
          </Text>
          <Text>
            Date:{" "}
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : new Date().toLocaleString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={{ marginBottom: 6, fontWeight: "bold" }}>
            Ordered Items
          </Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.bold]}>Item</Text>
            <Text style={[styles.cell, styles.bold]}>Quantity</Text>
            <Text style={[styles.cell, styles.bold]}>Unit</Text>
            <Text style={[styles.cell, styles.bold]}>Price</Text>
          </View>

          {order.items?.length > 0 ? (
            order.items.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.cell}>{item.menu.itemName}</Text>
                <Text style={styles.cell}>{item.quantity}</Text>
                <Text style={styles.cell}>{item.unit}</Text>
                <Text style={styles.cell}>
                  ৳ {item.unitPrice?.toFixed(2) ?? "0.00"}
                </Text>
              </View>
            ))
          ) : (
            <Text>No items found.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text>Tax: ৳ {order.taxAmount}</Text>
          <Text>Discount: ৳ {order.discountAmount}</Text>
          <Text>Grand Total: ৳ {order.totalAmount}</Text>
        </View>
      </Page>
    </Document>
  );
}
