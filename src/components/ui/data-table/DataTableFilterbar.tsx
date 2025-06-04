"use client"

import { Input } from "../Input"
import { Button } from "../Button"
import { useRef, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

interface FilterBarProps {
  globalFilter: string
  setGlobalFilter: (value: string) => void
  registeredOnly: boolean
  setRegisteredOnly: (checked: boolean) => void
}

export function Filterbar({
  globalFilter,
  setGlobalFilter,
}: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState(globalFilter)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const debouncedSetGlobalFilter = useDebouncedCallback((value) => {
    setGlobalFilter(value)
  }, 300)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
    debouncedSetGlobalFilter(value)
  }

  const handleClear = () => {
    setSearchTerm("")
    setGlobalFilter("")
    searchInputRef.current?.focus()
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg bg-gray-50/50 p-6 ring-1 ring-gray-200 dark:bg-[#090E1A] dark:ring-gray-800">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row">
        <Input
          ref={searchInputRef}
          className="w-full sm:w-96"
          type="search"
          placeholder="Search all columns..."
          value={searchTerm ?? ""}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            onClick={handleClear}
            className="border border-gray-200 px-2.5 font-semibold text-blue-500 sm:border-none sm:py-1 dark:border-gray-800 dark:text-blue-500"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2.5"></div>
    </div>
  )
}
