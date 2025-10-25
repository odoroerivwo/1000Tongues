import type { Metadata } from 'next';
import './globals.css'; // Keep this - it's needed for Tailwind

export const metadata: Metadata = {
  title: 'AdminPro Dashboard',
  description: 'Modern admin dashboard with enterprise-grade security',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}