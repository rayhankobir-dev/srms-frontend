import { Button } from "../ui/Button"
import { Bell, Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover"

type NotificationType = "warning" | "success" | "info"

interface Notification {
  type: NotificationType
  message: string
  timestamp: Date
}

const notifications: Notification[] = [
  {
    type: "warning",
    message: "Your subscription is expiring soon",
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
  },
  {
    type: "success",
    message: "Your profile has been updated successfully",
    timestamp: new Date(Date.now() - 20 * 60000), // 20 minutes ago
  },
  {
    type: "info",
    message: "New feature: Dark mode is now available",
    timestamp: new Date(Date.now() - 60 * 60000), // 1 hour ago
  },
  {
    type: "warning",
    message: "Your subscription is expiring soon",
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
  },
  {
    type: "success",
    message: "Your profile has been updated successfully",
    timestamp: new Date(Date.now() - 20 * 60000), // 20 minutes ago
  },
  {
    type: "info",
    message: "New feature: Dark mode is now available",
    timestamp: new Date(Date.now() - 60 * 60000), // 1 hour ago
  },
]

function NotificationPreviewer() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="relative h-10 w-10 [&_svg]:h-6 [&_svg]:w-6"
          variant="ghost"
        >
          <span className="absolute -top-0.5 right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[0.7rem] text-white">
            10
          </span>
          <Bell className="text-primary" size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="flex w-full max-w-sm flex-col gap-4 overflow-hidden md:max-w-xl"
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-medium">Notifications</h2>
          <Button className="h-fit p-0">Mark all read</Button>
        </div>

        <div className="flex max-h-[400px] flex-col gap-2 overflow-y-scroll">
          {notifications.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-sm border px-3 py-2"
            >
              <Info className="text-primary" />
              <div>
                <h2 className="text-foreground text-sm font-medium">
                  {item.message}
                </h2>
                <small className="text-xs">
                  {item.timestamp.toLocaleTimeString()}
                </small>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost">View all</Button>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationPreviewer
