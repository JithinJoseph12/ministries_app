"use client";

import { useState, useEffect } from 'react';

export function useEvents() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events');
                const data = await res.json();
                if (data.success) {
                    const mappedEvents = data.events.map(e => {
                        let dateStr = '';
                        if (e.startDate) {
                            const startD = new Date(e.startDate);
                            const startStr = startD.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            dateStr = startStr;

                            if (e.endDate && e.endDate !== e.startDate) {
                                const endD = new Date(e.endDate);
                                const endStr = endD.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                                dateStr = `${startStr} – ${endStr}`;
                            } else {
                                dateStr = `${startStr}, ${startD.getFullYear()}`;
                            }
                        }

                        return {
                            id: e._id,
                            title: e.title,
                            ministry: e.hostMinistry || 'Unassigned',
                            date: dateStr,
                            startDate: e.startDate,
                            endDate: e.endDate,
                            time: e.startTime ? `${e.startTime} ${e.endTime ? '- ' + e.endTime : ''}` : '',
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

    // Helper to generate calendar grid data
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

        for (let i = 1; i <= daysInMonth; i++) {
            const dayEvents = filteredEvents.filter(event => {
                if (!event.startDate) return false;
                const eventDate = new Date(event.startDate);
                return (
                    eventDate.getDate() === i &&
                    eventDate.getMonth() === month &&
                    eventDate.getFullYear() === year
                );
            });
            
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
