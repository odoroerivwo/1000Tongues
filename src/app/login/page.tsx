// "use client";

// import { useState, type FormEvent } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminLoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   // Toggle this when backend API is ready
//   const USE_BACKEND = false;

//   // Local fallback credentials
//   const ADMIN_EMAIL = "superAdmiN@admin.com";
//   const ADMIN_PASSWORD = "adMin@paSS";

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault();
//     setError("");

//     try {
//       if (!USE_BACKEND) {
//         // Local validation
//         if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//           const fakeToken = btoa(`${email}:${password}`);

//           // Store in localStorage (client-side)
//           localStorage.setItem("admin_token", fakeToken);

//           // Store in cookie (for middleware)
//           document.cookie = `admin_token=${fakeToken}; path=/; max-age=3600; SameSite=Lax`;

//           // Redirect to dashboard
//           router.push("/dashboard");
//         } else {
//           setError("Invalid admin credentials");
//         }
//       } else {
//         // Backend API logic (ready for future)
//         const res = await fetch("/api/admin/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });

//         if (!res.ok) throw new Error("Invalid credentials or server error");

//         const data = await res.json();

//         // Save real token
//         localStorage.setItem("admin_token", data.token);
//         document.cookie = `admin_token=${data.token}; path=/; max-age=3600; SameSite=Lax`;

//         router.push("/dashboard");
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("Login failed");
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
//           Admin Login
//         </h2>

//         {error && (
//           <div className="text-red-600 bg-red-50 border border-red-200 p-2 mb-3 text-sm rounded">
//             {error}
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter admin email"
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter password"
//             className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Toggle this when backend API is ready
  const USE_BACKEND = false;

  // Local fallback credentials
  const ADMIN_EMAIL = "superAdmiN@admin.com";
  const ADMIN_PASSWORD = "adMin@paSS";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      if (!USE_BACKEND) {
        // Local validation
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const fakeToken = btoa(`${email}:${password}`);

          // Store in localStorage (client-side)
          localStorage.setItem('admin_token', fakeToken); document.cookie = `admin_token=${fakeToken}; path=/; max-age=86400`;

          // Store in cookie (for middleware)
          document.cookie = `admin_token=${fakeToken}; path=/; max-age=3600; SameSite=Lax`;

          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          setError("Invalid admin credentials");
        }
      } else {
        // Backend API logic (ready for future)
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Invalid credentials or server error");

        const data = await res.json();

        // Save real token
        localStorage.setItem("admin_token", data.token);
        document.cookie = `admin_token=${data.token}; path=/; max-age=3600; SameSite=Lax`;

        router.push("/dashboard");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Login failed");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Admin Login
        </h2>

        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 p-2 mb-3 text-sm rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter admin email"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
