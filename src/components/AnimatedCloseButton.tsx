import { X } from "lucide-react";
import { Button } from "./ui/button";

export function AnimatedCloseButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="size-9 aspect-square p-0 text-[color:white] hover:bg-[color:var(--hesoyam-accent)] hover:text-[color:var(--danger-red)]"
      aria-label="Close"
      {...props}
    >
      <X className="size-5" />
    </Button>

  );
}
