import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "@/layout";
import { Gallery } from "@/modules/Gallery";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Gallery />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
