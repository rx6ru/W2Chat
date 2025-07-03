import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SideBarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const SideBar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = Array.isArray(users)
    ? showOnlineOnly
      ? users.filter((user) => Array.isArray(onlineUsers) && onlineUsers.includes(user._id))
      : users
    : [];

  if (isUserLoading) return <SideBarSkeleton />;

  return (
    <aside className="flex flex-col w-20 h-full transition-all duration-200 border-r lg:w-72 border-base-300 bg-base-100">
      <div className="w-full p-5 border-b border-base-300">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-primary" />
          <span className="hidden font-semibold tracking-wide lg:block text-base-content">Contacts</span>
        </div>
        <div className="items-center hidden gap-2 mt-3 lg:flex">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({Math.max((onlineUsers?.length || 0) - 1, 0)} online)
          </span>
        </div>
      </div>
      <div className="w-full px-1 py-3 overflow-y-auto">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 rounded-xl
              hover:bg-primary/10 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 ring-1 ring-primary"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/user.png"}
                alt={user.name}
                className="object-cover p-0.5 rounded-full shadow border-1 size-12 border-primary"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 bg-green-500 rounded-full size-3 ring-2 ring-base-100" />
              )}
            </div>
            <div className="hidden min-w-0 text-left lg:block">
              <div className="font-semibold truncate text-base-content">{user.fullName}</div>
              <div className={`text-xs ${onlineUsers.includes(user._id) ? "text-green-500" : "text-zinc-400"}`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="py-4 text-center text-zinc-500">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
