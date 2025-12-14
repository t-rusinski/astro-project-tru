import type { APIRoute } from "astro";
import type { User } from "../../types";

export const prerender = false;

// Dummy data - users list
const dummyUsers: User[] = [
  {
    id: "1",
    name: "Anna Kowalska",
    email: "anna.kowalska@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Jan Nowak",
    email: "jan.nowak@example.com",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jan",
    createdAt: "2024-02-20T14:45:00Z",
  },
  {
    id: "3",
    name: "Maria Wiśniewska",
    email: "maria.wisniewska@example.com",
    role: "moderator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: "4",
    name: "Piotr Kowalczyk",
    email: "piotr.kowalczyk@example.com",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Piotr",
    createdAt: "2024-04-05T16:20:00Z",
  },
  {
    id: "5",
    name: "Katarzyna Zielińska",
    email: "katarzyna.zielinska@example.com",
    role: "user",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Katarzyna",
    createdAt: "2024-05-12T11:00:00Z",
  },
];

export const GET: APIRoute = async () => {
  try {
    // TODO: Replace with actual Supabase query when ready
    // const { data, error } = await Astro.locals.supabase
    //   .from('users')
    //   .select('*');

    return new Response(JSON.stringify(dummyUsers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch users. ${error instanceof Error ? error.message : String(error)}`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
