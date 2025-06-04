import {
  Tooltip as MainToolTip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/Tooltip"

function Tooltip({
  children,
  content,
}: {
  children: React.ReactNode
  content: string
}) {
  return (
    <MainToolTip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </MainToolTip>
  )
}

export default Tooltip
