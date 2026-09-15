import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YCA Ottawa-Gatineau | Community. Culture. Growth.",
  description: "Young Cameroonian Association Ottawa-Gatineau",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
