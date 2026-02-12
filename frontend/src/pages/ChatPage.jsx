import { useChatStore } from "../store/useChatStore"
import SideBar from "../components/SideBar"
import EmptyChatContainer from "../components/EmptyChatContainer"
import ChatContainer from "../components/ChatContainer"

function ChatPage() {

  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full overflow-hidden rounded-2xl">
            <SideBar />

            {!selectedUser ? <EmptyChatContainer /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage