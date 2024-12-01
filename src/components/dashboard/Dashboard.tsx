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

const FullCalendar = (props: any) => {
    const [calendarLoaded, setCalendarLoaded] = useState(false);
    const [fullCalendarInstance, setFullCalendarInstance] = useState<any>(null);
    const [events, setEvents] = useState([
        {
            title: 'Event 1',
            start: '2024-11-23T10:00:00', // Specify event start time
            end: '2024-11-23T12:00:00', // Specify event end time
        },
        {
            title: 'Event 2',
            start: '2024-12-02T14:00:00',
            end: '2024-12-02T16:00:00',
        },
    ]);

    useEffect(() => {
        setCalendarLoaded(true);

        // Cleanup the FullCalendar instance when the component unmounts
        return () => {
            if (fullCalendarInstance) {
                fullCalendarInstance.destroy();
            }
        };
    }, [fullCalendarInstance]);

    // Event handler function to manage events
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

    // Show loading until the calendar is fully loaded
    if (!calendarLoaded) {
        return <div>Loading ...</div>;
    }

    // Handling calendar mounting and updating the instance
    const handleCalendarMounted = (calendar: any) => {
        setFullCalendarInstance(calendar);
    };

    return (
        <Box sx={{ padding: 2, width: '87vw' }}>
            <div className='h-[95vh]   rounded-3xl bg-white p-5 text-[#0c427770] shadow-md'>
                {/* Render the FullCalendar component with the dynamic events */}
                <CalendarComponent
                    {...props}
                    plugins={[dayGridPlugin, timeGridPlugin]} // Pass plugins here
                    headerToolbar={{
                        start: 'addEventButton', // Default buttons
                        center: 'title', // Calendar title
                        end: 'prev,next today', // Custom button
                    }}
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
                />

                {/* Buttons for event management
                <div className='mt-4'>
                    <button onClick={() => handleAddEvent('New Event', '2024-12-25')}>
          Add Event
                    </button>
                    <button onClick={() => handleRemoveEvent('event 1')}>
          Remove Event
                    </button>
                    <button
                        onClick={() =>
                            handleUpdateEvent('event 2', 'Updated Event', '2024-12-10')
                        }
                    >
          Update Event
                    </button>
                </div> */}
            </div>
        </Box>

    );
};

export default FullCalendar;
