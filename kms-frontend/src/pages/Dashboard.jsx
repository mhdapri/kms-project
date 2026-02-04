import Sidebar from "../components/Sidebar";
import { useAuth } from "../auth/AuthContext";
import { useKnowledge } from "../knowledge/KnowledgeContext";

export default function Dashboard() {
  const { user } = useAuth();
  const { knowledgeList } = useKnowledge();

  // HITUNG STATISTIK PER KATEGORI (HANYA PUBLISHED)
  const published = knowledgeList.filter((k) => k.status === "Published");

  const countByCategory = (category) =>
    published.filter((k) => k.category === category).length;

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        {/* ===== HEADER ATAS ===== */}
        <header className="dashboard-header">
          <div className="header-left">
            <h3 className="user-name">{user?.name}</h3>
            <span className="date-text">›› {user?.role}</span>
          </div>

          <div className="header-right">
            <span className="notif">🔔</span>
            <input type="text" className="search-input" placeholder="Search" />
          </div>
        </header>

        {/* ===== CONTENT ===== */}
        <main className="dashboard-content">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
          </div>

          {/* ===== STAT CARDS ===== */}
          <div className="stats">
            <div className="stat-card">
              <h2>{countByCategory("SOP")}</h2>
              <p>SOP</p>
            </div>

            <div className="stat-card">
              <h2>{countByCategory("Lesson Learned")}</h2>
              <p>Lesson Learned</p>
            </div>

            <div className="stat-card">
              <h2>{countByCategory("Teknis")}</h2>
              <p>Teknis</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
