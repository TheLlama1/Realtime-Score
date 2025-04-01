"use client";

import React, { useEffect, useState } from "react";
import { getUsers } from "@/app/services/getUsers";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface User {
  id: string;
  [key: string]: any;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    }
    fetchData();
  }, []);

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
      await updateDoc(userRef, { ...editedUser });
      setUsers(
        users.map((user) => (user.id === editedUser.id ? editedUser : user))
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

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-900">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
        Admin Dashboard
      </h1>

      {/* Desktop table - hidden on mobile */}
      <div className="hidden md:block overflow-auto">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  {editingUser && editingUser.id === user.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser?.name || ""}
                      onChange={handleChange}
                      className="w-full bg-gray-800 text-white p-2 rounded-md"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingUser && editingUser.id === user.id ? (
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

      {/* Mobile card view - visible only on mobile */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-800 rounded-lg p-4 text-white">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="text-gray-400">ID:</div>
              <div className="truncate">{user.id}</div>

              <div className="text-gray-400">Email:</div>
              <div className="truncate">{user.email}</div>

              <div className="text-gray-400">Name:</div>
              <div>
                {editingUser && editingUser.id === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser?.name || ""}
                    onChange={handleChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-md"
                  />
                ) : (
                  user.name
                )}
              </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {editingUser && editingUser.id === user.id ? (
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
