import { useState } from "react";
import { useKnowledge } from "../knowledge/KnowledgeContext";
import PublicKnowledgeCard from "../components/PublicKnowledgeCard";
import GambaranUmum from "../components/GambaranUmum";

export default function PublicDashboard() {
  const { knowledgeList } = useKnowledge();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // FILTER DATA PUBLISHED
  const published = knowledgeList.filter(
    (k) =>
      k.status === "Published" &&
      k.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || k.category === category)
  );

  const categories = [
    "all",
    ...new Set(
      knowledgeList
        .filter((k) => k.status === "Published")
        .map((k) => k.category)
    ),
  ];

  return (
    <div className="public-container">
      <header className="public-hero">
        <div className="public-hero-inner">
          <h1>KMS PT ReadyMix Indonesia</h1>
          <p>Knowledge Sharing untuk Infrastruktur & Operasional</p>

          <input
            type="text"
            placeholder="Cari knowledge..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="category-filter">
            {categories.map((c) => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <GambaranUmum />

      <section className="public-grid">
        {published.length === 0 ? (
          <p className="empty">Belum ada knowledge dipublikasikan</p>
        ) : (
          published.map((item) => (
            <PublicKnowledgeCard key={item.id} data={item} />
          ))
        )}
      </section>

      <footer className="public-footer">
        © {new Date().getFullYear()} PT ReadyMix Indonesia — Knowledge
        Management
      </footer>
    </div>
  );
}
