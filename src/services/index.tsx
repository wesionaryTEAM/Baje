export const getReplies = async (prompt: {
  session_id: string;
  question: string;
}) => {
  const response = await fetch(
    "https://9b54-202-166-207-15.ngrok-free.app/question",
    {
      method: "POST",
      body: JSON.stringify(prompt),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};
