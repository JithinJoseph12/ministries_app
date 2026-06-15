// components/sections/Resources.jsx

export default function Resources() {
    const resources = [
        {
            id: 1,
            icon: "📄",
            title: "Resource Center",
            description: "Documents, templates\nand guides.",
            link: "#",
            linkText: "Explore →"
        },
        {
            id: 2,
            icon: "📚",
            title: "Spiritual Resources",
            description: "Prayers, devotions and\nformation materials.",
            link: "#",
            linkText: "Visit Library →"
        },
        {
            id: 3,
            icon: "📰",
            title: "Blog & News",
            description: "Latest updates, stories\nand insights.",
            link: "#",
            linkText: "Read Latest →"
        },
        {
            id: 4,
            icon: "👤",
            title: "Tools & Guides",
            description: "Practical tools and\nministry guidelines.",
            link: "#",
            linkText: "Explore Tools →"
        }
    ];

    return (
        <section id="resources" className="container mx-auto w-[95%] max-w-[1450px] mt-[22px]">
            <div className="bg-white rounded-[20px] p-[25px_30px] border border-[#e9edf5]">

                {/* Section Mini Title - Left aligned */}
                <div className="text-left text-[12px] font-bold tracking-[0.5px] text-[#173783] mb-[25px]">
                    GROW IN FAITH. SERVE IN LOVE.
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
                    {resources.map((resource) => (
                        <div
                            key={resource.id}
                            className="flex gap-[18px] p-[18px] rounded-[18px] transition-all duration-300 hover:bg-[#f8faff]"
                        >
                            {/* Icon */}
                            <div className="w-[58px] h-[58px] min-w-[58px] rounded-[14px] bg-[#f2f6fd] flex items-center justify-center text-[24px] text-[#20439b]">
                                {resource.icon}
                            </div>

                            {/* Content */}
                            <div>
                                <h4 className="text-[17px] font-bold text-[#11295c] mb-[8px]">{resource.title}</h4>
                                <p className="text-[13px] leading-[1.7] text-[#6b7898] mb-[12px] whitespace-pre-line">
                                    {resource.description}
                                </p>
                                <a href={resource.link} className="text-[13px] font-semibold text-[#0a48d8] hover:underline">
                                    {resource.linkText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}