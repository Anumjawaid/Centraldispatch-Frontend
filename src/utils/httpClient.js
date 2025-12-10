// REST API for getting messages of a conversation
export const fetchConversationMessages = async ({ conversationId, token }) => {
  if (!conversationId) return;

  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = `${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/chats/${conversationId}/messages`;
  const res = await fetch(url, { method: "GET", headers });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch message");
  }
  return res.json();
};

// REST API to list all conversations for the current user
export const fetchMyConversations = async ({ token }) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = `${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/chats`;
  const res = await fetch(url, { method: "GET", headers });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch conversations");
  }
  return res.json();
};
