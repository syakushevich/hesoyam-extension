import { createRoot } from "react-dom/client";
import './index.css';
import ExtensionMenu from "./overlay/ExtensionMenu";

// Create a container for the shadow root
const shadowHostId = "my-extension-shadow-host";
let shadowHost = document.getElementById(shadowHostId);
if (!shadowHost) {
  shadowHost = document.createElement("div");
  shadowHost.id = shadowHostId;
  document.body.appendChild(shadowHost);
}

// Attach shadow root
const shadowRoot =
  shadowHost.shadowRoot || shadowHost.attachShadow({ mode: "open" });

// Create a div inside the shadow root for React to render into
let reactRoot = shadowRoot.getElementById("my-extension-react-root");
if (!reactRoot) {
  reactRoot = document.createElement("div");
  reactRoot.id = "my-extension-react-root";
  shadowRoot.appendChild(reactRoot);
}

// Inject CSS into the shadow root
const styleId = "my-extension-shadow-style";
if (!shadowRoot.getElementById(styleId)) {
  const style = document.createElement("link");
  style.id = styleId;
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = chrome.runtime.getURL("assets/contentScript.css"); // Use your actual CSS file name
  shadowRoot.appendChild(style);
}

// Render your React app into the shadow root
createRoot(reactRoot).render(<ExtensionMenu />);
