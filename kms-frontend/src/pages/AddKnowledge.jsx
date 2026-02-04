import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKnowledge } from "../knowledge/KnowledgeContext";
import KnowledgeEditor from "../components/KnowledgeEditor";
import "../styles/editor.css";
import "../styles/knowledge.css";

export default function AddKnowledge() {
  const navigate = useNavigate();
  const { addKnowledge } = useKnowledge();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("SOP");

  // Publikasi
  const [publishMode, setPublishMode] = useState("auto"); // auto | schedule
  const [publishDate, setPublishDate] = useState("2026-02-04");
  const [publishTime, setPublishTime] = useState("12:49");

  const createdAt =
    publishMode === "schedule"
      ? new Date(`${publishDate}T${publishTime}`).toISOString()
      : new Date().toISOString();

  // ===== ACTIONS =====
  const saveDraft = () => {
    if (!title.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    addKnowledge({
      title,
      content,
      category,
      status: "draft",
      createdAt,
    });

    navigate("/knowledge");
  };

  const publish = () => {
    if (!title.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    addKnowledge({
      title,
      content,
      category,
      status: "published",
      createdAt,
    });

    navigate("/knowledge");
  };

  return (
    <div className="editor-page">
      {/* ===== TOP BAR ===== */}
      <div className="editor-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ←
        </button>

        <div className="editor-actions">
          <button className="btn-outline" onClick={saveDraft}>
            Simpan Draft
          </button>
          <button className="btn-primary" onClick={publish}>
            Publikasikan
          </button>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="editor-layout">
        {/* ===== EDITOR ===== */}
        <div className="editor-main">
          <input
            className="editor-title"
            placeholder="Judul knowledge..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <KnowledgeEditor value={content} onChange={setContent} />
        </div>

        {/* ===== SIDEBAR ===== */}
        <div className="editor-sidebar">
          <h4>Setelan Posting</h4>

          <div className="sidebar-group">
            <label>Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>SOP</option>
              <option>Lesson Learned</option>
              <option>Teknis</option>
            </select>
          </div>

          <div className="sidebar-group">
            <label className="sidebar-label">Dipublikasikan pada</label>

            <div className="publish-box">
              <label className="radio-item">
                <input
                  type="radio"
                  checked={publishMode === "auto"}
                  onChange={() => setPublishMode("auto")}
                />
                <span>Otomatis</span>
              </label>

              <label className="radio-item">
                <input
                  type="radio"
                  checked={publishMode === "schedule"}
                  onChange={() => setPublishMode("schedule")}
                />
                <span>Setel tanggal dan waktu</span>
              </label>

              {publishMode === "schedule" && (
                <div className="datetime-input">
                  <input
                    type="date"
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                  />
                  <input
                    type="time"
                    value={publishTime}
                    onChange={(e) => setPublishTime(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
