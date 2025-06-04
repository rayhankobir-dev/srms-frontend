"use client"
import CafeTable from "@/components/shared/CafeTable"
import { Button } from "@/components/ui/Button"
import { Plus } from "lucide-react"
import { useParams } from "next/navigation"
import React from "react"

function BreakfastPage() {
  const params = useParams()
  const tables = [
    {
      name: "Table 1",
    },
    {
      name: "Table 2",
    },
    {
      name: "Table 3",
    },
    {
      name: "Table 4",
    },
    {
      name: "Table 5",
    },
    {
      name: "Table 6",
    },
  ]

  const addTable = async () => {
    alert("Added")
  }

  return (
    <div className="px-4">
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-medium capitalize">{params.category}</h2>
          <p className="font-light">Please make sure right table</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tables.map((table) => (
            <CafeTable key={table.name} />
          ))}
          <Button onClick={addTable} variant="secondary" className="gap-2">
            <Plus size={30} />
            <span className="text-lg">Add Table</span>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default BreakfastPage
