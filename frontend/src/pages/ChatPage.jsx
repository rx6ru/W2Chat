import { useChatStore } from "../store/useChatStore"
import SideBar from "../components/SideBar"
import EmptyChatContainer from "../components/EmptyChatContainer"
import ChatContainer from "../components/ChatContainer"

/**
 * Renders the main chat page layout with a sidebar and chat area.
 *
 * Displays a sidebar alongside either an empty chat placeholder or the active chat container, depending on whether a user is selected in the chat store.
 * @returns {JSX.Element} The chat page component.
 */
function ChatPage() {

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

export default ChatPage