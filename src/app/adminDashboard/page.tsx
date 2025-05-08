"use client";

import React, { useEffect, useState } from "react";
import { getUsers } from "@/app/services/getUsers";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { isAdmin } from "@/lib/admin";

interface User {
  id: string;
  username: string;
  email: string;
  [key: string]: any;
}

const AdminDashboard: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    }

    if (userId && isAdmin(userId)) {
      fetchData();
    }
  }, [userId]);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setEditedUser({ ...user });
  };

  const handleDeleteClick = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteDoc(doc(db, "users", userId));
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleSaveClick = async () => {
    if (editedUser) {
      const userRef = doc(db, "users", editedUser.id);
      await updateDoc(userRef, {
        username: editedUser.username,
        email: editedUser.email,
      });
      setUsers(
        users.map((user) =>
          user.id === editedUser.id
            ? {
                ...user,
                username: editedUser.username,
                email: editedUser.email,
              }
            : user
        )
      );
      setEditingUser(null);
      setEditedUser(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!userId || !isAdmin(userId)) {
    return <h1 className="text-xl text-red-600 p-6">Access Denied</h1>;
  }

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-900">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
        Admin Dashboard
      </h1>

      {/* Desktop table */}
      <div className="hidden md:block overflow-auto">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">Имейл</th>
              <th className="border px-4 py-2">Име на потребителя</th>
              <th className="border px-4 py-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">
                  {editingUser?.id === user.id ? (
                    <input
                      type="text"
                      name="email"
                      value={editedUser?.email || ""}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-white p-2 rounded-md"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingUser?.id === user.id ? (
                    <input
                      type="text"
                      name="username"
                      value={editedUser?.username || ""}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-white p-2 rounded-md"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingUser?.id === user.id ? (
                    <button
                      onClick={handleSaveClick}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-800 rounded-lg p-4 text-white">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="text-gray-400">Имейл:</div>
              <div>
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editedUser?.email || ""}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-md"
                  />
                ) : (
                  user.email
                )}
              </div>

              <div className="text-gray-400">Потребителско име:</div>
              <div>
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    name="username"
                    value={editedUser?.username || ""}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-md"
                  />
                ) : (
                  user.username
                )}
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {editingUser?.id === user.id ? (
                <button
                  onClick={handleSaveClick}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
