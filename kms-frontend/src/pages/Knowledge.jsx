import Sidebar from "../components/Sidebar";
import { useKnowledge } from "../knowledge/KnowledgeContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Knowledge() {
  const { knowledgeList, deleteKnowledge } = useKnowledge();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = knowledgeList.filter((k) => {
    const matchTitle = k.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || k.category === category;
    return matchTitle && matchCategory;
  });

  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        {/* HEADER */}
        <div className="knowledge-header">
          <h1>Postingan Knowledge</h1>
        </div>

        {/* TOOLBAR */}
        <div className="knowledge-toolbar">
          <Link to="/knowledge/add" className="btn-primary">
            + Posting Baru
          </Link>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Semua</option>
            <option value="SOP">SOP</option>
            <option value="Lesson Learned">Lesson Learned</option>
            <option value="Teknis">Teknis</option>
          </select>

          <input
            type="text"
            placeholder="Telusuri postingan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* LIST */}
        <div className="knowledge-list">
          {filtered.length === 0 ? (
            <p className="empty">Belum ada postingan</p>
          ) : (
            filtered.map((k) => (
              <div className="knowledge-item" key={k.id}>
                <div className="knowledge-info">
                  <h3>{k.title || "(Tanpa Judul)"}</h3>
                  <span className="meta">
                    {k.category} • {k.status} • {k.date || "—"}
                  </span>
                </div>

                <div className="knowledge-actions">
                  <Link to={`/knowledge/edit/${k.id}`} className="btn-link">
                    Edit
                  </Link>
                  <button
                    className="btn-danger"
                    onClick={() => deleteKnowledge(k.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
