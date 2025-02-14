import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Info } from "lucide-react";

type NotificationType = "warning" | "success" | "info";

interface Notification {
  type: NotificationType;
  message: string;
  timestamp: Date;
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
];

function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="relative h-10 w-10 [&_svg]:h-5 [&_svg]:w-5"
          variant="ghost"
          size="icon"
        >
          <span className="absolute -top-0.5 right-1 w-5 h-5 inline-flex items-center justify-center bg-green-600 rounded-full text-[0.7rem] text-white">
            10
          </span>
          <Bell className="text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="w-full max-w-sm md:max-w-xl flex flex-col gap-4 overflow-hidden"
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-medium">Notifications</h2>
          <Button className="h-fit p-0" variant="link">
            Mark all read
          </Button>
        </div>

        <div className="max-h-[400px] flex flex-col gap-2 overflow-y-scroll">
          {notifications.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-3 py-2 border rounded-sm"
            >
              <Info className="text-primary" />
              <div>
                <h2 className="font-medium text-sm text-foreground">
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
  );
}

export default Notifications;
