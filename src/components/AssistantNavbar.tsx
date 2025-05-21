import { CardHeader, CardTitle } from "./ui/card";
import { AnimatedCloseButton } from "./AnimatedCloseButton";
import { Loader } from "lucide-react";

export function AssistantNavbar({
  topic,
  loading,
  onClose,
  left,
}: {
  topic: string | null;
  loading: boolean;
  onClose: () => void;
  left?: React.ReactNode;
}) {
  let title: React.ReactNode = "Press spacebar to ask AI";
  if (loading && topic) {
    title = (
      <span className="flex items-center justify-center gap-1">
        <Loader className="animate-spin w-4 h-4 text-[color:var(--hesoyam)]" style={{ animationDuration: "1s" }} />
        <span>{topic}</span>
      </span>
    );
  } else if (loading) {
    title = (
      <span className="flex items-center justify-center gap-1">
        <Loader className="animate-spin w-4 h-4 text-[color:var(--hesoyam)]" style={{ animationDuration: "1s" }} />
      </span>
    );
  } else if (topic) {
    title = topic;
  }


  return (
    <CardHeader className="relative flex flex-row items-center py-4">
      {left}
      <CardTitle className="w-full text-center">{title}</CardTitle>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <AnimatedCloseButton onClick={onClose} />
      </div>
    </CardHeader>
  );
}
