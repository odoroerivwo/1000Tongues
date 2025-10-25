import { redirect } from 'next/navigation';
import { getAuthAdmin } from '@/lib/auth';
import DashboardSidebar from '@/components/DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAuthAdmin();

  if (!admin) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar admin={admin} />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}