import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function KnowledgeEditor({ value, onChange }) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      placeholder="Tulis isi knowledge di sini..."
      modules={{
        toolbar: [
          // ===== BARIS 1 =====
          [
            { font: [] },
            { size: ["small", false, "large", "huge"] },
            { header: [1, 2, 3, 4, false] },
          ],

          // ===== BARIS 2 =====
          [
            "bold",
            "italic",
            "underline",
            "strike",
            { color: [] },
            { background: [] },
            { script: "sub" },
            { script: "super" },
          ],

          // ===== BARIS 3 =====
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],

          // ===== BARIS 4 =====
          ["blockquote", "code-block", "link", "image", "clean"],
        ],
      }}
    />
  );
}
