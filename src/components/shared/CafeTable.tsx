/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import React from "react"
import { Card } from "../ui/Card"

function CafeTable({}) {
  return (
    <Link href="/dining/breakfast/1">
      <Card className="flex flex-col items-center p-3">
        <img
          className="h-24 w-24"
          src="/images/cafe-table.png"
          alt="cafe table"
        />
        <h1 className="font-medium">Cafe Table</h1>
      </Card>
    </Link>
  )
}

export default CafeTable
