import { getReplies } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../button";
import ChatBubble from "../chatBubble";
import { NewSidebar } from "../sidebar";
import { Textarea } from "../textarea";
import {
  getChatByRole,
  getSelectedRole,
  updateUserData,
} from "@/utility/UserDataHandler";

export interface MessageType {
  id: string;
  message: string;
  date: string;
  sender: string;
  roleId: number;
}

function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleIntoView = () => {
    const documentId = document.getElementById("chat-bottom");
    if (documentId)
      setTimeout(() => documentId?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  useEffect(() => {
    const chatByRole = getChatByRole(Number(getSelectedRole()));
    chatByRole && setMessages(chatByRole.messages);
    handleIntoView();
  }, []);

  const { mutate: getreplyForPropmt, isPending } = useMutation({
    mutationFn: getReplies,
    onSuccess: (data) => {
      const replydata = data?.answer;
      const replyMessageId = uuidv4();
      const newReply = {
        id: replyMessageId,
        message: replydata,
        date: new Date().toLocaleTimeString("en-NP"),
        sender: "बाजे भन्नुहुन्छ",
        roleId: Number(getSelectedRole()),
      };
      setMessages([...messages, newReply]);
      updateUserData(newReply);
      handleIntoView();
    },
  });

  const handleSend = () => {
    const senderMessageId = uuidv4();

    const newMessage = {
      id: senderMessageId,
      message: inputMessage,
      date: new Date().toLocaleTimeString("en-NP"),
      sender: "user",
      roleId: Number(getSelectedRole()),
    };

    inputMessage && setMessages([...messages, newMessage]);
    updateUserData(newMessage);
    handleIntoView();

    const promptMessage = {
      session_id: String(getSelectedRole()),
      question: inputMessage,
    };
    getreplyForPropmt(promptMessage);
    setInputMessage("");
  };

  const handleUserChange = (id: number) => {
    const chatByRole = getChatByRole(id);
    chatByRole && setMessages(chatByRole.messages);
    handleIntoView();
  };

  return (
    <div className="flex flex-row h-screen">
      <NewSidebar handleChange={handleUserChange} />
      <div className="flex flex-1 flex-col space-y-10 mb-10 ">
        <div className="max-w-4xl  mx-40 text-center mt-8">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl ">
            Welcome to बाजे
          </h1>
          <p className="mt-3 text-gray-600 ">
            Your AI-powered copilot for the document information and development
            assistance.
          </p>
        </div>
        <div className="h-full overflow-auto">
          <div className=" mx-40 ">
            <ChatBubble messages={messages} loading={isPending} />
          </div>
          <div id="chat-bottom"></div>
        </div>

        <div className="mx-40  flex items-end space-x-6">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleSend}
            type="submit"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
