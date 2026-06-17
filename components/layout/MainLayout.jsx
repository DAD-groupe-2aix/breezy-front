import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="ml-60 mr-72 min-h-screen border-x border-[#E2E8F0] bg-white">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
}
