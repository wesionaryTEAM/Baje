import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Chat from "./components/ui/chat";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Chat />
    </QueryClientProvider>
  );
}

export default App;
