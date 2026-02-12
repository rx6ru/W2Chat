import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative mx-auto lg:mx-0">
            <img
              src={selectedUser.profilePic || "/user.png"}
              alt={selectedUser.fullName}
              className="object-cover rounded-full shadow-sm size-10 border border-base-200"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full size-2.5 ring-2 ring-base-100" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className={`text-xs ${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-base-content/70"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)} className="btn btn-sm btn-circle btn-ghost">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;