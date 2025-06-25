import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Gallery } from "@/modules/Gallery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Gallery />
    </QueryClientProvider>
  );
}

export default App;
