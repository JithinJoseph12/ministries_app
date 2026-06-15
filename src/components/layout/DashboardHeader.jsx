import { Bell, ChevronDown, Menu } from "lucide-react";

// ─── Top Header ────────────────────────────────────────────────────────────────
export default function Header() {
    return (
        <header
            className="flex items-center justify-between px-6 py-6 sticky top-0 z-10"
            style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e8edf5" }}
        >
            <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                <Menu size={20} style={{ color: "#1e3a8a" }} />
            </button>

            <div className="flex items-center gap-4">
                {/* Bell */}
                <button className="relative p-1.5 rounded hover:bg-gray-100 transition-colors">
                    <Bell size={20} style={{ color: "#1e3a8a" }} />
                    <span
                        className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: "#ffb700ff", fontSize: "12px", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}
                    >
                        3
                    </span>
                </button>

                {/* User */}
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <div
                        className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
                        style={{ border: "2px solid #e8edf5" }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&fit=crop&auto=format"
                            alt="George"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p style={{ color: "#1e3a8a", fontSize: "17px", fontWeight: 700, fontFamily: "'Inter', sans-serif", lineHeight: "1.3" }}>George</p>
                        <p style={{ color: "#6b7a99", fontSize: "12px", fontFamily: "'Inter', sans-serif", lineHeight: "1.3" }}>Super Admin</p>
                    </div>
                    <ChevronDown size={14} style={{ color: "#6b7a99" }} />
                </div>
            </div>
        </header>
    );
}