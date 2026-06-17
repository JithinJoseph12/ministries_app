// components/sections/Involve.jsx

export default function Involve() {
  const involveOptions = [
    {
      id: 1,
      icon: "📅",
      title: "Attend Events",
      description: "Discover retreats, talks,\nand celebrations."
    },
    {
      id: 2,
      icon: "👥",
      title: "Find a Ministry",
      description: "Connect with ministries\nnear you."
    },
    {
      id: 3,
      icon: "🙏",
      title: "Volunteer",
      description: "Offer your time and\ntalents in service."
    },
    {
      id: 4,
      icon: "❤",
      title: "Support the Mission",
      description: "Help build a culture of life,\nfaith, and love.",
      isHeart: true
    },
    {
      id: 5,
      icon: "👨‍💼",
      title: "Leader Access",
      description: "Tools, resources and\ndirectory for leaders."
    },
    {
      id: 6,
      icon: "✉",
      title: "Stay Connected",
      description: "Get updates on events,\nresources and news."
    }
  ];

  return (
    <section id="get-involved" className="container mx-auto w-[95%] max-w-[1450px] mt-[35px]">
      <div className="bg-white rounded-[20px] p-[25px_30px] border border-[#e9edf5]">

        {/* Section Mini Title */}
        <div className="text-center text-[12px] font-bold tracking-[0.5px] text-[#173783] mb-[25px]">
          HOW WOULD YOU LIKE TO GET INVOLVED?
        </div>

        {/* Involve Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {involveOptions.map((option, index) => (
            <div
              key={option.id}
              className={`text-center p-[20px_15px] ${index !== involveOptions.length - 1 ? 'border-r border-[#edf1f7]' : ''
                }`}
            >
              {/* Icon */}
              <div className={`w-[58px] h-[58px] mx-auto border border-[#e6ebf5] rounded-full flex items-center justify-center text-[24px] bg-white mb-[16px] ${option.isHeart ? 'text-[#ff4b57]' : 'text-[#173783]'
                }`}>
                {option.icon}
              </div>

              {/* Title */}
              <h4 className="text-[16px] font-bold text-[#11295c] mb-[10px]">{option.title}</h4>

              {/* Description */}
              <p className="text-[12px] leading-[1.7] text-[#697899] whitespace-pre-line">
                {option.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}