import Link from "next/link";
import { Users, BarChart3, Settings } from "lucide-react";

import clientPromise from "@/lib/mongodb";
import { getAuthAdmin } from "@/lib/auth";

type ActivityItem = {
  type: string;
  name: string;
  createdAt: Date | string;
  href?: string;
};

export default async function DashboardPage() {
  // Ensure only admins can view dashboard
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
  const db = client.db();

  // Counts (fast)
  const [
    totalChoirmasters,
    totalChoristers,
    totalVolunteers,
    totalPartners,
  ] = await Promise.all([
    db.collection("choirmasters").countDocuments(),
    db.collection("choristers").countDocuments(),
    db.collection("volunteers").countDocuments(),
    db.collection("partners").countDocuments(),
  ]);

  // Fetch recent items from each collection (limit 3 each)
  const [
    rawChoirmasters,
    rawChoristers,
    rawVolunteers,
    rawPartners,
  ] = await Promise.all([
    db
      .collection("choirmasters")
      .find({}, { projection: { name: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray(),
    db
      .collection("choristers")
      .find({}, { projection: { fullName: 1, firstName: 1, lastName: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray(),
    db
      .collection("volunteers")
      .find({}, { projection: { name: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray(),
    db
      .collection("partners")
      .find({}, { projection: { name: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray(),
  ]);

  // Normalize into a single array and sort by createdAt desc
  const activities: ActivityItem[] = [
    ...rawChoirmasters.map((r: any) => ({
      type: "Choirmaster",
      name: r.name || "Unnamed",
      createdAt: r.createdAt,
      href: "/dashboard/choirmasters",
    })),
    ...rawChoristers.map((r: any) => ({
      type: "Chorister",
      // Prefer fullName; fall back to firstName + lastName; final fallback "Unnamed"
      name:
        (r.fullName && String(r.fullName).trim()) ||
        (`${r.firstName ?? ""} ${r.lastName ?? ""}`.trim()) ||
        "Unnamed",
      createdAt: r.createdAt,
      href: "/dashboard/choristers",
    })),
    ...rawVolunteers.map((r: any) => ({
      type: "Volunteer",
      name: r.name || "Unnamed",
      createdAt: r.createdAt,
      href: "/dashboard/volunteers",
    })),
    ...rawPartners.map((r: any) => ({
      type: "Partner",
      name: r.name || "Unnamed",
      createdAt: r.createdAt,
      href: "/dashboard/partners",
    })),
  ]
    .filter(Boolean)
    .sort((a, b) => {
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return tb - ta;
    })
    .slice(0, 6); // show top 6 recent items

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
      icon: Users,
      href: "/dashboard/partners",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900">Welcome back, Super Admin</h1>
      <p className="text-gray-600">Here&apos;s what&apos;s happening with your platform today..</p>
      <br /> <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link key={index} href={card.href}>
            <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition cursor-pointer flex items-center gap-4">
              <div className={`p-4 rounded-lg text-white ${card.color}`}>
                <card.icon size={28} />
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {card.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>

        {activities.length === 0 ? (
          <p className="text-gray-600">No recent activity to display.</p>
        ) : (
          <ul className="space-y-3">
            {activities.map((a, i) => (
              <li
                key={i}
                className="flex items-start justify-between gap-4 p-3 rounded-md hover:bg-gray-50"
              >
                <div>
                  <div className="text-sm text-gray-600">{a.type}</div>
                  <div className="text-md font-medium text-gray-900">
                    {a.name}
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  {new Date(a.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
