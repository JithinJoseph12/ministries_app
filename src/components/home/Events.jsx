"use client";

import { useMemo, useState, useEffect } from 'react';
import { useEvents } from '@/src/hooks/useEvents';

export default function Events() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [targetMonth, setTargetMonth] = useState(new Date().getMonth());
  const [targetYear, setTargetYear] = useState(new Date().getFullYear());

  const monthName = useMemo(() => {
    const mNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return mNames[targetMonth];
  }, [targetMonth]);

  useEffect(() => {
    const fetchMonthEvents = async () => {
      try {
        const res = await fetch(`/api/events?action=calendar&month=${targetMonth}&year=${targetYear}`);
        const data = await res.json();
        if (data.success) {
          setCalendarEvents(data.events);
          
          // Auto-advance month if no events in current month (only if it's the first load essentially)
          if (data.events.length === 0) {
              const today = new Date();
              if (targetMonth === today.getMonth() && targetYear === today.getFullYear()) {
                  setTargetMonth((today.getMonth() + 1) % 12);
                  if (today.getMonth() === 11) setTargetYear(today.getFullYear() + 1);
              }
          }
        }
      } catch (e) {
        console.error("Error fetching calendar events for home page", e);
      }
    };
    fetchMonthEvents();
  }, [targetMonth, targetYear]);

  const calendarDates = useMemo(() => {
        const firstDayOfMonth = new Date(targetYear, targetMonth, 1).getDay();
        const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
        const days = [];

        const daysInPrevMonth = new Date(targetYear, targetMonth, 0).getDate();
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({ day: daysInPrevMonth - i, currentMonth: false, events: [] });
        }

        const dateMap = {};
        calendarEvents.forEach(event => {
            if (event.expandedDates) {
                event.expandedDates.forEach(dateStr => {
                    if (!dateMap[dateStr]) dateMap[dateStr] = [];
                    dateMap[dateStr].push(event);
                });
            }
        });

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDayStr = `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayEvents = dateMap[currentDayStr] || [];
            days.push({
                day: i,
                currentMonth: true,
                hasEvent: dayEvents.length > 0,
                events: dayEvents
            });
        }

        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push({ day: i, currentMonth: false, hasEvent: false, events: [] });
        }
        return days;
  }, [calendarEvents, targetMonth, targetYear]);

  const eventList = useMemo(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const occurrencesList = [];
      calendarEvents.forEach(event => {
          if (!event.expandedDates) return;
          event.expandedDates.forEach(occStr => {
              const [y, m, d] = occStr.split('-').map(Number);
              const ed = new Date(y, m - 1, d);
              
              if (ed.getMonth() === targetMonth && ed.getFullYear() === targetYear && ed >= today) {
                  const schedule = event.schedules?.[0] || {};
                  occurrencesList.push({
                      ...event,
                      occurrenceDate: ed,
                      occurrenceId: `${event._id}-${occStr}`,
                      time: schedule.startTime ? `${schedule.startTime} ${schedule.endTime ? '- ' + schedule.endTime : ''}` : ''
                  });
              }
          });
      });

      return occurrencesList
        .sort((a, b) => a.occurrenceDate - b.occurrenceDate)
        .slice(0, 4)
        .map(event => {
            const ed = event.occurrenceDate;
            let tagClass = "outreach";
            const cat = event.category?.toLowerCase() || '';
            if (cat.includes("pro-life") || cat.includes("family")) tagClass = "prolife";
            else if (cat.includes("youth")) tagClass = "youth";
            else if (cat.includes("formation") || cat.includes("evangelization")) tagClass = "family";
            
            return {
                id: event.occurrenceId,
                month: monthName.substring(0, 3).toUpperCase(),
                day: ed.getDate().toString().padStart(2, '0'),
                tag: event.category ? event.category.toUpperCase() : "EVENT",
                tagClass,
                title: event.title,
                date: `${monthName} ${ed.getDate()}, ${ed.getFullYear()} ${event.time ? '• ' + event.time : ''}`,
                location: event.city ? `${event.city}, ${event.state}` : event.venue
            };
        });
  }, [calendarEvents, targetMonth, targetYear, monthName]);

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