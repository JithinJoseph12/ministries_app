"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Ministries() {
  const filters = ["All", "Pro-Life", "Youth", "Family", "Vocations", "Outreach"];

  const [activeFilter, setActiveFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const ministriesData = [
    {
      id: 1,
      title: "Guiding Star Pregnancy Center",
      tag: "PRO-LIFE",
      tagClass: "prolife",
      description: "Supporting women and families facing unplanned pregnancies with love and hope.",
      image: "/images/pro-life.jpg"
    },
    {
      id: 2,
      title: "Arise! Youth Ministry",
      tag: "YOUTH",
      tagClass: "youth",
      description: "Leading teens into a deeper relationship with Christ through community and service.",
      image: "/images/youth.jpg"
    },
    {
      id: 3,
      title: "Domestic Church Families",
      tag: "FAMILY",
      tagClass: "family",
      description: "Strengthening Catholic families through faith, formation and fellowship.",
      image: "/images/family.jpg"
    },
    {
      id: 4,
      title: "Hearts On Fire Vocations",
      tag: "VOCATIONS",
      tagClass: "vocation",
      description: "Encouraging and equipping young men and women to discover God's call.",
      image: "/images/vocations.jpg"
    },
    {
      id: 5,
      title: "St. Clare Outreach",
      tag: "OUTREACH",
      tagClass: "outreach",
      description: "Serving the poor and vulnerable in our communities with Christ's love.",
      image: "/images/outreach.jpg"
    }
  ];

  const tagStyles = {
    prolife: "bg-[#fff2dc] text-[#cb7c00]",
    youth: "bg-[#e5f7ea] text-[#009245]",
    family: "bg-[#efe5ff] text-[#7b3fda]",
    vocation: "bg-[#fff0dd] text-[#cf7e00]",
    outreach: "bg-[#e7efff] text-[#1956d7]"
  };

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getFilteredIndices = (filter) => {
    if (filter === "All") {
      return ministriesData.map((_, idx) => idx);
    }
    const filterNormalized = filter.toLowerCase().replace("-", "");
    return ministriesData
      .map((ministry, idx) => {
        const tagNormalized = ministry.tag.toLowerCase().replace("-", "");
        return filterNormalized.includes(tagNormalized) || tagNormalized.includes(filterNormalized) ? idx : -1;
      })
      .filter(idx => idx !== -1);
  };

  const handleFilterClick = (filter) => {
    if (activeFilter === filter) return;

    const filteredIndices = getFilteredIndices(filter);
    
    if (filteredIndices.length === 0) {
      setActiveFilter(filter);
      return;
    }

    setActiveFilter(filter);
    
    // Find the first matching ministry and its index
    const targetIndex = filteredIndices[0];
    
    // Animate to the target index
    setCurrentIndex(targetIndex);
  };

  // Desktop Carousel with 3D effect
  const DesktopCarousel = () => {
    const handleDragEnd = (_event, info) => {
      const threshold = 30;
      if (info.offset.x > threshold) {
        setCurrentIndex((prev) => (prev - 1 + ministriesData.length) % ministriesData.length);
      } else if (info.offset.x < -threshold) {
        setCurrentIndex((prev) => (prev + 1) % ministriesData.length);
      }
    };

    const getCardStyle = (index) => {
      const diff = index - currentIndex;
      const normalizedDiff = (diff + ministriesData.length) % ministriesData.length;
      const position =
        normalizedDiff > ministriesData.length / 2
          ? normalizedDiff - ministriesData.length
          : normalizedDiff;

      const offset = 280; // 260px width + 20px gap
      
      if (Math.abs(position) > 2) {
        return { x: position > 0 ? 1000 : -1000, scale: 1, z: 0, opacity: 0, rotateY: 0, zIndex: 10 };
      }

      return { 
        x: position * offset, 
        scale: 1, 
        z: 0, 
        opacity: 1, 
        rotateY: 0, 
        zIndex: 50 - Math.abs(position) 
      };
    };

    const isHighlighted = (index) => {
      return activeFilter !== "All" && index === currentIndex;
    };

    return (
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
          onDragEnd={handleDragEnd}
        >
          {ministriesData.map((ministry, index) => {
            const style = getCardStyle(index);
            const highlighted = isHighlighted(index);
            
            return (
              <motion.div
                key={ministry.id}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  z: style.z,
                  opacity: style.opacity,
                  rotateY: style.rotateY,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 60 }}
                className="absolute w-[260px]"
                style={{ transformStyle: "preserve-3d", zIndex: highlighted ? 60 : style.zIndex }}
              >
            <div
              key={ministry.id}
              className={`flex flex-col h-[400px] border border-[#e7ebf4] rounded-[22px] overflow-hidden transition-all duration-300 bg-white hover:-translate-y-[6px] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] ${
                highlighted ? 'ring-4 ring-[#03276e] ring-offset-2' : ''
              }`}
            >
              <div className="h-[180px] shrink-0 overflow-hidden">
                <img
                  src={ministry.image}
                  alt={ministry.title}
                  className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                />
              </div>
              <div className="p-[24px] flex flex-col flex-1">
                <div>
                  <span className={`inline-block px-[10px] py-[5px] rounded-[30px] text-[11px] font-bold mb-[14px] ${tagStyles[ministry.tagClass]}`}>
                    {ministry.tag}
                  </span>
                </div>
                <h3 className="text-[22px] font-bold text-[#11295c] mb-[px]">{ministry.title}</h3>
                <p className="text-[14px] leading-[1.8] text-[#687493]">{ministry.description}</p>
              </div>
            </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    );
  };


  return (
    <section id="ministries" className="container mx-auto w-[95%] max-w-[1450px] mt-[35px]">
      <div className="bg-white rounded-[24px] p-[38px] shadow-[0_8px_25px_rgba(0,0,0,0.04)]">
        
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-center mb-[30px]">
          <div>
            <small className="block text-[12px] font-bold tracking-[0.5px] text-[#0a4cdf] mb-[8px]">
              MINISTRIES AT A GLANCE
            </small>
            <h2 className="text-[50px] font-['Cormorant_Garamond',serif] font-bold text-[#11295c]">
              Catholic Ministries Working Together
            </h2>
          </div>
          <a href="#" className="font-semibold text-[#0a4cdf] hover:underline">
            View All Ministries →
          </a>
        </div>

        {/* Filters */}
        <div className="flex gap-[14px] flex-wrap  ">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => handleFilterClick(filter)}
              className={`px-[24px] py-[12px] rounded-[14px] border border-[#dde4f0] text-[14px] font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === filter 
                  ? "bg-[#03276e] text-white border-[#03276e] shadow-md" 
                  : "bg-white text-[#11295c] hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <DesktopCarousel />

  

      </div>
    </section>
  );
}