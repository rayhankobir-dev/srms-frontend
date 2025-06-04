"use client"
import { Button } from "../ui/Button"
import useFullscreen from "@/hooks/useFullscreen"
import { Fullscreen, Maximize } from "lucide-react"

function ScreenToggler() {
  const { isFullscreen, toggleFullscreen } = useFullscreen()
  return (
    <Button
      className="h-10 w-10 [&_svg]:h-5 [&_svg]:w-5"
      variant="ghost"
      onClick={toggleFullscreen}
    >
      {isFullscreen ? (
        <Maximize className="text-primary" />
      ) : (
        <Fullscreen className="text-primary" />
      )}
    </Button>
  )
}

export default ScreenToggler
