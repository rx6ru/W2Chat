import { MessageSquareQuote } from "lucide-react";

const EmptyChatContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full p-16 bg-base-100/50">
      <div className="max-w-md space-y-6 text-center">

        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 animate-pulse"
            >
              
              <MessageSquareQuote className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>


        <h2 className="text-2xl font-bold">Welcome Human</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar
        </p>
      </div>
    </div>
  );
};

export default EmptyChatContainer;