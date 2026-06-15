// components/layout/Navbar.jsx
"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";



export default function Navbar() {

      const menuItems = [
    { name: "Home", href: "/" },
    { name: "Ministries", href: "/ministries" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/#resources" },
    { name: "About", href: "/#about" },
    { name: "Get Involved", href: "/#get-involved" },
  ];

  const router = useRouter();
  const pathname = usePathname();

    return (
        <header className="bg-white sticky top-0 z-[999] shadow-[0_2px_18px_rgba(0,0,0,0.05)]">
            <div className="container mx-auto w-[95%] max-w-[1450px] h-[92px] flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-[15px]">
                    <div className="w-[55px] h-[55px] rounded-full bg-gradient-to-br from-[#f7ad32] to-[#0a4cdf]"></div>
                    <div>
                        <h2 className="text-[28px] leading-none font-['Cormorant_Garamond',serif] font-bold text-[#11295c]">THE UPPER ROOM</h2>
                        <span className="text-[11px] tracking-[3px] text-[#7885a4]">MINISTRY HUB</span>
                    </div>
                </div>

        {/* Navigation */}
        <nav className="flex gap-[35px] font-medium text-[15px] text-[#11295c]">
          {menuItems.map((item) => {
            // Match active path, exact match for root `/` or matching paths like `/ministries`
            const isActive = pathname === item.href || (item.href !== '/' && !item.href.includes('#') && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative after:content-[''] after:absolute after:left-0 after:-bottom-[8px] after:h-[2px] after:bg-[#0a4cdf] after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'after:w-full text-[#0a4cdf]' : 'after:w-0'}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

                {/* Buttons */}
                <div className="flex gap-[14px]">
                    <button
                    onClick={() => router.push("/login")}
                     className="px-[24px] py-[13px] rounded-[14px] font-semibold bg-white border border-[#dbe2ef] text-[#10295c] transition-all duration-300 hover:-translate-y-[2px]">
                        Sign In
                    </button>
                    <button onClick={() => router.push("/signup")} className="px-[24px] py-[13px] rounded-[14px] font-semibold bg-[#0a4cdf] text-white transition-all duration-300 hover:-translate-y-[2px]">
                        Sign Up
                    </button>
                </div>
            </div>
        </header>
    );
}