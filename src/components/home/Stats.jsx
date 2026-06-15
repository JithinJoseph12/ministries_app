// components/sections/Stats.jsx

export default function Stats() {
  const stats = [
    { number: "20+", label: "Ministries" },
    { number: "200+", label: "Events / Year" },
    { number: "10K+", label: "Lives Impacted" },
    { number: "1", label: "Unified Mission" }
  ];

  return (
    <section className="container mx-auto w-[95%] max-w-[1450px] relative z-[2] -mt-[45px]">
      <div className="bg-white rounded-[24px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
        
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`px-[35px] py-[35px] text-center ${index !== stats.length - 1 ? 'border-r border-[#edf1f7]' : ''}`}
          >
            <h2 className="text-[42px] text-[#f29a22] mb-[10px] font-bold">{stat.number}</h2>
            <p className="text-[#697594]">{stat.label}</p>
          </div>
        ))}

      </div>
    </section>
  );
}