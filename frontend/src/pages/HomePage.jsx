import { useChatStore } from "../store/useChatStore"
import SideBar from "../components/SideBar"
import EmptyChatContainer from "../components/EmptyChatContainer"
import ChatContainer from "../components/ChatContainer"

function HomePage() {

  const {selectedUser} = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4 pt-20">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(104vh-8rem)]">
          <div className="flex h-full overflow-hidden rounded-lg">
            <SideBar />

            {!selectedUser ? <EmptyChatContainer /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage