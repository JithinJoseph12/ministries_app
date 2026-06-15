// components/sections/About.jsx

import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="container mx-auto w-[95%] max-w-[1450px] mt-[22px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-[25px]">

        {/* About Panel */}
        <div className="bg-white rounded-[20px] overflow-hidden border border-[#e8edf5] grid grid-cols-1 md:grid-cols-[320px_1fr]">

          {/* About Image */}
          <div className="h-full">
            <Image
              src="/images/about.jpg"
              width={500}
              height={1000}
              alt="Church interior"
              className="w-full h-full object-cover"
            />
          </div>

          {/* About Content */}
          <div className="p-[35px]">
            <small className="text-[12px] font-bold tracking-wide text-[#163783]">
              ABOUT THE UPPER ROOM
            </small>
            <h2 className="text-[48px] leading-[1] font-['Cormorant_Garamond',serif] font-bold text-[#11295c] my-[15px] mb-[18px]">
              One Mission. Many Gifts.
            </h2>
            <p className="text-[15px] leading-[1.9] text-[#687493] mb-[22px]">
              Inspired by the Holy Spirit, we unite Catholic apostolates
              across Southeast Pennsylvania to witness to the Gospel,
              serve our neighbors, and build a culture of life, faith and love.
            </p>
            <a href="#" className="font-semibold text-[#0a48d8] hover:underline">
              Learn Our Story →
            </a>
          </div>

        </div>

        {/* Mission Panel */}
        <div className="bg-gradient-to-br from-[#03266d] to-[#0739a7] rounded-[20px] p-[40px] flex items-center gap-[35px] text-white">

          {/* Mission Art/Emoji */}
          <div className="text-[120px] opacity-15 hidden sm:block">
            ✨
          </div>

          {/* Mission Content */}
          <div className="flex-1">
            <h2 className="text-[50px] leading-[1] font-['Cormorant_Garamond',serif] font-bold mb-[20px]">
              Be Part of the Mission
            </h2>
            <p className="leading-[1.8] mb-[28px]">
              Whether you are called to serve, volunteer,
              or give—there is a place for you in the
              Upper Room community.
            </p>
            <div className="flex gap-[14px] flex-wrap">
              <button className="px-[20px] py-[12px] rounded-[12px] font-semibold bg-[#f4a523] text-white cursor-pointer transition-all duration-300 hover:bg-[#e09510]">
                Get Involved →
              </button>
              <button className="px-[20px] py-[12px] rounded-[12px] font-semibold bg-transparent border border-white/30 text-white cursor-pointer transition-all duration-300 hover:bg-white/10">
                Support the Mission
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}