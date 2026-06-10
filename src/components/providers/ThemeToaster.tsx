"use client";

import { Toaster } from "react-hot-toast";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style:
          theme === "light"
            ? {
                background: "#ffffff",
                color: "#0d0d0d",
                border: "1px solid #c8941e",
              }
            : {
                background: "#1a1a1a",
                color: "#ffffff",
                border: "1px solid #c8941e",
              },
      }}
    />
  );
}
