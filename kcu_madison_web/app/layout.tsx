// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your App",
  description: "Description here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Accessibility containers to prevent acknowledgement_modal.js error */}
        <div
          id="hl-aria-live-message-container"
          aria-live="polite"
          className="visually-hidden"
        ></div>
        <div
          id="hl-aria-live-alert-container"
          role="alert"
          aria-live="assertive"
          className="visually-hidden"
        ></div>

        {children}
      </body>
    </html>
  );
}
