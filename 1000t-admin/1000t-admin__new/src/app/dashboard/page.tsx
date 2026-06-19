import Link from "next/link";
import { Users, BarChart3 } from "lucide-react";

// Use relative imports to ensure compatibility
import clientPromise from "../../lib/mongodb";
import { getAuthAdmin } from "../../lib/auth";

// --- 1. Define Types to Fix 'Unexpected any' Errors ---
interface BaseDoc {
  _id: string;
  createdAt?: string | Date;
  submittedAt?: string | Date;
}

interface ChoirmasterDoc extends BaseDoc {
  name?: string;
}

interface ChoristerDoc extends BaseDoc {
  fullName?: string;
  firstName?: string;
  lastName?: string;
}

interface VolunteerDoc extends BaseDoc {
  firstName?: string;
  lastName?: string;
}

interface PartnerDoc extends BaseDoc {
  organizationName?: string;
}

type ActivityItem = {
  type: string;
  name: string;
  createdAt: Date | string;
  href?: string;
};

export default async function DashboardPage() {
  const admin = await getAuthAdmin();
  if (!admin) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="text-gray-600">You must be an admin to view this page.</p>
      </div>
    );
  }

  const client = await clientPromise;
  const db = client.db("1000t-admin");

  // Counts
  const [
    totalChoirmasters,
    totalChoristers,
    totalVolunteers,
    totalPartners,
  ] = await Promise.all([
    db.collection("choirmasters").countDocuments(),
    db.collection("choristers").countDocuments(),
    db.collection("volunteers").countDocuments(),
    db.collection("partnerships").countDocuments(),
  ]);

  // Fetch recent items
  const [
    rawChoirmasters,
    rawChoristers,
    rawVolunteers,
    rawPartners,
  ] = await Promise.all([
    db
      .collection("choirmasters")
      .find({}, { projection: { name: 1, createdAt: 1, submittedAt: 1 } })
      .sort({ submittedAt: -1, createdAt: -1 })
      .limit(3)
      .toArray(),
    db
      .collection("choristers")
      .find({}, { projection: { fullName: 1, firstName: 1, lastName: 1, createdAt: 1, submittedAt: 1 } })
      .sort({ submittedAt: -1, createdAt: -1 })
      .limit(3)
      .toArray(),
    db
      .collection("volunteers")
      .find({}, { projection: { firstName: 1, lastName: 1, submittedAt: 1 } })
      .sort({ submittedAt: -1 })
      .limit(3)
      .toArray(),
    db
      .collection("partnerships")
      .find({}, { projection: { organizationName: 1, submittedAt: 1 } })
      .sort({ submittedAt: -1 })
      .limit(3)
      .toArray(),
  ]);

  // --- 2. Use Typed Maps to Generate Activity Items ---
  // We cast the raw arrays to our defined types to satisfy TypeScript
  const activities: ActivityItem[] = [
    ...(rawChoirmasters as unknown as ChoirmasterDoc[]).map((r) => ({
      type: "Choirmaster",
      name: r.name || "Unnamed",
      createdAt: r.submittedAt || r.createdAt || new Date(),
      href: "/dashboard/choirmasters",
    })),
    ...(rawChoristers as unknown as ChoristerDoc[]).map((r) => ({
      type: "Chorister",
      name:
        (r.fullName && String(r.fullName).trim()) ||
        (`${r.firstName ?? ""} ${r.lastName ?? ""}`.trim()) ||
        "Unnamed",
      createdAt: r.submittedAt || r.createdAt || new Date(),
      href: "/dashboard/choristers",
    })),
    ...(rawVolunteers as unknown as VolunteerDoc[]).map((r) => ({
      type: "Volunteer",
      name: `${r.firstName ?? ""} ${r.lastName ?? ""}`.trim() || "Unnamed",
      createdAt: r.submittedAt || r.createdAt || new Date(),
      href: "/dashboard/volunteers",
    })),
    ...(rawPartners as unknown as PartnerDoc[]).map((r) => ({
      type: "Partner",
      name: r.organizationName || "Unnamed Organization",
      createdAt: r.submittedAt || r.createdAt || new Date(),
      href: "/dashboard/partnerships",
    })),
  ]
    .filter(Boolean)
    .sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 6);

  const cards = [
    {
      title: "Total Choirmasters",
      description: `${totalChoirmasters}`,
      icon: Users,
      href: "/dashboard/choirmasters",
      color: "bg-green-500",
    },
    {
      title: "Total Choristers",
      description: `${totalChoristers}`,
      icon: Users,
      href: "/dashboard/choristers",
      color: "bg-blue-500",
    },
    {
      title: "Total Volunteers",
      description: `${totalVolunteers}`,
      icon: Users,
      href: "/dashboard/volunteers",
      color: "bg-purple-500",
    },
    {
      title: "Total Partners",
      description: `${totalPartners}`,
      icon: BarChart3,
      href: "/dashboard/partnerships",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900">Welcome back, Super Admin</h1>
      <p className="text-gray-600 mt-2">Here&apos;s what&apos;s happening with your platform today..</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {cards.map((card, index) => (
          <Link key={index} href={card.href}>
            <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition cursor-pointer flex items-center gap-4 border border-gray-100">
              <div className={`p-4 rounded-lg text-white ${card.color}`}>
                <card.icon size={28} />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900">
                  {card.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Recent Activity
        </h2>

        {activities.length === 0 ? (
          <p className="text-gray-600">No recent activity to display.</p>
        ) : (
          <div className="space-y-4">
            {activities.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    {a.type}
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    {a.name}
                  </div>
                </div>

                <div className="text-sm text-gray-500 font-medium">
                  {new Date(a.createdAt).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}