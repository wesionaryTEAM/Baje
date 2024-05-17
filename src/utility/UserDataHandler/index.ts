/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageType } from "@/components/ui/chat";

export const getLocalData = () => {
  const data = localStorage?.getItem("user-data");
  const userData = JSON.parse(data as string);
  return userData;
};
export const setLocalData = (data: any) => {
  localStorage.setItem("user-data", JSON.stringify(data));
};

export const getUserData = () => {
  const localUserData = getLocalData();
  if (localUserData?.data) return localUserData;
  else
    return {
      data: [
        {
          role: "Developer",
          id: 1111,
          messages: [],
        },
        {
          role: "Project Manager",
          id: 2222,
          messages: [],
        },
        {
          role: "QA",
          id: 3333,
          messages: [],
        },
      ],
    };
};

export const updateUserData = (message: MessageType) => {
  const localData = getUserData();

  console.log(message, localData, "local");

  const UpdatedData = localData?.data.map((item: any) => {
    console.log(item, item.roleId === message?.roleId, message, "test");
    if (item.id === message?.roleId) {
      return {
        ...item,
        messages: [...item.messages, message],
      };
    }
    return item;
  });

  const newData = {
    data: UpdatedData,
  };

  setLocalData(newData);
};

export const setSelectedRole = (id: number) => {
  localStorage.setItem("selected-chat", id.toString());
};

export const getSelectedRole = () => {
  const selectedChat = localStorage.getItem("selected-chat");
  return selectedChat;
};

export const getChatByRole = (id: number) => {
  const localData = getLocalData();
  const chat = localData?.data?.find((item: any) => item.id === id);
  return chat;
};
