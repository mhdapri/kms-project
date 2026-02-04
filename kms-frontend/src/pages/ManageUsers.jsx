import Sidebar from "../components/Sidebar";
import { useUsers } from "../auth/UserContext";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

export default function ManageUsers() {
  const ctx = useUsers();
  const { user: currentUser } = useAuth();

  // 🔴 DEBUG HARD STOP
  if (!ctx) {
    return (
      <div className="layout">
        <Sidebar />
        <main className="content">
          <h2>❌ UserContext TIDAK terbaca</h2>
          <p>Periksa UserProvider & import path</p>
        </main>
      </div>
    );
  }

  const { users, addUser, updateUser, deleteUser } = ctx;

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "admin",
  });

  const [editId, setEditId] = useState(null);

  /* ===============================
     AUTO INSERT USER LOGIN
  ================================ */
  useEffect(() => {
    if (!currentUser) return;

    const exists = users.some((u) => u.email === currentUser.email);

    if (!exists) {
      addUser({
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
      });
    }
  }, [currentUser, users, addUser]);

  /* ===============================
     SUBMIT FORM
  ================================ */
  const submit = (e) => {
    e.preventDefault();

    if (editId) {
      updateUser({ ...form, id: editId });
      setEditId(null);
    } else {
      addUser(form);
    }

    setForm({ name: "", email: "", role: "admin" });
  };

  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <h1>Kelola User</h1>
        <p>Tambah, edit, hapus admin</p>

        {/* FORM */}
        <form className="user-form" onSubmit={submit}>
          <input
            placeholder="Nama"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>

          <button type="submit">
            {editId ? "Update User" : "Tambah User"}
          </button>
        </form>

        {/* TABLE */}
        <table className="user-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    onClick={() => {
                      setForm({
                        name: u.name,
                        email: u.email,
                        role: u.role,
                      });
                      setEditId(u.id);
                    }}
                  >
                    Edit
                  </button>

                  {/* ❌ TIDAK BISA HAPUS DIRI SENDIRI */}
                  <button
                    className="danger"
                    disabled={u.email === currentUser?.email}
                    onClick={() => deleteUser(u.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
