import React from "react";
import { ThemeProvider } from "@/renderer/components/theme-provider";
import DashbaordPage from "./page/dashbaord";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <ModeToggle /> */}
        {/* <AuthenticationPage /> */}
        <DashbaordPage />
      </ThemeProvider>
    </>
  );
}

export default App;
