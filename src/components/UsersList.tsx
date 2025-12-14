import { useState, useEffect } from "react";
import type { User } from "../types";

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleBadgeClass = (role: User["role"]): string => {
    switch (role) {
      case "admin":
        return "bg-red-900/50 text-red-200 border-red-400/30";
      case "moderator":
        return "bg-purple-900/50 text-purple-200 border-purple-400/30";
      case "user":
        return "bg-blue-900/50 text-blue-200 border-blue-400/30";
      default:
        return "bg-gray-900/50 text-gray-200 border-gray-400/30";
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 rounded-xl shadow-xl p-12 text-center border border-white/10">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white text-lg">Ładowanie użytkowników...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="backdrop-blur-xl bg-gradient-to-b from-red-500/20 to-red-500/10 rounded-xl shadow-xl p-6 text-white border border-red-400/30">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-red-200">Wystąpił błąd</h3>
            <p className="text-red-100/80 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 rounded-xl shadow-xl p-6 text-white border border-white/10 hover:border-white/20 transition-all hover:scale-105"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-white/20 bg-white/10"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-white mb-1 truncate">{user.name}</h3>
                <p className="text-sm text-blue-100/70 mb-3 truncate">{user.email}</p>

                {/* Role Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeClass(user.role)}`}
                  >
                    {user.role}
                  </span>
                </div>

                {/* Created Date */}
                <div className="flex items-center gap-2 text-xs text-blue-100/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{formatDate(user.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-8 backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 rounded-xl shadow-xl p-6 text-center border border-white/10">
        <p className="text-blue-100/80 text-sm">
          💡 <span className="font-semibold">Uwaga:</span> Dane są pobierane z API endpoint (/api/users). Obecnie API
          zwraca dane przykładowe. Wkrótce zostanie dodana integracja z bazą danych Supabase.
        </p>
      </div>
    </>
  );
}
