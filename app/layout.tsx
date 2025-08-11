import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "GasCap.ai",
  description: "Hit your fuel target or budget—precisely.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b border-slate-800">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="font-semibold">GasCap.ai</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/vehicles" className="hover:underline">Vehicles</Link>
              <Link href="/history" className="hover:underline">History</Link>
              <Link href="/stations" className="hover:underline">Stations</Link>
              <Link href="/(auth)/signin" className="hover:underline">Sign In</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="container py-10 text-center text-slate-400">
          © {new Date().getFullYear()} GasCap.ai
        </footer>
      </body>
    </html>
  );
}
