import DashboardSidebar from "@/src/components/layout/DashboardSidebar";
import DashboardHeader from "@/src/components/layout/DashboardHeader";
import { AuthProvider } from "@/src/components/providers/AuthProvider";
// import DashboardFooter from "@/components/layout/DashboardFooter";

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar />

        <div className="flex flex-col flex-1 ml-[260px]">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto bg-[#f4f6fb]">
            {children}
          </main>

          {/* <DashboardFooter /> */}
        </div>
      </div>
    </AuthProvider>
  );
}