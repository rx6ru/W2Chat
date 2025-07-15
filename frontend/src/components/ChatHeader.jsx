import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative mx-auto lg:mx-0">
            <img
              src={selectedUser.profilePic || "/user.png"}
              alt={selectedUser.fullName}
              className="object-cover border-1 p-0.5 rounded-full shadow size-12 border-primary"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-base-100" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold">{selectedUser.fullName}</h3>
            <p className={`text-sm ${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-base-content/70"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)} className="btn btn-sm btn-circle btn-ghost">
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;