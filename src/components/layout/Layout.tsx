import { useAppStore } from '../../store/useAppStore';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const activeTool = useAppStore((state) => state.activeTool);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar - only show in docs section */}
      {activeTool === 'docs' && <Sidebar />}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
