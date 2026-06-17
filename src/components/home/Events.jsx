// components/sections/Events.jsx

export default function Events() {
  const eventList = [
    {
      id: 1,
      month: "MAY",
      day: "10",
      tag: "PRO-LIFE",
      tagClass: "prolife",
      title: "40 Days For Life Prayer Vigil",
      date: "May 10, 2026 • 9:00 AM",
      location: "Philadelphia, PA"
    },
    {
      id: 2,
      month: "MAY",
      day: "12",
      tag: "YOUTH",
      tagClass: "youth",
      title: "High School Mission Night",
      date: "May 12, 2026 • 7:00 PM",
      location: "Norristown, PA"
    },
    {
      id: 3,
      month: "MAY",
      day: "16",
      tag: "FAMILY",
      tagClass: "family",
      title: "Family Rosary Evening",
      date: "May 16, 2026 • 6:30 PM",
      location: "Ambler, PA"
    },
    {
      id: 4,
      month: "MAY",
      day: "18",
      tag: "FORMATION",
      tagClass: "outreach",
      title: "Catholic Scripture Study",
      date: "May 18, 2026 • 7:00 PM",
      location: "Online"
    }
  ];

  const tagStyles = {
    prolife: "bg-[#fff2dc] text-[#cb7c00]",
    youth: "bg-[#e5f7ea] text-[#009245]",
    family: "bg-[#efe5ff] text-[#7b3fda]",
    outreach: "bg-[#e7efff] text-[#1956d7]"
  };

  // Calendar data for May 2026
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  
  // May 2026 starts on Friday (5/1/2026 is a Friday)
  // Let's build the calendar dates
  const getCalendarDates = () => {
    const dates = [];
    const firstDayOfMonth = new Date(2026, 4, 1); // May is month 4 (0-indexed)
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 5 = Friday
    
    // Previous month days to fill start
    const daysInPrevMonth = new Date(2026, 4, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      dates.push({ day: daysInPrevMonth - i, currentMonth: false, events: [] });
    }
    
    // Current month days
    const daysInMonth = new Date(2026, 5, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const events = [];
      // Add events based on specific dates
      if (i === 1) events.push({ name: "First Friday Adoration", type: "yellow" });
      if (i === 6) events.push({ name: "Family Rosary Evening", type: "purple" });
      if (i === 10) events.push({ name: "40 Days For Life Prayer Vigil", type: "yellow" });
      if (i === 12) events.push({ name: "High School Mission Night", type: "green" });
      if (i === 16) events.push({ name: "Marriage Enrichment Day", type: "purple" });
      if (i === 20) events.push({ name: "Catholic Scripture Study", type: "blue" });
      if (i === 22) events.push({ name: "College Bible Study", type: "green" });
      if (i === 27) events.push({ name: "Healing Mass", type: "purple" });
      
      dates.push({ day: i, currentMonth: true, events });
    }
    
    // Next month days to fill end (42 total - 6 rows of 7)
    const remaining = 42 - dates.length;
    for (let i = 1; i <= remaining; i++) {
      dates.push({ day: i, currentMonth: false, events: [] });
    }
    
    return dates;
  };

  const calendarDates = getCalendarDates();

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
              May 2026
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
              <div>May 2026</div>
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
                  className={`border border-[#edf1f7] p-[12px] text-[13px] min-h-[120px] align-top ${
                    !date.currentMonth ? "text-gray-400" : "text-[#11295c]"
                  }`}
                >
                  <span className="font-medium">{date.day}</span>
                  {date.events.map((event, eventIdx) => (
                    <div
                      key={eventIdx}
                      className={`${eventTypeStyles[event.type]} p-[6px_8px] rounded-[8px] text-[11px] mt-[10px] font-medium text-gray-800`}
                    >
                      {event.name}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}