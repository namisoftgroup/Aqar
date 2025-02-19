import axiosInstance from "../utils/axios";

export async function getChats() {
  try {
    const res = await axiosInstance.post("user/get_chats");
    const data = res.data.data;
    return data;
  } catch (e) {
    console.error("Error fetching chats:", e.message);
    throw new Error("Error fetching chats");
  }
}

export async function getChatDetails(reqBody) {
  try {
    const res = await axiosInstance.post("user/get_chat_details", reqBody);
    const data = res.data.data;
    return data;
  } catch (e) {
    console.error("Error fetching chat details:", e.message);
    throw new Error("Error fetching chat details");
  }
}

export async function createMessage(reqBody) {
  try {
    const res = await axiosInstance.post("user/create_message", reqBody, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = res.data;
    return data;
  } catch (e) {
    console.error("Error creating message:", e.message);
    throw new Error("Error creating message");
  }
}
