import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout/Layout";
import { Homepage } from "./components/home/Homepage";
import { DocSearch } from "./components/docs/DocSearch";
import { DocBrowser } from "./components/docs/DocBrowser";
import { DocViewer } from "./components/docs/DocViewer";
import { Tools } from "./components/tools/Tools";
import { useAppStore } from "./store/useAppStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const activeTool = useAppStore((state) => state.activeTool);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        {activeTool === "home" && (
          <div className="h-full animate-fadeIn">
            <Homepage />
          </div>
        )}

        {activeTool === "docs" && (
          <div className="h-full flex flex-col md:flex-row animate-fadeIn">
            <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-border flex flex-col max-h-48 md:max-h-none">
              <div className="p-3 md:p-4 border-b border-border">
                <DocSearch />
              </div>
              <div className="flex-1 overflow-y-auto">
                <DocBrowser />
              </div>
            </div>

            <div className="flex-1 min-h-0">
              <DocViewer />
            </div>
          </div>
        )}

        {activeTool === "playground" && (
          <div className="flex items-center justify-center h-full text-muted-foreground animate-fadeIn">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Code Playground</h2>
              <p className="text-sm">Coming soon...</p>
            </div>
          </div>
        )}

        {activeTool === "tools" && (
          <div className="h-full animate-fadeIn">
            <Tools />
          </div>
        )}
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
