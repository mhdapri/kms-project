import { useParams, Link } from "react-router-dom";
import { useKnowledge } from "../knowledge/KnowledgeContext";

export default function PublicKnowledgeDetail() {
  const { id } = useParams();
  const { knowledgeList } = useKnowledge();

  const data = knowledgeList.find(
    (k) => k.id === Number(id) && k.status === "Published"
  );

  if (!data) return <p>Knowledge tidak ditemukan</p>;

  return (
    <div className="public-detail">
      <Link to="/public">← Kembali</Link>
      <h1>{data.title}</h1>
      <span className="badge">{data.category}</span>

      <div
        className="public-content"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}
