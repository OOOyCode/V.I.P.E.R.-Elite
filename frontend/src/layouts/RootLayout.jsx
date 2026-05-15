import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/lib/theme-context";
import { LanguageProvider } from "@/lib/language-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LivingBackground } from "@/components/effects/living-background";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { LoadingScreen } from "@/components/effects/loading-screen";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export function RootLayout() {
  return (
    <div
      className="bg-background font-sans antialiased min-h-screen"
      style={{
        "--font-display": "var(--font-orbitron, 'Orbitron', sans-serif)",
      }}
    >
      <ThemeProvider>
        <LanguageProvider>
          <LoadingScreen />
          <CursorGlow />
          <LivingBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </LanguageProvider>
      </ThemeProvider>
      {import.meta.env.PROD ? <Analytics /> : null}
    </div>
  );
}
