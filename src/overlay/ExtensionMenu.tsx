import { useState } from "react";
import Assistant from "./Assistant";
import { LoginForm } from "../components/LoginForm";

export default function ExtensionMenu() {
  const [showAssistant, setShowAssistant] = useState(false);

  if (showAssistant) {
    return <Assistant onClose={() => setShowAssistant(false)} />;
  }

  return (
    <div className="extension-menu">
      <LoginForm onLogin={() => setShowAssistant(true)} />
    </div>
  );
}
