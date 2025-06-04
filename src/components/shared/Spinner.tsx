import { Loader2Icon } from "lucide-react"
import React from "react"

function Spinner({ loadingText }: { loadingText: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Loader2Icon className="animate-spin" />
      {loadingText}
    </span>
  )
}

export default Spinner
