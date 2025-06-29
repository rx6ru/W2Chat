import { useAuthStore } from "../store/useAuthStore";
import { useChatStore} from "../store/useChatStore";
import { useEffect, useRef} from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      // Add a small delay to ensure images are loaded
      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} 
          >
            <div className="chat-image avatar">
              <div className="p-1 border rounded-full size-10">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/user.png"
                      : selectedUser.profilePic || "/user.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="flex flex-col chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                  onLoad={scrollToBottom} // Scroll when image loads
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
            <div className="mt-1 chat-footer">
              <time className="ml-1 text-xs opacity-50">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
          </div>
        ))}
        {/* Empty div to mark the end of messages */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;