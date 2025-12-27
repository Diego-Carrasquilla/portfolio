"use client";

import { useEffect } from "react";

// Dark mode permanente - sin toggle
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Forzar dark mode siempre
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
    }, []);

    return <>{children}</>;
}
