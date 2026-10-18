import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
// Fonts are bundled and served by Podium itself, so opening the console makes no request to a third-party host.
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/schibsted-grotesk/400.css";
import "@fontsource/schibsted-grotesk/500.css";
import "@fontsource/schibsted-grotesk/600.css";
import "@fontsource/schibsted-grotesk/700.css";
import { FleetApp } from "./fleet/FleetApp";
import { AdminView } from "./fleet/admin/AdminView";
import { HistoryView } from "./fleet/HistoryView";
import { routeFor } from "./route";

function Root() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const route = routeFor(hash);
  if (route === "history") return <HistoryView />;
  if (route === "admin") return <AdminView />;
  return <FleetApp />;
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
