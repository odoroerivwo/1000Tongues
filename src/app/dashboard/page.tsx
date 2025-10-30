import { getAuthAdmin } from '@/lib/auth';
import { Users, Settings, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const admin = await getAuthAdmin();

  const cards = [
    {
      title: 'Users Management',
      description: 'Manage all users in the system',
      icon: Users,
      href: '/dashboard/users',
      color: 'bg-blue-500',
    },
    {
      title: 'Analytics',
      description: 'View platform analytics and insights',
      icon: BarChart3,
      href: '/dashboard/analytics',
      color: 'bg-green-500',
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      href: '/dashboard/settings',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {admin?.email}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here&apos;s what&apos;s happening with your platform today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <p className="text-gray-600">No recent activity to display.</p>
      </div>
    </div>
  );
}