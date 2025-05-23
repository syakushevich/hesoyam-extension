import { Card, CardContent } from "./ui/card";
import type { CaptionLine } from "../hooks/useLiveCaptions";

export function CaptionsSidebar({ captions }: { captions: CaptionLine[] }) {
  // Use this to align the user's messages to the right
  const userName = "You";

  return (
    <Card className="assistant-chat w-1/2 min-w-[200px] max-w-[350px] flex flex-col overflow-auto" style={{ borderColor: "var(--card)" }}>
      <CardContent className="flex-1 flex flex-col gap-2 p-6 pt-0 text-zinc-800 dark:text-zinc-200">
        <div className="font-semibold p-2 text-zinc-500">Live Captions</div>
        <div className="space-y-4">
          {captions.length === 0 ? (
            <div className="text-zinc-400 p-2 italic">No captions detected.</div>
          ) : (
            captions.map((line, idx) => {
              const isUser = line.name === userName;
              return (
                <div
                  key={idx}
                  className={
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm " +
                    (isUser
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted")
                  }
                  // Optionally, keep the name as a tooltip
                  title={line.name}
                >
                  {line.text}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}




{/*<div class="rounded-xl border bg-card text-card-foreground shadow">
  <div class="p-6 pt-0">
    <div class="space-y-4">
      <div class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
        Hi, how can I help you today?
      </div>

      <div class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
        Hey, I'm having trouble with my account.
      </div>

      <div class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
        What seems to be the problem?
      </div>

      <div class="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
        I can't log in.
      </div>
    </div>
  </div>
</div>*/}