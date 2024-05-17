/* eslint-disable @typescript-eslint/no-explicit-any */
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Codeblock from "../Codeblocks";
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
            <>
              <div
                className={`flex items-start justify-end my-8`}
                key={key + item?.id}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex  flex-col gap-1">
                    <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-700 rounded-l-xl rounded-b-xl ">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                        <span className="text-sm font-semibold text-white">
                          {"user"}
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
                  {loading && key === messages.length - 1 && (
                    <p className="flex justify-end items-end">
                      <img
                        src="./bajey-thinking.webp"
                        alt="thnking"
                        height={30}
                        width={30}
                        className="mr-2 rounded-full"
                      />
                      <span>बाजे सोच्दै हुनुहुन्छ...</span>
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-start my-8" key={key + item?.id}>
              <img
                src="./bajey-thinking.webp"
                alt="thnking"
                height={40}
                width={40}
                className=" mr-4 rounded-full"
              />
              <div className="flex gap-2">
                {/* <Bot width={40} height={40} /> */}
                <div className="flex flex-col   mt-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <span className=" text-base font-semibold text-gray-900 ">
                      बाजे
                    </span>
                    <span className="text-base font-normal text-gray-500 ">
                      {item?.date}
                    </span>
                  </div>
                  <div>
                    <Markdown
                      // children={markdown}
                      // className="max-w-[500px] whitespace-pre-wrap break-words"
                      className="max-w-[600px]"
                      // remarkPlugins={[remarkGfm]}
                      // rehypePlugins={[rehypeSlug]}
                      components={{
                        code(props) {
                          const { children, className, ...rest } = props;
                          const match = /language-(\w+)/.exec(className || "");
                          return match ? (
                            <Codeblock text={children}>
                              <SyntaxHighlighter
                                // {...rest}
                                PreTag="div"
                                children={String(children).replace(/\n$/, "")}
                                language={match[1]}
                              />
                            </Codeblock>
                          ) : (
                            <code {...rest} className={className}>
                              {String(children).replace(/\n$/, "")}
                            </code>
                          );
                        },
                      }}
                    >
                      {item?.message}
                    </Markdown>
                  </div>
                  {/* <HTMLContentRender content={item?.message} /> */}
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
