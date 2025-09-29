import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "@/Components/SidebarAdmin";
import Header from "@/Components/HeaderAdmin";

export default function AuthenticatedLayout({ auth, children }) {
  const user = auth?.user ?? usePage().props.auth?.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    console.warn("⚠️ No user found in Inertia props!");
    return <div className="p-6 text-red-600">Not logged in</div>;
  }

  return (
    <div className="flex h-screen bg-blue-50 font-poppins overflow-hidden">
      {}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      {sidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
          <Sidebar />
        </div>
      )}

      {}
      <div className="flex-1 flex flex-col">
        <Header setSidebarOpen={setSidebarOpen} user={user} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
