'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Import the FullCalendar component dynamically
const CalendarComponent = dynamic(() => import('@fullcalendar/react'), {
    ssr: false, // Disable server-side rendering
})

import dayGridPlugin from '@fullcalendar/daygrid' // Import plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import { Box } from '@mui/material'
import interactionPlugin from '@fullcalendar/interaction'
import { useRouter } from 'next/navigation'

const Calendar = (props: any) => {
    const [calendarLoaded, setCalendarLoaded] = useState(false)
    const [fullCalendarInstance, setFullCalendarInstance] = useState<any>(null)
    const [events, setEvents] = useState([
        // Monday
        {
            title: '7A - Math',
            start: '2024-12-02T08:00:00',
            end: '2024-12-02T09:00:00',
        },
        {
            title: '8A - Chemistry',
            start: '2024-12-02T09:30:00',
            end: '2024-12-02T10:30:00',
        },
        {
            title: '9A - Physics',
            start: '2024-12-02T11:00:00',
            end: '2024-12-02T12:00:00',
        },

        // Tuesday
        {
            title: '7B - Math',
            start: '2024-12-04T08:00:00',
            end: '2024-12-04T09:00:00',
        },
        {
            title: '8B - Chemistry',
            start: '2024-12-04T09:30:00',
            end: '2024-12-04T10:30:00',
        },
        {
            title: '9B - Physics',
            start: '2024-12-04T11:00:00',
            end: '2024-12-04T12:00:00',
        },

        // Wednesday
        {
            title: '7C - Math',
            start: '2024-12-05T08:00:00',
            end: '2024-12-05T09:00:00',
        },
        {
            title: '8C - Chemistry',
            start: '2024-12-05T09:30:00',
            end: '2024-12-05T10:30:00',
        },
        {
            title: '9C - Physics',
            start: '2024-12-05T11:00:00',
            end: '2024-12-05T12:00:00',
        },

        // Thursday
        {
            title: '7D - Math',
            start: '2024-12-06T08:00:00',
            end: '2024-12-06T09:00:00',
        },
        {
            title: '8D - Chemistry',
            start: '2024-12-06T09:30:00',
            end: '2024-12-06T10:30:00',
        },
        {
            title: '9D - Physics',
            start: '2024-12-06T11:00:00',
            end: '2024-12-06T12:00:00',
        },

        {
            title: '7D - Math',
            start: '2024-12-03T08:00:00',
            end: '2024-12-03T09:00:00',
        },
        {
            title: '8D - Chemistry',
            start: '2024-12-03T09:30:00',
            end: '2024-12-03T10:30:00',
        },
        {
            title: '9D - Physics',
            start: '2024-12-03T11:00:00',
            end: '2024-12-03T12:00:00',
        },
    ])

    const [roles, setRoles] = useState<string>('')

    useEffect(() => {
        const storedRoles = sessionStorage.getItem('role')
        if (storedRoles) {
            setRoles(storedRoles)
        }
    }, [])

    useEffect(() => {
        setCalendarLoaded(true)

        return () => {
            if (fullCalendarInstance) {
                fullCalendarInstance.destroy()
            }
        }
    }, [fullCalendarInstance])

    const router = useRouter()

    const handleAddEvent = (titlse: string, daste: string) => {
        // const title = 'title'
        // const start = '2024-12-02T14:00:00'
        // const end = '2024-12-02T16:00:00'

        // setEvents((prevEvents) => [...prevEvents, { title, start, end }])

        router.push('/calendar/calendar-form')
    }

    const handleRemoveEvent = (eventTitle: string) => {
        setEvents((prevEvents) =>
            prevEvents.filter((event) => event.title !== eventTitle)
        )
    }

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
        )
    }

    if (!calendarLoaded) {
        return <div>Loading ...</div>
    }

    const handleCalendarMounted = (calendar: any) => {
        setFullCalendarInstance(calendar)
    }

    const handleDateClick = (info: any) => {
        console.log('Date clicked:', info.dateStr)
    }

    const headerToolbar =
        roles === 'staff' || roles === 'admin'
            ? {
                start: 'addEventButton', // Show 'Add Event' button for staff/admin
                center: 'title', // Calendar title
                end: 'prev,next today', // Default navigation buttons
            }
            : {
                start: '', // No custom button for other roles
                center: 'title',
                end: 'prev,next today',
            }

    return (
        <Box sx={{ padding: 2, width: '87vw' }}>
            <div className="h-[95vh]   rounded-3xl bg-white p-5 text-[#0C4177] shadow-md">
                <CalendarComponent
                    {...props}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Pass plugins here
                    headerToolbar={headerToolbar}
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
    )
}

export default Calendar
