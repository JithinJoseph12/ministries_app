"use client";

import { AlignCenter, AlignLeft, AlignRight, Bold, CalendarClock, CalendarDays, Check, ChevronDown, FileText, ImagePlus, Italic, Lightbulb, List, ListOrdered, MapPin, Plus, Redo2, Underline, Undo2 } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/src/components/providers/AuthProvider";

function EventFormContent() {
  const [eventData, setEventData] = useState({
    title: "",
    category: "",
    hostMinistry: "",
    ministryId: "",
    sponsor: "",
    shortDescription: "",
    description: "",
    schedules: [
      {
        id: Math.random().toString(36).substr(2, 9),
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        allDay: false,
        timezone: "America/New_York",
        recurrence: {
          enabled: false,
          frequency: "none",
          interval: 1,
          weekdays: [],
          monthlyType: "dayOfMonth",
          dayOfMonth: null,
          weekNumber: null,
          weekday: null,
          yearlyMonth: null,
          yearlyDay: null,
          endCondition: "never",
          until: null,
          count: null
        }
      }
    ],
    venue: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    mapUrl: "",
    registrationLink: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    status: "Published",
    visibility: "Public",
    featured: false,
    allowRegistration: true,
    registrationUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledDate = searchParams.get('date');
  const editId = searchParams.get('editId');
  const isEditing = !!editId;
  const [isLoading, setIsLoading] = useState(isEditing);
  const { user } = useAuth();
  const [ministries, setMinistries] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchMinistries = async () => {
        try {
          const res = await fetch('/api/ministries?limit=100');
          const data = await res.json();
          if (data.success) {
            setMinistries(data.ministries);
            
            // If admin, auto-select their assigned ministry
            if (user.role === 'admin' && data.ministries.length > 0) {
              const myMinistry = data.ministries[0];
              setEventData(prev => ({
                ...prev,
                ministryId: myMinistry._id,
                hostMinistry: myMinistry.name
              }));
            }
          }
        } catch (err) {
          console.error("Error fetching ministries:", err);
        }
      };
      fetchMinistries();
    }
  }, [user]);

  useEffect(() => {
    if (prefilledDate && !isEditing) {
      setEventData(prev => {
        const newSchedules = [...prev.schedules];
        newSchedules[0] = { ...newSchedules[0], startDate: prefilledDate };
        return { ...prev, schedules: newSchedules };
      });
    }
  }, [prefilledDate, isEditing]);

  useEffect(() => {
    if (isEditing && editId) {
      const fetchEvent = async () => {
        try {
          const res = await fetch(`/api/events/${editId}`);
          const data = await res.json();
          if (data.success) {
            const e = data.event;
            setEventData({
              title: e.title || "",
              category: e.category || "",
              hostMinistry: e.hostMinistry || "",
              ministryId: e.ministryId || "",
              sponsor: e.sponsor || "",
              shortDescription: e.shortDescription || "",
              description: e.description || "",
              schedules: (e.schedules || []).length > 0 ? e.schedules.map(s => ({
                  ...s,
                  recurrence: {
                      enabled: false,
                      frequency: "none",
                      interval: 1,
                      weekdays: [],
                      monthlyType: "dayOfMonth",
                      dayOfMonth: null,
                      weekNumber: null,
                      weekday: null,
                      yearlyMonth: null,
                      yearlyDay: null,
                      endCondition: "never",
                      until: null,
                      count: null,
                      ...s.recurrence
                  }
              })) : [
                {
                  id: Math.random().toString(36).substr(2, 9),
                  startDate: "",
                  endDate: "",
                  startTime: "",
                  endTime: "",
                  allDay: false,
                  timezone: "America/New_York",
                  recurrence: {
                      enabled: false,
                      frequency: "none",
                      interval: 1,
                      weekdays: [],
                      monthlyType: "dayOfMonth",
                      dayOfMonth: null,
                      weekNumber: null,
                      weekday: null,
                      yearlyMonth: null,
                      yearlyDay: null,
                      endCondition: "never",
                      until: null,
                      count: null
                  }
                }
              ],
              venue: e.venue || "",
              address: e.address || "",
              city: e.city || "",
              state: e.state || "",
              zip: e.zip || "",
              mapUrl: e.mapUrl || "",
              registrationLink: e.registrationLink || "",
              contactPerson: e.contactPerson || "",
              contactEmail: e.contactEmail || "",
              contactPhone: e.contactPhone || "",
              status: e.status || "Published",
              visibility: e.visibility || "Public",
              featured: e.featured || false,
              allowRegistration: e.allowRegistration !== undefined ? e.allowRegistration : true,
              registrationUrl: e.registrationUrl || "",
            });
            if (e.description) {
              setCharCount(e.description.length);
            }
          }
        } catch (err) {
          console.error("Error fetching event:", err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEvent();
    }
  }, [isEditing, editId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    setEventData(prev => {
      const updatedSchedules = [...prev.schedules];
      updatedSchedules[index] = { ...updatedSchedules[index], [field]: value };
      return { ...prev, schedules: updatedSchedules };
    });
  };

  const handleRecurrenceChange = (index, field, value) => {
    setEventData(prev => {
      const updatedSchedules = [...prev.schedules];
      const currentRecurrence = updatedSchedules[index].recurrence || {};
      updatedSchedules[index] = {
          ...updatedSchedules[index],
          recurrence: { ...currentRecurrence, [field]: value }
      };
      return { ...prev, schedules: updatedSchedules };
    });
  };

  const handleRecurrenceWeekdayToggle = (index, day) => {
      setEventData(prev => {
          const updatedSchedules = [...prev.schedules];
          const currentRecurrence = updatedSchedules[index].recurrence || {};
          const currentWeekdays = currentRecurrence.weekdays || [];
          
          let newWeekdays;
          if (currentWeekdays.includes(day)) {
              newWeekdays = currentWeekdays.filter(d => d !== day);
          } else {
              newWeekdays = [...currentWeekdays, day];
          }
          
          updatedSchedules[index] = {
              ...updatedSchedules[index],
              recurrence: { ...currentRecurrence, weekdays: newWeekdays }
          };
          return { ...prev, schedules: updatedSchedules };
      });
  };

  const generateRecurrenceSummary = (schedule) => {
      const r = schedule.recurrence;
      if (!r || !r.enabled || r.frequency === 'none') return '';
      
      let summary = 'Repeats ';
      
      if (r.frequency === 'daily') {
          if (r.interval === 1) summary += 'daily.';
          else summary += `every ${r.interval} days.`;
      } else if (r.frequency === 'weekly') {
          if (r.interval === 1) summary += 'every week ';
          else summary += `every ${r.interval} weeks `;
          
          if (r.weekdays && r.weekdays.length > 0) {
              summary += `on ${r.weekdays.join(', ')}.`;
          } else {
              summary += '.';
          }
      } else if (r.frequency === 'monthly') {
          if (r.interval === 1) summary += 'every month ';
          else summary += `every ${r.interval} months `;
          
          if (r.monthlyType === 'dayOfMonth' && r.dayOfMonth) {
              summary += `on the ${r.dayOfMonth}.`;
          } else if (r.monthlyType === 'weekdayPattern' && r.weekNumber && r.weekday) {
              summary += `on the ${r.weekNumber} ${r.weekday}.`;
          } else {
              summary += '.';
          }
      } else if (r.frequency === 'yearly') {
          if (r.interval === 1) summary += 'every year ';
          else summary += `every ${r.interval} years `;
          
          if (r.yearlyMonth && r.yearlyDay) {
              summary += `on ${r.yearlyMonth} ${r.yearlyDay}.`;
          } else {
              summary += '.';
          }
      }
      
      if (r.endCondition === 'onDate' && r.until) {
          summary = summary.replace(/\.$/, '') + ` until ${r.until}.`;
      } else if (r.endCondition === 'afterCount' && r.count) {
          summary = summary.replace(/\.$/, '') + `, ${r.count} times.`;
      }
      
      return summary;
  };

  const addSchedule = () => {
    setEventData(prev => ({
      ...prev,
      schedules: [
        ...prev.schedules,
        {
          id: Math.random().toString(36).substr(2, 9),
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          allDay: false,
          timezone: "America/New_York",
          recurrence: {
              enabled: false,
              frequency: "none",
              interval: 1,
              weekdays: [],
              monthlyType: "dayOfMonth",
              dayOfMonth: null,
              weekNumber: null,
              weekday: null,
              yearlyMonth: null,
              yearlyDay: null,
              endCondition: "never",
              until: null,
              count: null
          }
        }
      ]
    }));
  };

  const removeSchedule = (index) => {
    setEventData(prev => {
      const updatedSchedules = prev.schedules.filter((_, i) => i !== index);
      return { ...prev, schedules: updatedSchedules };
    });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setEventData((prev) => ({ ...prev, description: value }));
    setCharCount(value.length);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImageFile(file);
  };

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    
    // Validate schedules
    if (!eventData.schedules || eventData.schedules.length === 0) {
      alert("Please add at least one schedule.");
      return;
    }
    for (let i = 0; i < eventData.schedules.length; i++) {
      const s = eventData.schedules[i];
      if (!s.startDate) {
        alert(`Start Date is required for Occurrence ${i + 1}.`);
        return;
      }
      if (!s.allDay) {
        if (!s.startTime) {
          alert(`Start Time is required for Occurrence ${i + 1} (unless All Day is checked).`);
          return;
        }
        if (!s.endTime) {
          alert(`End Time is required for Occurrence ${i + 1} (unless All Day is checked).`);
          return;
        }
        if (s.startTime && s.endTime && (!s.endDate || s.startDate === s.endDate)) {
            if (s.endTime <= s.startTime) {
                alert(`End Time must be after Start Time for Occurrence ${i + 1}.`);
                return;
            }
        }
      }
      if (s.endDate && s.endDate < s.startDate) {
        alert(`End Date cannot be before Start Date in Occurrence ${i + 1}.`);
        return;
      }
      if (s.recurrence && s.recurrence.enabled) {
          const r = s.recurrence;
          if (r.frequency === 'daily' && (!r.interval || r.interval < 1)) {
              alert(`Interval is required for daily recurrence in Occurrence ${i + 1}.`);
              return;
          }
          if (r.frequency === 'weekly' && (!r.weekdays || r.weekdays.length === 0)) {
              alert(`At least one weekday must be selected for weekly recurrence in Occurrence ${i + 1}.`);
              return;
          }
          if (r.frequency === 'monthly') {
              if (r.monthlyType === 'dayOfMonth' && (!r.dayOfMonth || r.dayOfMonth < 1 || r.dayOfMonth > 31)) {
                  alert(`Valid day of month (1-31) is required for monthly recurrence in Occurrence ${i + 1}.`);
                  return;
              }
              if (r.monthlyType === 'weekdayPattern' && (!r.weekNumber || !r.weekday)) {
                  alert(`Week number and weekday are required for monthly recurrence pattern in Occurrence ${i + 1}.`);
                  return;
              }
          }
          if (r.frequency === 'yearly' && (!r.yearlyMonth || !r.yearlyDay)) {
              alert(`Month and day are required for yearly recurrence in Occurrence ${i + 1}.`);
              return;
          }
          if (r.endCondition === 'onDate' && !r.until) {
              alert(`End date is required when "On Date" end condition is selected in Occurrence ${i + 1}.`);
              return;
          }
          if (r.endCondition === 'onDate' && r.until < s.startDate) {
              alert(`End date cannot be before start date in Occurrence ${i + 1}.`);
              return;
          }
          if (r.endCondition === 'afterCount' && (!r.count || r.count < 1)) {
              alert(`Valid occurrence count is required in Occurrence ${i + 1}.`);
              return;
          }
      }
    }

    if (action === "publish") {
      try {
        setIsSubmitting(true);
        const url = isEditing ? `/api/events/${editId}` : "/api/events";
        const method = isEditing ? "PATCH" : "POST";
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });

        const data = await response.json();

        if (response.ok) {
          setShowSuccessPopup(true);
          setTimeout(() => {
            setShowSuccessPopup(false);
            router.push("/dashboard/events");
          }, 1500);
          // Optionally reset form:
          // setEventData({ ...initialState });
        } else {
          alert(`Error: ${data.message || (isEditing ? "Failed to update event" : "Failed to publish event")}`);
        }
      } catch (error) {
        console.error("Submit error:", error);
        alert(`An error occurred while ${isEditing ? "updating" : "publishing"} the event.`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log(`Action: ${action}`, eventData, imageFile);
      alert(`Event saved as draft successfully!`);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Animated Success Popup */}
      <div
        className={`fixed top-6 right-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-500 z-50 ${showSuccessPopup ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
      >
        <div className="bg-emerald-100 p-1.5 rounded-full">
          <Check className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h4 className="font-semibold text-emerald-900">{isEditing ? "Successfully Updated" : "Successfully Added"}</h4>
          <p className="text-sm text-emerald-700">The event has been {isEditing ? "updated" : "published"}.</p>
        </div>
      </div>

      <main className="flex-1">
        <div className="p-8 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-1">Events / {isEditing ? "Edit Event" : "Add New Event"}</div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#1e3a8a" }}>{isEditing ? "Edit Event" : "Add New Event"}</h1>
            <p className="text-gray-500 mt-1">{isEditing ? "Update the details below to edit the event." : "Fill in the details below to create a new event."}</p>
          </div>

          <form onSubmit={(e) => handleSubmit(e, "publish")}>
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-8 space-y-8">
                {/* 1. Event Information */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#EEF4FF",
                        border: "1px solid #DCE6F8",
                      }}
                    >
                      <CalendarDays
                        size={18}
                        strokeWidth={2}
                        style={{ color: "#3B5FBF" }}
                      />
                    </div>

                    <h2
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1e3a8a",
                      }}
                    >
                      1. Event Information
                    </h2>
                  </div>                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Event Title <span className="text-red-500">*</span></label>
                      <input
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Enter event title"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                        <select
                          name="category"
                          value={eventData.category}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        >
                          <option value="">Select category</option>
                          <option>Youth/Young Adult</option>
                          <option>Family</option>
                          <option>Pro-Life</option>
                          <option>Worship Service</option>
                          <option>Spiritual</option>
                          <option>Bible Study</option>
                          <option>Youth Event</option>
                          <option>Community Outreach</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          {user?.role === 'superadmin' ? 'Ministry' : 'Host Ministry'} <span className="text-red-500">*</span>
                        </label>
{user?.role === "superadmin" ? (
  <select
    name="ministryId"
    value={eventData.ministryId}
    onChange={(e) => {
      const selectedId = e.target.value;
      const selectedName =
        ministries.find((m) => m._id === selectedId)?.name || "";

      setEventData((prev) => ({
        ...prev,
        ministryId: selectedId,
        hostMinistry: selectedName,
      }));
    }}
    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
  >
    <option value="">Select ministry</option>
    {ministries.map((m) => (
      <option key={m._id} value={m._id}>
        {m.name}
      </option>
    ))}
  </select>
) : (
  <input
    type="text"
    value={eventData.hostMinistry}
    readOnly
    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-100 text-gray-600 cursor-not-allowed"
  />
)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Sponsor</label>
                      <input
                        name="sponsor"
                        value={eventData.sponsor}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Event Sponsor "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Short Description <span className="text-red-500">*</span></label>
                      <input
                        name="shortDescription"
                        value={eventData.shortDescription}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Brief summary of the event"
                        maxLength={150}
                        required
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-semibold text-gray-700">Full Description</label>
                        <span className="text-xs text-gray-400">{charCount}/60 minimum</span>
                      </div>
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{
                          border: "1px solid #e8edf5",
                          background: "#fff",
                        }}
                      >
                        {/* Toolbar */}

                        <div
                          className="flex items-center gap-4 px-4 h-11 border-b"
                          style={{ borderColor: "#e8edf5" }}
                        >
                          <button
                            type="button"
                            className="flex items-center gap-1 text-sm"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: "#243B63",
                            }}
                          >
                            Paragraph
                            <ChevronDown size={14} />
                          </button>

                          <Bold size={15} />

                          <Italic size={15} />

                          <Underline size={15} />

                          <List size={15} />

                          <ListOrdered size={15} />

                          <AlignLeft size={15} />

                          <AlignCenter size={15} />

                          <AlignRight size={15} />

                          <Undo2
                            size={15}
                            className="ml-auto text-gray-400"
                          />

                          <Redo2
                            size={15}
                            className="text-gray-400"
                          />
                        </div>

                        {/* Textarea */}

                        <textarea
                          name="description"
                          value={eventData.description}
                          onChange={handleDescriptionChange}
                          placeholder="Provide full details about the event, including what attendees can expect..."
                          className="w-full resize-none outline-none p-4"
                          style={{
                            height: "180px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "15px",
                            color: "#243B63",
                          }}
                        />

                        {/* Bottom counter */}

                        <div
                          className="flex justify-end px-4 py-2 text-xs"
                          style={{
                            color: "#9AAAC0",
                            borderTop: "1px solid #f5f7fb",
                          }}
                        >
                          {eventData.description.length}/2000
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Date & Time */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#EEF4FF",
                        border: "1px solid #DCE6F8",
                      }}
                    >
                      <CalendarClock
                        size={18}
                        strokeWidth={2}
                        style={{ color: "#3B5FBF" }}
                      />
                    </div>

                    <h2
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1e3a8a",
                      }}
                    >
                      2. Date & Time
                    </h2>
                  </div>                  <div className="space-y-6">
                    {eventData.schedules.map((schedule, index) => {
                      const r = schedule.recurrence || { enabled: false, frequency: 'none' };
                      return (
                      <div key={schedule.id || index} className="p-5 rounded-xl border border-gray-100 bg-gray-50/50 relative">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                          <h3 className="font-semibold text-gray-700 text-sm">Schedule {index + 1}</h3>
                          {eventData.schedules.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSchedule(index)}
                              className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="mb-6 border-b border-gray-200 pb-6">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule Type</label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                              <input 
                                type="radio" 
                                checked={!r.enabled} 
                                onChange={() => {
                                    handleRecurrenceChange(index, 'enabled', false);
                                    handleRecurrenceChange(index, 'frequency', 'none');
                                }}
                                className="text-blue-600 focus:ring-blue-500"
                              />
                              One Time
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                              <input 
                                type="radio" 
                                checked={r.enabled} 
                                onChange={() => {
                                    handleRecurrenceChange(index, 'enabled', true);
                                    if (r.frequency === 'none') {
                                        handleRecurrenceChange(index, 'frequency', 'daily');
                                    }
                                }}
                                className="text-blue-600 focus:ring-blue-500"
                              />
                              Recurring
                            </label>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{r.enabled ? "First Occurrence" : "Start Date"} <span className="text-red-500">*</span></label>
                            <input
                              type="date"
                              value={schedule.startDate}
                              onChange={(e) => handleScheduleChange(index, 'startDate', e.target.value)}
                              disabled={!!prefilledDate && index === 0}
                              className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none ${prefilledDate && index === 0 ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'focus:ring-2 focus:ring-blue-500 bg-white'}`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Start Time {!schedule.allDay && <span className="text-red-500">*</span>}</label>
                            <input
                              type="time"
                              value={schedule.startTime}
                              onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">{r.enabled ? "Duration Ends" : "End Date"}</label>
                            <input
                              type="date"
                              value={schedule.endDate}
                              onChange={(e) => handleScheduleChange(index, 'endDate', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">End Time {!schedule.allDay && <span className="text-red-500">*</span>}</label>
                            <input
                              type="time"
                              value={schedule.endTime}
                              onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            />
                          </div>
                        </div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={schedule.allDay}
                            onChange={(e) => handleScheduleChange(index, 'allDay', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          All Day Event
                        </label>

                        {/* Recurrence Section */}
                        {r.enabled && (
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-700 mb-4">Recurrence</h4>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                                    <select 
                                        value={r.frequency || 'daily'}
                                        onChange={(e) => handleRecurrenceChange(index, 'frequency', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none bg-white"
                                    >
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                    </select>
                                </div>
                                
                                {r.frequency !== 'yearly' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Every</label>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="number" 
                                                min="1"
                                                value={r.interval || 1}
                                                onChange={(e) => handleRecurrenceChange(index, 'interval', parseInt(e.target.value) || 1)}
                                                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none bg-white"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {r.frequency === 'daily' ? 'day(s)' : r.frequency === 'weekly' ? 'week(s)' : 'month(s)'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {r.frequency === 'weekly' && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Occurs On</label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                            <label key={day} className="flex items-center gap-1.5 text-sm text-gray-700">
                                                <input 
                                                    type="checkbox"
                                                    checked={(r.weekdays || []).includes(day)}
                                                    onChange={() => handleRecurrenceWeekdayToggle(index, day)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                {day}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {r.frequency === 'monthly' && (
                                <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
                                    <div className="flex flex-col gap-4">
                                        <label className="flex items-start gap-3">
                                            <input 
                                                type="radio" 
                                                name={`monthlyType-${index}`}
                                                checked={r.monthlyType === 'dayOfMonth' || !r.monthlyType}
                                                onChange={() => handleRecurrenceChange(index, 'monthlyType', 'dayOfMonth')}
                                                className="mt-1 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div>
                                                <span className="block text-sm font-medium text-gray-700 mb-2">Day of Month</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">Day</span>
                                                    <input 
                                                        type="number" 
                                                        min="1" max="31"
                                                        value={r.dayOfMonth || ''}
                                                        onChange={(e) => handleRecurrenceChange(index, 'dayOfMonth', parseInt(e.target.value))}
                                                        disabled={r.monthlyType === 'weekdayPattern'}
                                                        className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none bg-white disabled:bg-gray-100"
                                                    />
                                                </div>
                                            </div>
                                        </label>
                                        
                                        <label className="flex items-start gap-3">
                                            <input 
                                                type="radio" 
                                                name={`monthlyType-${index}`}
                                                checked={r.monthlyType === 'weekdayPattern'}
                                                onChange={() => handleRecurrenceChange(index, 'monthlyType', 'weekdayPattern')}
                                                className="mt-1 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div>
                                                <span className="block text-sm font-medium text-gray-700 mb-2">Weekday Pattern</span>
                                                <div className="flex items-center gap-2">
                                                    <select 
                                                        value={r.weekNumber || ''}
                                                        onChange={(e) => handleRecurrenceChange(index, 'weekNumber', e.target.value)}
                                                        disabled={r.monthlyType !== 'weekdayPattern'}
                                                        className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm outline-none bg-white disabled:bg-gray-100"
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="First">First</option>
                                                        <option value="Second">Second</option>
                                                        <option value="Third">Third</option>
                                                        <option value="Fourth">Fourth</option>
                                                        <option value="Last">Last</option>
                                                    </select>
                                                    <select 
                                                        value={r.weekday || ''}
                                                        onChange={(e) => handleRecurrenceChange(index, 'weekday', e.target.value)}
                                                        disabled={r.monthlyType !== 'weekdayPattern'}
                                                        className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm outline-none bg-white disabled:bg-gray-100"
                                                    >
                                                        <option value="">Select...</option>
                                                        <option value="Sunday">Sunday</option>
                                                        <option value="Monday">Monday</option>
                                                        <option value="Tuesday">Tuesday</option>
                                                        <option value="Wednesday">Wednesday</option>
                                                        <option value="Thursday">Thursday</option>
                                                        <option value="Friday">Friday</option>
                                                        <option value="Saturday">Saturday</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {r.frequency === 'yearly' && (
                                <div className="mb-4 flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700">Every</span>
                                        <input 
                                            type="number" 
                                            min="1"
                                            value={r.interval || 1}
                                            onChange={(e) => handleRecurrenceChange(index, 'interval', parseInt(e.target.value) || 1)}
                                            className="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm outline-none bg-white"
                                        />
                                        <span className="text-sm text-gray-600">year(s) on</span>
                                    </div>
                                    <select 
                                        value={r.yearlyMonth || ''}
                                        onChange={(e) => handleRecurrenceChange(index, 'yearlyMonth', e.target.value)}
                                        className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm outline-none bg-white"
                                    >
                                        <option value="">Month</option>
                                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                    <input 
                                        type="number" 
                                        min="1" max="31"
                                        placeholder="Day"
                                        value={r.yearlyDay || ''}
                                        onChange={(e) => handleRecurrenceChange(index, 'yearlyDay', parseInt(e.target.value))}
                                        className="w-20 border border-gray-300 rounded-lg px-2 py-1.5 text-sm outline-none bg-white"
                                    />
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ends</label>
                                <div className="flex flex-col gap-3">
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input 
                                            type="radio" 
                                            name={`endCondition-${index}`}
                                            checked={r.endCondition === 'never' || !r.endCondition}
                                            onChange={() => handleRecurrenceChange(index, 'endCondition', 'never')}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        Never
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name={`endCondition-${index}`}
                                                checked={r.endCondition === 'onDate'}
                                                onChange={() => handleRecurrenceChange(index, 'endCondition', 'onDate')}
                                                className="text-blue-600 focus:ring-blue-500"
                                            />
                                            On Date
                                        </label>
                                        <input 
                                            type="date" 
                                            value={r.until || ''}
                                            onChange={(e) => handleRecurrenceChange(index, 'until', e.target.value)}
                                            disabled={r.endCondition !== 'onDate'}
                                            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none bg-white disabled:bg-gray-100"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name={`endCondition-${index}`}
                                                checked={r.endCondition === 'afterCount'}
                                                onChange={() => handleRecurrenceChange(index, 'endCondition', 'afterCount')}
                                                className="text-blue-600 focus:ring-blue-500"
                                            />
                                            After Number of Occurrences
                                        </label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            placeholder="10"
                                            value={r.count || ''}
                                            onChange={(e) => handleRecurrenceChange(index, 'count', parseInt(e.target.value))}
                                            disabled={r.endCondition !== 'afterCount'}
                                            className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm outline-none bg-white disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 italic">
                                {generateRecurrenceSummary(schedule)}
                            </div>
                          </div>
                        )}
                      </div>
                    )})}
                    
                    <button
                      type="button"
                      onClick={addSchedule}
                      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={18} />
                      Add Another Schedule
                    </button>
                  </div>
                </div>

                {/* 3. Location */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#EEF4FF",
                        border: "1px solid #DCE6F8",
                      }}
                    >
                      <MapPin
                        size={18}
                        strokeWidth={2}
                        style={{ color: "#3B5FBF" }}
                      />
                    </div>

                    <h2
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1e3a8a",
                      }}
                    >
                      3. Location
                    </h2>
                  </div>                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Venue / Location Name</label>
                      <input
                        name="venue"
                        value={eventData.venue}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter venue or location name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                      <input
                        name="address"
                        value={eventData.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Street address"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                        <input
                          name="city"
                          value={eventData.city}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                        <select
                          name="state"
                          value={eventData.state}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        >
                          <option value="">Select state</option>
                          <option>CA</option>
                          <option>NY</option>
                          <option>TX</option>
                          <option>FL</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">ZIP Code</label>
                        <input
                          name="zip"
                          value={eventData.zip}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Enter ZIP code"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Google Maps Link (optional)</label>
                      <input
                        name="mapUrl"
                        value={eventData.mapUrl}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://maps.google.com/..."
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Additional Details */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#EEF4FF",
                        border: "1px solid #DCE6F8",
                      }}
                    >
                      <FileText
                        size={18}
                        strokeWidth={2}
                        style={{ color: "#3B5FBF" }}
                      />
                    </div>

                    <h2
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1e3a8a",
                      }}
                    >
                      4. Additional Details
                    </h2>
                  </div>                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Event Link (optional)</label>
                      <input
                        name="registrationLink"
                        value={eventData.registrationLink}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://yourwebsite.com/event"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Person (optional)</label>
                      <input
                        name="contactPerson"
                        value={eventData.contactPerson}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Email (optional)</label>
                      <input
                        name="contactEmail"
                        type="email"
                        value={eventData.contactEmail}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Phone (optional)</label>
                      <input
                        name="contactPhone"
                        value={eventData.contactPhone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Event Image */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#EEF4FF",
                        border: "1px solid #DCE6F8",
                      }}
                    >
                      <ImagePlus
                        size={18}
                        strokeWidth={2}
                        style={{ color: "#3B5FBF" }}
                      />
                    </div>

                    <h2
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1e3a8a",
                      }}
                    >
                      5. Event Image
                    </h2>
                  </div>                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition cursor-pointer bg-gray-50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label htmlFor="imageUpload" className="cursor-pointer block">
                        <div className="text-3xl mb-2">⬆️</div>
                        <div className="text-gray-600 font-medium">Click to upload an image</div>
                        <div className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP (Max. 5MB)</div>
                        {imageFile && <p className="text-sm text-green-600 mt-2">{imageFile.name}</p>}
                      </label>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Recommended size: 1200x630px</p>
                      <p>• This image will appear in event cards</p>
                      <p>• Choose a high-quality, relevant image</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-2 pb-8">
                  <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, "draft")}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition shadow-sm disabled:bg-blue-400"
                  >
                    {isSubmitting ? (isEditing ? "Updating..." : "Publishing...") : (isEditing ? "Update Event" : "Publish Event")}
                  </button>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                {/* Publish Settings */}
                <div className="bg-white rounded-2xl border border-[#e8edf5] p-6 shadow-sm  top-6">

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "#EAF8EE" }}
                    >
                      <CalendarDays
                        size={18}
                        strokeWidth={2}
                        style={{ color: "#4CAF72" }}
                      />
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#1e3a8a",
                      }}
                    >
                      Publish Settings
                    </h3>
                  </div>

                  <div className="space-y-6">

                    {/* Status */}
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 700,
                          fontSize: "15px",
                          color: "#243B63",
                        }}
                      >
                        Status
                      </label>

                      <select
                        name="status"
                        value={eventData.status}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[#e8edf5] px-3 py-2 bg-white outline-none"
                      >
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Scheduled</option>
                      </select>

                      <p className="mt-2 text-xs text-[#8A97AE]">
                        Published events are visible to everyone.
                      </p>
                    </div>

                    {/* Visibility */}

                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 700,
                          fontSize: "15px",
                          color: "#243B63",
                        }}
                      >
                        Visibility
                      </label>

                      <select
                        name="visibility"
                        value={eventData.visibility}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-[#e8edf5] px-3 py-2 bg-white outline-none"
                      >
                        <option>Public</option>
                        <option>Private</option>
                        <option>Members Only</option>
                      </select>

                      <p className="mt-2 text-xs text-[#8A97AE]">
                        Public events are shown on the website.
                      </p>
                    </div>

                    {/* Featured */}

                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            color: "#243B63",
                            fontSize: "15px",
                          }}
                        >
                          Featured Event
                        </p>

                        <p className="text-xs text-[#8A97AE] mt-1">
                          Show this event in the featured section.
                        </p>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={eventData.featured}
                          onChange={handleChange}
                          className="sr-only peer"
                        />

                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#34C759] after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                      </label>
                    </div>

                    {/* Registration */}

                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            color: "#243B63",
                            fontSize: "15px",
                          }}
                        >
                          Allow Registration
                        </p>

                        <p className="text-xs text-[#8A97AE] mt-1">
                          Allow users to register for this event.
                        </p>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="allowRegistration"
                          checked={eventData.allowRegistration}
                          onChange={handleChange}
                          className="sr-only peer"
                        />

                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#34C759] after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
                      </label>
                    </div>

                    {/* Registration Link */}

                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 700,
                          fontSize: "15px",
                          color: "#243B63",
                        }}
                      >
                        Registration Link (optional)
                      </label>

                      <input
                        name="registrationUrl"
                        value={eventData.registrationUrl}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full rounded-lg border border-[#e8edf5] px-3 py-2 outline-none"
                      />

                      <p className="mt-2 text-xs text-[#8A97AE]">
                        Link to registration page or form.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-white rounded-2xl border border-[#e8edf5] p-6 shadow-sm">
                  {/* Heading */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FFF8E8]">
                      <Lightbulb
                        size={18}
                        strokeWidth={2}
                        style={{ color: "#D4A017" }}
                      />
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#1e3a8a",
                      }}
                    >
                      Tips
                    </h3>
                  </div>

                  {/* Tips */}
                  <ul className="space-y-4">
                    {[
                      "Use a clear and descriptive title",
                      "Add a short description for listing",
                      "Include all important details",
                      "Choose an engaging image",
                      "Review before publishing",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check
                          size={16}
                          strokeWidth={3}
                          style={{ color: "#4CAF72", flexShrink: 0 }}
                        />

                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "15px",
                            fontWeight: 500,
                            color: "#243B63",
                            lineHeight: "1.6",
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Need Help */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-semibold text-[22px] mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1e3a8a" }}>🎧 Need Help?</h3>
                  <p className="text-sm text-gray-500 mb-4">If you need assistance adding your event, our team is here to help.</p>
                  <button type="button" className=" border border-gray-300 rounded-lg px-4 py-2 text-blue-700 font-medium hover:bg-gray-50 transition text-left">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default function AddEventPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <EventFormContent />
    </Suspense>
  );
}