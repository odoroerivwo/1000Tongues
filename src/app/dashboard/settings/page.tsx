import { getAuthAdmin } from "@/lib/auth";
import SettingsTabs from "@/components/SettingsTabs";
import clientPromise from "@/lib/mongodb";

// ✅ Prevent Next.js from caching the old settings
export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await getAuthAdmin();

  // ✅ Default fallback state
  let adminProps = {
    email: session?.email || "",
    adminId: session?.adminId || "",
    notifications: { emailAlerts: true, weeklyDigest: false },
    preferences: { language: "English (US)", timezone: "West Africa Time (WAT)" }
  };

  // ✅ Fetch the full admin record from the database
  if (session?.email) {
    const client = await clientPromise;
    const db = client.db("1000t-admin");
    const dbAdmin = await db.collection("admins").findOne({ email: session.email });

    if (dbAdmin) {
      adminProps = {
        email: dbAdmin.email,
        adminId: dbAdmin.adminId || session.adminId,
        // If DB has saved settings, use them. Otherwise, fall back to defaults.
        notifications: dbAdmin.notifications || adminProps.notifications,
        preferences: dbAdmin.preferences || adminProps.preferences,
      };
    }
  }

  // ✅ Pass the live database values to the interactive component
  return <SettingsTabs admin={adminProps} />;
}