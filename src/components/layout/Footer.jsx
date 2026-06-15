// components/layout/Footer.jsx

export default function Footer() {
  const quickLinks = ["Home", "Ministries", "Events", "Resources", "About Us", "Get Involved"];
  const leaderLinks = ["Leader Access", "Directory", "Shared Documents", "Calendar Guidelines", "Contact Admin"];
  const resourceLinks = ["Spiritual Guidelines", "Prayers for Our Times", "Blog (Leaders)", "Toolkits", "Help & FAQs"];

  return (
    <footer className="bg-[#031a4a] text-white mt-[25px] pt-[40px]">
      <div className="container mx-auto w-[95%] max-w-[1450px]">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-[35px] pb-[35px]">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-[14px] mb-[20px]">
              <div className="w-[45px] h-[45px] rounded-full bg-gradient-to-br from-[#f5a623] to-[#0a48d8]"></div>
              <div>
                <h3 className="text-[20px] font-['Cormorant_Garamond',serif] font-bold">THE UPPER ROOM</h3>
                <span className="text-[10px] tracking-[3px] opacity-80">MINISTRY HUB</span>
              </div>
            </div>
            <p className="text-[14px] leading-[1.8] text-[#d2daf0] mb-[20px]">
              Uniting Catholic ministries in
              Southeast Pennsylvania for the
              salvation of souls.
            </p>
            <div className="flex gap-[12px]">
              <span className="w-[34px] h-[34px] rounded-full border border-white/20 flex items-center justify-center text-[14px] cursor-pointer hover:bg-white/10 transition">
                f
              </span>
              <span className="w-[34px] h-[34px] rounded-full border border-white/20 flex items-center justify-center text-[14px] cursor-pointer hover:bg-white/10 transition">
                ◎
              </span>
              <span className="w-[34px] h-[34px] rounded-full border border-white/20 flex items-center justify-center text-[14px] cursor-pointer hover:bg-white/10 transition">
                ▶
              </span>
              <span className="w-[34px] h-[34px] rounded-full border border-white/20 flex items-center justify-center text-[14px] cursor-pointer hover:bg-white/10 transition">
                ✉
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-[14px] font-bold mb-[18px]">QUICK LINKS</h4>
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="block text-[14px] text-[#d2daf0] mb-[11px] hover:text-white transition"
              >
                {link}
              </a>
            ))}
          </div>

          {/* For Ministry Leaders Column */}
          <div>
            <h4 className="text-[14px] font-bold mb-[18px]">FOR MINISTRY LEADERS</h4>
            {leaderLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="block text-[14px] text-[#d2daf0] mb-[11px] hover:text-white transition"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-[14px] font-bold mb-[18px]">RESOURCES</h4>
            {resourceLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="block text-[14px] text-[#d2daf0] mb-[11px] hover:text-white transition"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Stay Connected Column */}
          <div>
            <h4 className="text-[14px] font-bold mb-[18px]">STAY CONNECTED</h4>
            <p className="text-[14px] leading-[1.8] text-[#d2daf0] mb-[18px]">
              Subscribe to receive updates on
              events, resources, and ministry news.
            </p>
            <div className="flex bg-white rounded-[12px] overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border-none p-[14px] outline-none text-gray-800 text-[14px]"
              />
              <button className="w-[55px] border-none bg-[#0a48d8] text-white text-[18px] cursor-pointer hover:bg-[#0a3cb8] transition">
                →
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 py-[20px] flex flex-col sm:flex-row justify-between items-center text-[13px] text-[#d2daf0]">
          <div>
            © 2026 The Upper Room Initiative. All rights reserved.
          </div>
          <div className="flex gap-[20px] mt-[10px] sm:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
}