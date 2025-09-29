import Sidebar from "@/Sidebars/SidebarAdmin";
import Header from "@/Headers/HeaderAdmin";

export default function AdminLayout({ children, title, auth }) {
    return (
        <div className="flex h-screen w-screen bg-gray-100 font-poppins">
            {/* Sidebar */}
            <div className="w-64">
                <Sidebar auth={auth} />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <Header title={title} auth={auth} />

                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
