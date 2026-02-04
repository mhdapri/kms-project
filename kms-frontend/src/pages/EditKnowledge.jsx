import { useState } from "react";
import KnowledgeEditor from "../components/KnowledgeEditor";
import "../styles/knowledge.css";

export default function EditKnowledge() {
  const [content, setContent] = useState("Isi knowledge lama...");

  return (
    <div>
      <input className="knowledge-title" placeholder="Judul knowledge..." />

      <KnowledgeEditor value={content} onChange={setContent} />
    </div>
  );
}
