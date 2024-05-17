/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getSelectedRole,
  getUserData,
  setSelectedRole,
} from "@/utility/UserDataHandler";
import { MonitorCheck, Settings, Wrench } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MessageType } from "../chat";

interface SidebarProps {
  handleChange: (message: number) => void;
}

export const NewSidebar = (props: SidebarProps) => {
  const { handleChange } = props;
  const userData = getUserData();
  const [selectedChat, setSelectedChat] = useState<number>(
    Number(getSelectedRole())
  );

  useEffect(() => {
    setSelectedChat(Number(getSelectedRole()));
  }, [getSelectedRole()]);

  return (
    <div className=" w-64  bg-white border-e border-gray-200 overflow-y-auto shrink-0  ">
      <nav className=" flex flex-col">
        <div className="flex items-end justify-start pt-4 pe-4 ps-7">
          <img
            src="./bajey-thinking.webp"
            alt="thnking"
            height={50}
            width={50}
            className="mr-3 rounded-lg"
          />
          <h1 className="text-2xl text-slate-700  font-bold">बाजे</h1>
        </div>

        <div className="h-full">
          <ul className="space-y-1.5 p-4">
            {userData?.data.map(
              (
                item: { role: string; id: number; messages: MessageType[] },
                key: number
              ) => (
                <React.Fragment key={key + item?.id}>
                  <li
                    onClick={() => {
                      setSelectedChat(item?.id);
                      setSelectedRole(item?.id);
                      handleChange(item?.id);
                    }}
                  >
                    <a
                      className={`flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 ${
                        selectedChat === item?.id && "bg-gray-100"
                      } `}
                      href="#"
                    >
                      {item.id == 3333 && <MonitorCheck />}
                      {item.id == 2222 && <Settings />}
                      {item.id == 1111 && <Wrench />}
                      <span className="font-semibold">{item?.role}</span>
                    </a>
                  </li>
                </React.Fragment>
              )
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
