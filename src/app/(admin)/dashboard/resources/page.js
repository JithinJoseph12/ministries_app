"use client";

import ComingSoon from "@/src/components/common/ComingSoon";

export default function ResourcesPage() {
    return (
        <div className="px-20 py-10 bg-white min-h-full flex flex-col">
            <ComingSoon 
                title="Ministry Resources" 
                description="A central hub for documents, guidelines, templates, and other important resources will be available here soon."
            />
        </div>
    );
}
