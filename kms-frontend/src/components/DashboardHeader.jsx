import "../styles/App.css";

export default function DashboardHeader() {
  return (
    <div className="dashboard-header">
      <div className="header-left">
        <h3 className="user-name">MUHAMMAD</h3>
        <span className="date-text">›› May 19, 2023</span>
      </div>

      <div className="header-right">
        <span className="notif">🔔</span>
        <input type="text" placeholder="Search" className="search-input" />
      </div>
    </div>
  );
}
