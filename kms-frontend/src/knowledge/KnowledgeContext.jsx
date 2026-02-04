import { createContext, useContext, useEffect, useState } from "react";

const KnowledgeContext = createContext();

export function KnowledgeProvider({ children }) {
  const [knowledgeList, setKnowledgeList] = useState([]);

  // LOAD DARI LOCALSTORAGE
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("knowledge")) || [];
    setKnowledgeList(saved);
  }, []);

  // SIMPAN KE LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("knowledge", JSON.stringify(knowledgeList));
  }, [knowledgeList]);

  // TAMBAH KNOWLEDGE (DRAFT / PUBLISH)
  const addKnowledge = (data) => {
    const newKnowledge = {
      id: Date.now(),
      title: data.title || "(Tanpa Judul)",
      content: data.content || "",
      category: data.category || "SOP",
      status: data.status || "draft",
      createdAt: new Date().toISOString(),
    };

    setKnowledgeList((prev) => [newKnowledge, ...prev]);
  };

  // UPDATE KNOWLEDGE
  const updateKnowledge = (id, updated) => {
    setKnowledgeList((prev) =>
      prev.map((k) =>
        k.id === id
          ? { ...k, ...updated, updatedAt: new Date().toISOString() }
          : k
      )
    );
  };

  // DELETE KNOWLEDGE
  const deleteKnowledge = (id) => {
    setKnowledgeList((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <KnowledgeContext.Provider
      value={{
        knowledgeList,
        addKnowledge,
        updateKnowledge,
        deleteKnowledge,
      }}
    >
      {children}
    </KnowledgeContext.Provider>
  );
}

export const useKnowledge = () => useContext(KnowledgeContext);
