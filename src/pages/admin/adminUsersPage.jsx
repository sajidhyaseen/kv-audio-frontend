import { useEffect, useState } from "react";
import api from "../../utils/api";
import UserAvatar from "../../components/userAvatar";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ central fetch function
  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/users/all");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchUsers();
    }
  }, [loading]);

  // ✅ block/unblock user
  const handleBlockUser = async (email) => {
    try {
      await api.put(`/api/users/block/${email}`);
      // refresh users
      setLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">👤 Admin Users Page</h1>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Profile</th>
                <th className="px-4 py-2 text-left text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-gray-600">Email</th>
                <th className="px-4 py-2 text-left text-gray-600">Phone</th>
                <th className="px-4 py-2 text-left text-gray-600">Role</th>
                <th className="px-4 py-2 text-left text-gray-600">Address</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    <UserAvatar
                      src={user.profilePicture}
                      firstName={user.firstName}
                      lastName={user.lastName}
                      email={user.email}
                    />
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">{user.address}</td>
                  <td
                    onClick={() => handleBlockUser(user.email)}
                    className={`px-4 py-2 cursor-pointer font-medium ${
                      user.isBlocked
                        ? "text-red-600 hover:underline"
                        : "text-green-600 hover:underline"
                    }`}
                  >
                    {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
