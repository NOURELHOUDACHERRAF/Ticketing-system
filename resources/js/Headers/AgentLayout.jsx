import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import SidebarAgent from '@/SideBars/SideBarAgent';
import AgentHeader from '@/Headers/AgentHeader';

export default function AgentLayout({ user, children }) {
    const page = usePage();
    const currentUser = user ?? page.props.auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!currentUser) return <div>Loading...</div>;

    return (
        <div className="flex h-screen w-screen overflow-hidden font-sans bg-white">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <SidebarAgent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col bg-gray-50">
                <AgentHeader setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 p-6 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
