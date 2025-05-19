import { X } from "lucide-react";
import { Button } from "./ui/button";

export function AnimatedCloseButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="!bg-transparent size-11 aspect-square p-0 text-[color:white] hover:bg-[oklch(0.9_0.05_9.75)] hover:text-[color:var(--danger-red)]"
      aria-label="Close"
      {...props}
    >
      <X className="size-5" />
    </Button>

  );
}
