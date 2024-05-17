import { Bot } from "lucide-react";
import { HTMLContentRender } from "../HtmlContentRender";
import { MessageType } from "../chat";

interface ChatBubbleMessageProps {
  messages: MessageType[];
  loading: boolean;
}
const ChatBubble = (props: ChatBubbleMessageProps) => {
  const { messages, loading } = props;
  return (
    <>
      {messages.map((item, key: number) => (
        <>
          {item?.sender === "user" ? (
            <div
              className={`flex items-start justify-end my-8 ${
                loading && key === messages.length - 1 && "opacity-30"
              }`}
              key={key + item?.id}
            >
              <div className="flex  gap-1">
                {/* <User width={40} height={40} /> */}
                <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-700 rounded-l-xl rounded-b-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <span className="text-sm font-semibold text-white">
                      User
                    </span>
                    <span className="text-sm font-normal text-gray-100 dark:text-gray-400">
                      {item?.date}
                    </span>
                  </div>
                  <p className="text-base font-normal text-white">
                    {item?.message}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start my-8" key={key + item?.id}>
              <div className="flex gap-2">
                <Bot width={40} height={40} />
                <div className="flex flex-col w-full  mt-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <span className=" text-base font-semibold text-gray-900 dark:text-white">
                      Bot
                    </span>
                    <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                      {item?.date}
                    </span>
                  </div>
                  <HTMLContentRender content={item?.message} />
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default ChatBubble;
