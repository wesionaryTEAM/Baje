import {
  getSelectedRole,
  getUserData,
  setSelectedRole,
} from "@/utility/UserDataHandler";
import { CircleUserRound, MonitorCheck, Settings, Wrench } from "lucide-react";
import { MessageType } from "../chat";
import React, { useEffect, useState } from "react";

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
    <div className=" w-64 bg-white border-e border-gray-200 overflow-y-auto  ">
      <nav className=" size-full flex flex-col">
        <div className="flex items-center justify-between pt-4 pe-4 ps-7">
          <h1 className="text-2xl text-slate-700  font-bold">Wesionary Bot</h1>
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

        <div className="mt-auto">
          <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
            <a
              className="flex justify-start items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 "
              href="#"
            >
              <CircleUserRound width={30} height={30} />
              <span className="text-lg mt-2">User 007</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
