// components/sections/Hero.jsx
import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="container mx-auto w-[95%] max-w-[1450px] mt-[24px]">
      <div className="bg-white rounded-[28px] overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] min-h-[720px] shadow-[0_12px_35px_rgba(0,0,0,0.05)] ">
        
        {/* Left Content */}
        <div className="px-[60px] py-[70px] flex flex-col justify-center">
          <h1 className="text-[88px] leading-[0.92] font-['Cormorant_Garamond',serif] font-bold text-[#11295c] mb-[20px]">
            Many Ministries.<br />One Mission.
          </h1>
          <h3 className="text-[48px] font-['Cormorant_Garamond',serif] italic text-[#ef9822] font-semibold mb-[30px]">
            For the salvation of souls.
          </h3>
          <p className="text-[18px] leading-[1.9] text-[#667391] max-w-[580px] mb-[40px]">
            The Upper Room unites Catholic apostolates in Southeast Pennsylvania
            to foster charity, collaboration, visibility, and shared resources.
          </p>
          <div className="flex gap-[18px] text-sm">
            <button className="px-[24px] py-[13px] rounded-[14px] font-semibold bg-[#0a4cdf] text-white transition-all duration-300 hover:-translate-y-[2px]">
              Explore Ministries
            </button>
            <button className="px-[24px] py-[13px] rounded-[14px] font-semibold bg-white border border-[#dbe2ef] text-[#10295c] transition-all duration-300 hover:-translate-y-[2px]">
              View Upcoming Events
            </button>
          </div>
        </div>

        {/* Right Image with Quote Card */}
        <div className="relative overflow-hidden">
          <Image 
src="/images/hero.jpg"
  width={700}
  height={500}
            alt="Church interior"
            className="w-full h-full object-cover"
          />
          
          {/* Quote Card */}
          <div className="absolute right-[35px] bottom-[35px] bg-white p-[35px] w-[360px] rounded-[24px] shadow-[0_15px_35px_rgba(0,0,0,0.15)]">
            <p className="text-[30px] leading-[1.3] font-['Cormorant_Garamond',serif] mb-[15px] text-[#11295c]">
              “As the Father has sent me, even so I send you.”
            </p>
            <span className="text-[14px] text-[#7a87a5]">— John 20:21</span>
          </div>
        </div>

      </div>
    </section>
  );
}