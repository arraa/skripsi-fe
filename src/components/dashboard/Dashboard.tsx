'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Box } from '@mui/material'
import interactionPlugin from '@fullcalendar/interaction'
import DashboardTeacher from './DashboardTeacher'

// Import the FullCalendar component dynamically
const CalendarComponent = dynamic(() => import('@fullcalendar/react'), {
    ssr: false, // Disable server-side rendering
})

const Dashboard = (props: any) => {
    const [roles, setRoles] = useState<string | null>(null)

    useEffect(() => {
        const storedRoles = sessionStorage.getItem('role')
        setRoles(storedRoles)
    }, [])

    const calendarRef = useRef<any>(null)
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
    ])

    console.log('events', roles)

    const handleDateClick = (info: any) => {
        console.log('Date clicked:', info.dateStr)
    }

    return (
        <>
            {roles === 'staff' || roles === 'admin' ? (
                <Box sx={{ padding: 2, width: '87vw' }}>
                    <div className="h-[95vh]   rounded-3xl bg-white p-5 text-[#0c427770] shadow-md">
                        <CalendarComponent
                            {...props}
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                            ]}
                            headerToolbar={{
                                end: 'prev,next today',
                            }}
                            eventTimeFormat={{
                                hour: 'numeric',
                                minute: '2-digit',
                                meridiem: 'short',
                            }}
                            dayMaxEvents={3}
                            events={events}
                            ref={calendarRef}
                            dateClick={handleDateClick}
                            selectable={true}
                            unselectAuto={false}
                        />
                    </div>
                </Box>
            ) : (
                <DashboardTeacher />
            )}
        </>
    )
}

export default Dashboard
