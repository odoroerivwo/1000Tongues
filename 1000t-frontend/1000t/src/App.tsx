// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
// import AdminLayout from "./components/AdminLayout";

import HomePage from "./pages/HomePage";
import JoinChoirPage from "./pages/JoinChoirPage";
import TicketsPage from "./pages/TicketsPage";
import PartnershipPage from "./pages/PartnershipPage";
import PartnershipFormPage from "./pages/PartnershipFormPage";
import VolunteerPage from "./pages/VolunteerPage";
import VolunteerRegistrationPage from "./pages/VolunteerRegistrationPage";
import ProgrammePage from "./pages/ProgrammePage";
import PolicyPage from "./pages/PolicyPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";

// Admin pages (keep filenames as they are)
// import Dashboard from "./pages/admin/AdminDashboard";
// import Choirmasters from "./pages/admin/Choirmasters";
// import Choristers from "./pages/admin/Choristers";
// import Volunteers from "./pages/admin/VolunteersManager";
// import Partnerships from "./pages/admin/Partnerships";
// import Schedule from "./pages/admin/Schedule";
// import Settings from "./pages/admin/Settings";

function App() {
  return (
    <Router>
      <Routes>

        {/* ----------------------------
            Admin routes (nested)
            AdminLayout must include <Outlet /> where children render.
            Paths are LOWERCASE (URLs): /admin, /admin/dashboard, /admin/choirmasters, ...
           ---------------------------- */}
        {/* <Route path="/admin" element={<AdminLayout />}> */}
          {/* /admin -> Dashboard */}
          {/* <Route index element={<Dashboard />} /> */}
          {/* /admin/dashboard */}
          {/* <Route path="dashboard" element={<Dashboard />} />
          <Route path="choirmasters" element={<Choirmasters />} />
          <Route path="choristers" element={<Choristers />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="partnerships" element={<Partnerships />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="settings" element={<Settings />} />
        </Route> */}

        {/* ----------------------------
            Public routes (wrapped with your Layout)
           ---------------------------- */}
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/join-choir" element={<Layout><JoinChoirPage /></Layout>} />
        <Route path="/tickets" element={<Layout><TicketsPage /></Layout>} />
        <Route path="/partnership" element={<Layout><PartnershipPage /></Layout>} />
        <Route path="/partnership/apply" element={<Layout><PartnershipFormPage /></Layout>} />
        <Route path="/volunteer" element={<Layout><VolunteerPage /></Layout>} />
        <Route path="/volunteer/register" element={<Layout><VolunteerRegistrationPage /></Layout>} />
        <Route path="/programme" element={<Layout><ProgrammePage /></Layout>} />
        
        {/* New Policy Route */}
        <Route path="/policy" element={<Layout><PolicyPage /></Layout>} />

        {/* Payment Confirmation Routes */}
        <Route path="/payment-success" element={<Layout><PaymentSuccessPage /></Layout>} />
        <Route path="/payment-cancel" element={<Layout><PaymentCancelPage /></Layout>} />

        {/* Optional: fallback - redirect unknown URLs to home (you can change to 404 page) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;