import { useState } from "react";
import Assistant from "./Assistant";
import { LoginForm } from "./LoginForm";
import { ExtensionDashboard } from "./ExtensionDashboard";

export default function ExtensionMenu() {
  const [step, setStep] = useState<"login" | "dashboard" | "assistant">("login");
  const [email, setEmail] = useState("user@example.com"); // Replace with real email after login
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  if (step === "assistant") {
    return <Assistant onClose={() => setStep("dashboard")} />;
  }

  if (step === "dashboard") {
    return (
      <div className="extension-menu">
        <ExtensionDashboard
          email={email}
          avatarUrl={avatarUrl}
          onShowAssistant={() => setStep("assistant")}
        />
      </div>
    );
  }

  // Login step
  return (
    <div className="extension-menu">
      <LoginForm
        onLogin={() => {
          // Here you would fetch/set the real email and avatarUrl
          setEmail("user@example.com");
          setAvatarUrl(undefined);
          setStep("dashboard");
        }}
      />
    </div>
  );
}
