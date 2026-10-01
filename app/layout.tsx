import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YCA Ottawa | Community. Culture. Growth.",
  description:
    "Young Cameroonians Association Ottawa-Gatineau. Uniting, celebrating & empowering the Cameroonian community.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
