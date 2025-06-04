"use client"
import Order from "@/components/shared/Order"
import { useParams } from "next/navigation"

export default function OrderPage() {
  const params = useParams()
  const category = params.category
  const table = params.table

  return (<div className="space-y-6">
      <div className="px-4">
        <h2 className="text-xl font-medium capitalize">{category}</h2>
        <p>Table: {table}</p>
      </div>

      <section>
        <Order />
      </section>
    </div>)
}