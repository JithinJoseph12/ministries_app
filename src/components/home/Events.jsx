"use client";

import { useMemo } from 'react';
import { useEvents } from '@/src/hooks/useEvents';

export default function Events() {
  const { events: allEvents, isLoading, getCalendarDays } = useEvents();

  const { targetMonth, targetYear, monthName } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currMonth = today.getMonth();
    const currYear = today.getFullYear();
    
    // Check if there are any upcoming events in the current month
    const hasUpcomingThisMonth = allEvents.some(event => {
       if (!event.startDate) return false;
       const eventDate = new Date(event.startDate);
       return eventDate >= today && eventDate.getMonth() === currMonth && eventDate.getFullYear() === currYear;
    });

    let tMonth = currMonth;
    let tYear = currYear;

    if (!hasUpcomingThisMonth && allEvents.length > 0) {
        // Find if next month has events
        tMonth = (currMonth + 1) % 12;
        if (currMonth === 11) tYear = currYear + 1;
    }

    const mNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return { targetMonth: tMonth, targetYear: tYear, monthName: mNames[tMonth] };
  }, [allEvents]);

  const calendarDates = useMemo(() => {
      return getCalendarDays(targetYear, targetMonth, allEvents, 'dates');
  }, [getCalendarDays, targetMonth, targetYear, allEvents]);

  const eventList = useMemo(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return allEvents
        .filter(event => {
            if (!event.startDate) return false;
            const ed = new Date(event.startDate);
            return ed.getMonth() === targetMonth && ed.getFullYear() === targetYear && ed >= today;
        })
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .slice(0, 4)
        .map(event => {
            const ed = new Date(event.startDate);
            let tagClass = "outreach";
            const cat = event.category?.toLowerCase() || '';
            if (cat.includes("pro-life") || cat.includes("family")) tagClass = "prolife";
            else if (cat.includes("youth")) tagClass = "youth";
            else if (cat.includes("formation") || cat.includes("evangelization")) tagClass = "family";
            
            return {
                id: event.id,
                month: monthName.substring(0, 3).toUpperCase(),
                day: ed.getDate().toString().padStart(2, '0'),
                tag: event.category ? event.category.toUpperCase() : "EVENT",
                tagClass,
                title: event.title,
                date: `${monthName} ${ed.getDate()}, ${ed.getFullYear()} ${event.time ? '• ' + event.time : ''}`,
                location: event.location
            };
        });
  }, [allEvents, targetMonth, targetYear, monthName]);

  const tagStyles = {
    prolife: "bg-[#fff2dc] text-[#cb7c00]",
    youth: "bg-[#e5f7ea] text-[#009245]",
    family: "bg-[#efe5ff] text-[#7b3fda]",
    outreach: "bg-[#e7efff] text-[#1956d7]"
  };

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const eventTypeStyles = {
    yellow: "bg-[#fff2cb]",
    green: "bg-[#ddf6de]",
    purple: "bg-[#f1deff]",
    blue: "bg-[#ddeeff]"
  };

  return (
    <section id='events' className="container mx-auto w-[95%] max-w-[1450px] mt-[35px]">
      <div className="bg-white rounded-[24px] p-[38px] shadow-[0_8px_25px_rgba(0,0,0,0.04)]">

        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-center mb-[30px]">
          <div>
            <small className="block text-[12px] font-bold tracking-[0.5px] text-[#0a4cdf] mb-[8px]">
              UPCOMING EVENTS
            </small>
            <h2 className="text-[50px] font-['Cormorant_Garamond',serif] font-bold text-[#11295c]">
              {monthName} {targetYear}
            </h2>
          </div>
          <a href="/events" className="font-semibold text-[#0a4cdf] hover:underline">
            View All Events →
          </a>
        </div>

        {/* Events Layout - Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[390px_1fr] gap-[28px]">

          {/* Events List */}
          <div className="flex flex-col gap-[18px]">
            {eventList.map((event) => (
              <div
                key={event.id}
                className="border border-[#e7ebf4] rounded-[18px] p-[20px] flex gap-[18px] transition-all duration-300 hover:bg-[#fafcff] hover:translate-x-[4px]"
              >
                <div className="w-[82px] min-w-[82px] bg-[#f4f7ff] rounded-[16px] text-center p-[14px_10px]">
                  <small className="text-[12px] font-semibold text-[#6e7a99]">{event.month}</small>
                  <h3 className="text-[34px] font-bold text-[#11295c] mt-[5px]">{event.day}</h3>
                </div>
                <div className="flex-1">
                  <span className={`inline-block px-[10px] py-[5px] rounded-[30px] text-[11px] font-bold mb-[10px] ${tagStyles[event.tagClass]}`}>
                    {event.tag}
                  </span>
                  <h4 className="text-[20px] font-bold text-[#11295c] mb-[10px]">{event.title}</h4>
                  <p className="text-[13px] leading-[1.7] text-[#697493]">
                    {event.date}<br />{event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="border border-[#e5eaf4] rounded-[22px] overflow-hidden">
            {/* Calendar Header */}
            <div className="p-[20px] bg-[#f7f9fd] flex justify-between items-center font-semibold text-[#11295c]">
              <div>{monthName} {targetYear}</div>
              <div className="flex gap-2">
                <span className="cursor-pointer">Month</span> |
                <span className="cursor-pointer">Week</span> |
                <span className="cursor-pointer">List</span>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
              {/* Weekday Headers */}
              {weekdays.map((day, idx) => (
                <div
                  key={idx}
                  className="border border-[#edf1f7] p-[12px] text-center font-semibold text-[13px] bg-[#fafcff] text-[#11295c]"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Dates */}
              {calendarDates.map((date, idx) => (
                <div
                  key={idx}
                  className={`border border-[#edf1f7] p-[12px] text-[13px] min-h-[120px] align-top ${!date.currentMonth ? "text-gray-400" : "text-[#11295c]"
                    }`}
                >
                  <span className="font-medium">{date.day}</span>
                  {date.events.map((event, eventIdx) => {
                    let type = "blue";
                    const cat = event.category?.toLowerCase() || '';
                    if (cat.includes("pro-life") || cat.includes("family")) type = "yellow";
                    else if (cat.includes("youth")) type = "green";
                    else if (cat.includes("formation") || cat.includes("evangelization")) type = "purple";
                    
                    return (
                    <div
                      key={eventIdx}
                      className={`${eventTypeStyles[type]} p-[6px_8px] rounded-[8px] text-[11px] mt-[10px] font-medium text-gray-800`}
                    >
                      {event.title}
                    </div>
                  )})}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}