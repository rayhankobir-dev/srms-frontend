import { cookies } from "next/headers"
import { ThemeProvider } from "next-themes"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarProvider } from "@/components/ui/Sidebar"
import Header from "@/components/layout/Header"

async function HomeLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <ThemeProvider
      defaultTheme="system"
      disableTransitionOnChange
      attribute="class"
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <div className="w-full max-w-full overflow-hidden">
          <Header />
          <main className="py-4">{children}</main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default HomeLayout
