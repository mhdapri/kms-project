import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// CONTEXT
import { AuthProvider } from "./auth/AuthContext";
import { KnowledgeProvider } from "./knowledge/KnowledgeContext";
import { UserProvider } from "./auth/UserContext";

// ROUTE GUARD
import ProtectedRoute from "./auth/ProtectedRoute";

// ================= PAGES =================

// Auth & Internal
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Knowledge from "./pages/Knowledge";
import AddKnowledge from "./pages/AddKnowledge";
import ManageUsers from "./pages/ManageUsers";
import Unauthorized from "./pages/Unauthorized";

// Public
import PublicDashboard from "./pages/PublicDashboard";
import PublicKnowledgeDetail from "./pages/PublicKnowledgeDetail";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <KnowledgeProvider>
          <BrowserRouter>
            <Routes>
              {/* ================= ROOT ================= */}
              <Route path="/" element={<Navigate to="/public" replace />} />

              {/* ================= PUBLIC ================= */}
              <Route path="/public" element={<PublicDashboard />} />
              <Route
                path="/public/knowledge/:id"
                element={<PublicKnowledgeDetail />}
              />

              {/* ================= AUTH ================= */}
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* ================= INTERNAL DASHBOARD ================= */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* ================= KNOWLEDGE CRUD ================= */}
              <Route
                path="/knowledge"
                element={
                  <ProtectedRoute>
                    <Knowledge />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/knowledge/add"
                element={
                  <ProtectedRoute>
                    <AddKnowledge />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/knowledge/edit/:id"
                element={
                  <ProtectedRoute>
                    <AddKnowledge />
                  </ProtectedRoute>
                }
              />

              {/* ================= SUPER ADMIN ONLY ================= */}
              <Route
                path="/users"
                element={
                  <ProtectedRoute role="superadmin">
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />

              {/* ================= FALLBACK ================= */}
              <Route path="*" element={<Navigate to="/public" replace />} />
            </Routes>
          </BrowserRouter>
        </KnowledgeProvider>
      </UserProvider>
    </AuthProvider>
  );
}
