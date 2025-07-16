// components/ExtensionDashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export function ExtensionDashboard({
  email,
  avatarUrl,
  onShowAssistant,
}: {
  email: string;
  avatarUrl?: string;
  onShowAssistant: () => void;
}) {
  return (
    <Card className="max-w-sm mx-auto flex flex-col items-center border-0">
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar className="w-20 h-20">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={email} />
          ) : (
            <AvatarFallback>
              {email
                .split("@")[0]
                .split("")
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
        <CardTitle className="text-lg">{email}</CardTitle>
      </CardHeader>
      <CardContent className="w-full flex flex-col items-center">
        <Button
          size="lg"
          className="w-full mt-8"
          onClick={onShowAssistant}
        >
          Show Assistant
        </Button>
      </CardContent>
    </Card>
  );
}
