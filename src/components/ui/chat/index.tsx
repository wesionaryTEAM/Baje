import { getReplies } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../button";
import ChatBubble from "../chatBubble";
import { NewSidebar } from "../sidebar";
import { Textarea } from "../textarea";

export interface MessageType {
  id: string;
  message: string;
  date: string;
  sender: string;
}

const userChatId = uuidv4();

function Chat() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const { mutate: getreplyForPropmt, isPending } = useMutation({
    mutationFn: getReplies,
    onSuccess: (data) => {
      const replydata = data?.answer;
      const replyMessageId = uuidv4();
      const newReply = {
        id: replyMessageId,
        message: replydata,
        date: new Date().toLocaleTimeString("en-NP"),
        sender: "bot",
      };
      setMessages([...messages, newReply]);
    },
  });

  const handleSend = () => {
    const senderMessageId = uuidv4();

    const newMessage = {
      id: senderMessageId,
      message: inputMessage,
      date: new Date().toLocaleTimeString("en-NP"),
      sender: "user",
    };

    inputMessage && setMessages([...messages, newMessage]);

    const promptMessage = {
      session_id: userChatId,
      question: inputMessage,
    };
    getreplyForPropmt(promptMessage);
    setInputMessage("");
  };

  return (
    <div className="flex flex-row h-screen">
      <NewSidebar />
      <div className="flex flex-1 flex-col space-y-10 mb-10 ">
        <div className=" h-12 bg-slate-800">
          <div className="p-4">
            <h2 className="  text-center align text-white">Welcome to chat</h2>
          </div>
        </div>
        <div className="h-full overflow-auto">
          <div className=" mx-40">
            <ChatBubble messages={messages} loading={isPending} />
          </div>
        </div>

        <div className="mx-40 flex items-end space-x-6">
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
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
