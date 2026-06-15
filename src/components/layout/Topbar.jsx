// components/layout/Topbar.jsx

import { Cross } from "lucide-react";

export default function Topbar() {
    return (
        <div className="bg-[#03276e] text-white text-[13px] py-[8px] px-6">
            <div className="container mx-auto w-[95%] max-w-[1450px] flex justify-between items-center">
                <div className="flex items-center gap-2"><Cross size={14} /> Uniting Catholic ministries in Southeast Pennsylvania for the salvation of souls.</div>
                <div>Leader Access &nbsp;&nbsp; | &nbsp;&nbsp; English</div>
            </div>
        </div>
    );
}