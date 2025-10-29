import type { Metadata } from 'next';
import './globals.css'; // Keep this - it's needed for Tailwind

export const metadata: Metadata = {
  title: '1000 Tongues || Admin',
  description: '1000 Tongues Voices',
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