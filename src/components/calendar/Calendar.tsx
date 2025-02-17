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
import { getEvent } from '@/app/api/event'
import { calenderDataProps } from './types/types'

const Calendar = (props: any) => {
    const [calendarLoaded, setCalendarLoaded] = useState(false)
    const [fullCalendarInstance, setFullCalendarInstance] = useState<any>(null)
    const [events, setEvents] = useState<calenderDataProps[]>([])

    console.log(events, 'eventseventseventsevents')
    const [roles, setRoles] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            getEvent()
                .then((result) => {
                    const formatedData = result.data['event'].map(
                        (item: {
                            EventScheduleID: any
                            event_name: any
                            schedule_date_start: any
                            schedule_date_end: any
                        }) => ({
                            id: item.EventScheduleID,
                            title: item.event_name,
                            start: item.schedule_date_start,
                            end: item.schedule_date_end,
                        })
                    )
                    console.log(result.data['event'])

                    setEvents(formatedData)
                })
                .catch((error) => {
                    console.error('API request error', error)
                })
        }
        fetchData()
    }, [])

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

        router.push('/calendar/calendar-form?action=create')
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
        roles.includes('staff') || roles.includes('admin')
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
                    displayEventTime={true}
                    eventContent={(arg) => {
                        const startTime = arg.event.start
                            ? new Date(arg.event.start).toLocaleTimeString(
                                'id-ID',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit',

                                    hour12: true, // Use 24-hour format
                                }
                            )
                            : ''

                        const endTime = arg.event.end
                            ? new Date(arg.event.end).toLocaleTimeString(
                                'id-ID',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit',

                                    hour12: true, // Use 24-hour format
                                }
                            )
                            : ''

                        return (
                            <div className='text-[#0c4177] p-2 rounded-md ml-2 text-xs'>
                                {startTime} - {endTime} <br/> {arg.event.title}
                            </div>
                        )
                    }}
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
