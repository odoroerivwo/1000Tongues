import { redirect } from 'next/navigation';
import { getAuthAdmin } from '@/lib/auth';
import DashboardSidebar from '@/components/DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check
  const admin = await getAuthAdmin();

  if (!admin) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar is fixed position with w-64 */}
      <DashboardSidebar admin={admin} />

      {/* CRITICAL FIX: 'ml-64' creates a left margin equal to the sidebar's width,
        preventing the content from hiding behind the sidebar.
      */}
      <main className="ml-64 flex-1 p-8 w-full">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}