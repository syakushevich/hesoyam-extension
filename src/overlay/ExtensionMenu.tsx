import { useState } from "react";
// import { Button } from "../components/ui/button";
import { RippleButton } from '../components/animate-ui/buttons/ripple';
import { marked } from "marked";
import Assistant from "./Assistant";

export default function ExtensionMenu() {
  const [showAssistant, setShowAssistant] = useState(false);

  if (showAssistant) {
    return <Assistant onClose={() => setShowAssistant(false)} />
  }

  return (
    <div className="extension-menu">
      <RippleButton onClick={() => setShowAssistant(true)}>Log In</RippleButton>
      <div
        dangerouslySetInnerHTML={{ __html: marked("X") }}
        className="mt-4"
      />
    </div>
  );
}
