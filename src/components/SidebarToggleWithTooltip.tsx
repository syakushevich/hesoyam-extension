import { MessagesSquare } from "lucide-react";
import { Toggle } from "./ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function SidebarToggleWithTooltip({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: (open: boolean) => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="p-2" asChild>
          <div>
            <Toggle
              className="group size-9 p-0 hover:bg-[color:var(--hesoyam-accent)] hover:text-[color:var(--hesoyam)] data-[state=on]:bg-[color:var(--hesoyam-accent)] data-[state=on]:text-[color:var(--hesoyam)]"
              aria-label={open ? "Hide transcript" : "Show transcript"}
              pressed={open}
              onPressedChange={onToggle}
            >
              <MessagesSquare className="size-5" aria-hidden="true" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">
          <p>{open ? "Show transcript" : "Hide transcript"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
