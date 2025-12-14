// Shared types for backend and frontend (Entities, DTOs)

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  avatar?: string;
  createdAt: string;
}
