'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Import the FullCalendar component dynamically
const CalendarComponent = dynamic(() => import('@fullcalendar/react'), {
    ssr: false, // Disable server-side rendering
});

import dayGridPlugin from '@fullcalendar/daygrid'; // Import plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = (props: any) => {
    const [calendarLoaded, setCalendarLoaded] = useState(false);
    const [fullCalendarInstance, setFullCalendarInstance] = useState<any>(null);
    const [events, setEvents] = useState([
        {
            title: 'Event 1',
            start: '2024-11-23T10:00:00', 
            end: '2024-11-23T12:00:00',
        },
        {
            title: 'Event 2',
            start: '2024-12-02T14:00:00',
            end: '2024-12-02T16:00:00',
        },
    ]);

    useEffect(() => {
        setCalendarLoaded(true);

        return () => {
            if (fullCalendarInstance) {
                fullCalendarInstance.destroy();
            }
        };
    }, [fullCalendarInstance]);

    const handleAddEvent = (titlse: string, daste: string) => {
        const title = 'title'
        const start= '2024-12-02T14:00:00'
        const end= '2024-12-02T16:00:00'

        setEvents((prevEvents) => [...prevEvents, { title,start, end }]);
    };

    const handleRemoveEvent = (eventTitle: string) => {
        setEvents((prevEvents) =>
            prevEvents.filter((event) => event.title !== eventTitle)
        );
    };

    const handleUpdateEvent = (
        oldTitle: string,
        newTitle: string,
        newDate: string
    ) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.title === oldTitle
                    ? { ...event, title: newTitle, date: newDate }
                    : event
            )
        );
    };

    if (!calendarLoaded) {
        return <div>Loading ...</div>;
    }

    const handleCalendarMounted = (calendar: any) => {
        setFullCalendarInstance(calendar);
    };

    const handleDateClick = (info: any) => {
        console.log('Date clicked:', info.dateStr);
    };

    return (
        <Box sx={{ padding: 2, width: '87vw' }}>
            <div className='h-[95vh]   rounded-3xl bg-white p-5 text-[#0c427770] shadow-md'>


                <CalendarComponent
                    {...props}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Pass plugins here
                    headerToolbar={{
                        start: 'addEventButton', // Default buttons
                        center: 'title', // Calendar title
                        end: 'prev,next today', // Custom button
                    }}
                    editable={true}
                    customButtons={{
                        addEventButton: {
                            text: 'Add Event',
                            click: handleAddEvent,
                        },
                    }}
                    
                    eventTimeFormat={{
                        hour: 'numeric',
                        minute: '2-digit',
                        meridiem: 'short', // Ensures "am/pm" is displayed fully
                    }}
                    dayMaxEvents={3}
                    events={events} // Pass the events to FullCalendar
                    ref={handleCalendarMounted}
                    dateClick={handleDateClick} 
                    selectable={true}
                />

            </div>
        </Box>

    );
};

export default Calendar;
