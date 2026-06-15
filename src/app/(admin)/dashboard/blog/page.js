"use client";

import ComingSoon from "@/src/components/common/ComingSoon";

export default function BlogPage() {
    return (
        <div className="px-20 py-10 bg-white min-h-full flex flex-col">
            <ComingSoon 
                title="Ministry Blog" 
                description="Updates, newsletters, and inspirational articles from our ministries will be featured here."
            />
        </div>
    );
}
