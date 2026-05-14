import { Inter, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/lib/theme-context";
import { LanguageProvider } from "@/lib/language-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LivingBackground } from "@/components/effects/living-background";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { LoadingScreen } from "@/components/effects/loading-screen";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});
export const metadata = {
  title: "VIPER ELITE | Domina Et Vince",
  description:
    "Experience the future of elite technology. Where innovation meets luxury, and performance exceeds expectation.",
  keywords: [
    "VIPER ELITE",
    "elite technology",
    "luxury tech",
    "premium",
    "innovation",
  ],
  authors: [
    {
      name: "VIPER ELITE",
    },
  ],
  openGraph: {
    title: "VIPER ELITE | Domina Et Vince",
    description: "Experience the future of elite technology.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIPER ELITE | Domina Et Vince",
    description: "Experience the future of elite technology.",
  },
};
export const viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f8f8f8",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#050505",
    },
  ],
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans antialiased min-h-screen`}
        style={{
          ["--font-display"]: "var(--font-orbitron)",
        }}
      >
        <ThemeProvider>
          <LanguageProvider>
            <LoadingScreen />
            <CursorGlow />
            <LivingBackground />
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
            </div>
          </LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
