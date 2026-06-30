"use client";

import { useState, useEffect, useMemo } from 'react';

export function useEvents() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events?status=Published&limit=100');
                const data = await res.json();
                if (data.success) {
                    const mappedEvents = data.events.map(e => {
                        let dateStr = 'No schedule';
                        let mainStartDate = null;
                        let mainEndDate = null;
                        let mainTime = '';
                        if (e.schedules && e.schedules.length > 0) {
                            const firstSchedule = e.schedules[0];
                            mainStartDate = firstSchedule.startDate;
                            mainEndDate = firstSchedule.endDate;
                            mainTime = firstSchedule.startTime ? `${firstSchedule.startTime} ${firstSchedule.endTime ? '- ' + firstSchedule.endTime : ''}` : '';

                            if (e.schedules.length > 1) {
                                dateStr = 'Multiple Occurrences';
                            } else if (e.recurrenceSummary) {
                                dateStr = e.recurrenceSummary;
                            } else {
                                const startD = new Date(firstSchedule.startDate);
                                startD.setMinutes(startD.getMinutes() + startD.getTimezoneOffset());
                                const startStr = startD.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                dateStr = startStr;

                                if (firstSchedule.endDate && firstSchedule.endDate !== firstSchedule.startDate) {
                                    const endD = new Date(firstSchedule.endDate);
                                    endD.setMinutes(endD.getMinutes() + endD.getTimezoneOffset());
                                    const endStr = endD.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                                    dateStr = `${startStr} – ${endStr}`;
                                } else {
                                    dateStr = `${startStr}, ${startD.getFullYear()}`;
                                }
                            }
                        }

                        return {
                            id: e._id,
                            title: e.title,
                            ministry: e.hostMinistry || 'Unassigned',
                            date: dateStr,
                            startDate: mainStartDate,
                            endDate: mainEndDate,
                            time: mainTime,
                            location: e.city && e.state ? `${e.city}, ${e.state}` : e.venue || 'TBD',
                            address: e.address || '',
                            category: e.category,
                            status: e.status || 'Published',
                            description: e.description || '',
                            featured: e.featured || false,
                            image: e.image || '',
                            fullData: e
                        };
                    });
                    setEvents(mappedEvents);
                } else {
                    setError('Failed to fetch events');
                }
            } catch (err) {
                console.error("Error fetching events:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Helper to generate calendar grid data from backend pre-expanded occurrences
    const getCalendarDays = (year, month, filteredEvents = events, fillStyle = 'nulls') => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        if (fillStyle === 'nulls') {
            for (let i = 0; i < firstDayOfMonth; i++) {
                days.push(null);
            }
        } else if (fillStyle === 'dates') {
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            for (let i = firstDayOfMonth - 1; i >= 0; i--) {
                days.push({ day: daysInPrevMonth - i, currentMonth: false, events: [] });
            }
        }

        // Using O(1) Lookup: bucket events by date string
        const dateMap = {};
        filteredEvents.forEach(event => {
            if (event.fullData && event.fullData.expandedDates) {
                event.fullData.expandedDates.forEach(dateStr => {
                    if (!dateMap[dateStr]) dateMap[dateStr] = [];
                    dateMap[dateStr].push(event);
                });
            }
        });

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            
            const dayEvents = dateMap[currentDayStr] || [];
            
            days.push({
                day: i,
                currentMonth: true,
                hasEvent: dayEvents.length > 0,
                events: dayEvents
            });
        }

        if (fillStyle === 'dates') {
            const remaining = 42 - days.length;
            for (let i = 1; i <= remaining; i++) {
                days.push({
                    day: i,
                    currentMonth: false,
                    hasEvent: false,
                    events: []
                });
            }
        }

        return days;
    };

    return { events, isLoading, error, getCalendarDays };
}
