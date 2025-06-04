"use client"
import { Button } from "../ui/Button"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

function ThemeToggler() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      className="text-primary hover:text-primary h-10 w-10 p-0 [&_svg]:h-5 [&_svg]:w-5"
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

export default ThemeToggler
