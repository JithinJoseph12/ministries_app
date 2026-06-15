const fs = require('fs');
const file = 'src/app/(public)/events/page.js';
let content = fs.readFileSync(file, 'utf8');
let lines = content.split('\n');

// Find the start and end of the section
const startIdx = lines.findIndex(l => l.includes('{/* Main Content - Calendar and Events Side by Side */}'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('</section>'));

if (startIdx !== -1 && endIdx !== -1) {
  const newSection = `      {/* Main Content - Calendar and Events Side by Side */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Calendar Column - Left Side */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-[20px] border border-gray-100 p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              {/* Calendar Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#082B63] hover:bg-gray-50 transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-[#082B63] hover:bg-gray-50 transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                <h3 className="font-bold text-[22px] text-[#082B63]">
                  {monthNames[selectedMonth]} {selectedYear}
                </h3>
                
                <div className="flex gap-2 items-center">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Month <ChevronDown size={14} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    <CalendarDays size={16} />
                  </button>
                </div>
              </div>
              
              {/* Calendar Grid Headers */}
              <div className="grid grid-cols-7 mb-2">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
                  <div key={day} className="text-[11px] font-bold text-[#082B63] text-center pb-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                {calendarDays.map((day, idx) => {
                  const eventsForDay = day ? allEvents.filter(event => {
                    const eventDate = new Date(event.startDate);
                    return eventDate.getDate() === day.day && 
                           eventDate.getMonth() === selectedMonth && 
                           eventDate.getFullYear() === selectedYear;
                  }) : [];
                  
                  return (
                    <div
                      key={idx}
                      className={\`bg-white min-h-[110px] p-2 \${!day ? 'bg-gray-50/50' : ''}\`}
                    >
                      <div className={\`text-xs mb-1.5 \${day ? 'text-gray-500 font-medium' : 'text-gray-300'}\`}>
                        {day ? day.day : ""}
                      </div>
                      
                      <div className="space-y-1.5">
                        {eventsForDay.map((evt, i) => {
                          let colorClasses = "bg-[#FFF4D2] text-[#B88B00]"; // default Pro-Life
                          if(evt.category === "Youth") colorClasses = "bg-[#E6F4EA] text-[#1E8E3E]";
                          if(evt.category === "Family") colorClasses = "bg-[#F3E8FF] text-[#9333EA]";
                          if(evt.category === "Faith Formation") colorClasses = "bg-[#E8F0FE] text-[#1A73E8]";
                          if(evt.category === "Evangelization") colorClasses = "bg-[#FEF7E0] text-[#E37400]";
                          if(evt.category === "Outreach") colorClasses = "bg-[#E0F2F1] text-[#00897B]";
                          
                          return (
                            <div key={i} className={\`text-[10px] font-semibold leading-tight p-1.5 rounded-md truncate \${colorClasses}\`}>
                              {evt.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Category Legend */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 items-center justify-start px-2">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFF4D2] border border-[#FDE08B]"></span> Pro-Life
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E6F4EA] border border-[#A8DAB5]"></span> Youth
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F3E8FF] border border-[#D8B4FE]"></span> Family
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8F0FE] border border-[#AECBFA]"></span> Faith Formation
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEF7E0] border border-[#FDE293]"></span> Evangelization
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E0F2F1] border border-[#80CBC4]"></span> Outreach
                </div>
              </div>
            </div>
          </div>
          
          {/* Selected Events Column - Right Side */}
          <div className="lg:col-span-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-[22px] text-[#082B63]">Selected Events</h2>
              <Link href="/events/all" className="text-[#082B63] font-medium hover:underline text-sm flex items-center gap-1">
                View all events <ArrowRight size={14} />
              </Link>
            </div>
            
            {/* Events List */}
            <div className="space-y-0">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => {
                  const eventDate = new Date(event.startDate);
                  const monthName = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
                  const dayNum = eventDate.getDate();
                  
                  return (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEventId(event.id)}
                      className="py-5 border-b border-gray-100 flex items-start gap-4 cursor-pointer group"
                    >
                      {/* Date Box */}
                      <div className="text-center w-12 flex-shrink-0 pt-1">
                        <div className="text-[10px] font-bold text-[#082B63] uppercase tracking-widest">{monthName}</div>
                        <div className="text-[28px] font-bold text-[#082B63] leading-none mt-1">{dayNum}</div>
                      </div>
                      
                      {/* Event Details */}
                      <div className="flex-1">
                        <h4 className="font-bold text-[#082B63] text-[15px] leading-snug mb-2 group-hover:text-[#D6A646] transition-colors">{event.title}</h4>
                        
                        <div className="flex items-start gap-2 text-xs text-gray-500 mb-1.5">
                          <Clock size={13} className="mt-[2px] flex-shrink-0 text-gray-400" />
                          <span>{event.date} {event.time && \`• \${event.time}\`}</span>
                        </div>
                        
                        <div className="flex items-start gap-2 text-xs text-gray-500 mb-1.5">
                          <MapPin size={13} className="mt-[2px] flex-shrink-0 text-gray-400" />
                          <span>{event.location}</span>
                        </div>
                        
                        {event.address && (
                          <div className="flex items-start gap-2 text-xs text-gray-500">
                            <MapPin size={13} className="mt-[2px] flex-shrink-0 text-transparent" />
                            <span>{event.address}</span>
                          </div>
                        )}
                      </div>
                      
                      <button className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-[#082B63] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mt-1">
                        View Event
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="py-10 text-center">
                  <p className="text-gray-500 text-sm">No events found matching your criteria.</p>
                </div>
              )}
              
              {filteredEvents.length > 0 && (
                <div className="pt-6 text-center">
                  <Link href="/events/calendar" className="text-[#082B63] font-semibold hover:underline text-sm inline-flex items-center gap-1">
                    View Full Calendar <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>`;

  lines.splice(startIdx, endIdx - startIdx + 1, newSection);
  
  // also add ChevronDown to lucide-react imports if it's missing
  const importIdx = lines.findIndex(l => l.includes("from 'lucide-react'"));
  if (importIdx !== -1) {
    let i = importIdx;
    let found = false;
    while(i >= 0 && !lines[i].includes('import {')) {
      if (lines[i].includes('ChevronDown')) found = true;
      i--;
    }
    if (!found && i >= 0) {
      lines.splice(i + 1, 0, "  ChevronDown,");
    }
  }

  fs.writeFileSync(file, lines.join('\n'));
  console.log("Successfully patched page.js");
} else {
  console.log("Could not find section to patch. startIdx:", startIdx, "endIdx:", endIdx);
}
