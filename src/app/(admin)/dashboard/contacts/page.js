"use client";

import ComingSoon from "@/src/components/common/ComingSoon";

export default function ContactsPage() {
    return (
        <div className="px-20 py-10 bg-white min-h-full flex flex-col">
            <ComingSoon 
                title="Contacts Directory" 
                description="A comprehensive directory of all ministry leaders, members, and external contacts is currently under development."
            />
        </div>
    );
}
