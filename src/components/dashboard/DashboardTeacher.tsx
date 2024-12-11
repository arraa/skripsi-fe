'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Import the FullCalendar component dynamically
const CalendarComponent = dynamic(() => import('@fullcalendar/react'), {
    ssr: false, // Disable server-side rendering
})

import dayGridPlugin from '@fullcalendar/daygrid' // Import plugins
import timeGridPlugin from '@fullcalendar/timegrid'
import { Box, Typography } from '@mui/material'
import interactionPlugin from '@fullcalendar/interaction'
import Link from 'next/link'
import { Button } from '../common/button/button'

const DashboardTeacher = (props: any) => {
    const [roles, setRoles] = useState<string | null>(null)

    useEffect(() => {
        // This will run only on the client side
        const storedRoles = sessionStorage.getItem('role')
        setRoles(storedRoles)
    }, [])

    const [calendarLoaded, setCalendarLoaded] = useState(false)
    const [fullCalendarInstance, setFullCalendarInstance] = useState<any>(null)
    const [events, setEvents] = useState([
        {
            title: '7A - Math',
            start: '2024-06-01T08:00:00',
            end: '2024-06-01T09:00:00',
        },
        {
            title: '7A - Math',
            start: '2024-06-01T09:00:00',
            end: '2024-06-01T10:00:00',
        },
        {
            title: '8A - Chemistry',
            start: '2024-06-01T13:00:00',
            end: '2024-06-01T14:00:00',
        },
        {
            title: '8A - Chemistry',
            start: '2024-06-01T14:00:00',
            end: '2024-06-01T15:00:00',
        },
        {
            title: 'Rapat Kenaikan Kelas',
            start: '2024-06-01T15:00:00',
            end: '2024-06-01T16:00:00',
        },
    ])

    console.log('roles', roles)

    // Function to format time (e.g., "08:00")
    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // Function to format the date header (e.g., "Monday, 1 June 2024")
    const formatDateHeader = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    useEffect(() => {
        setCalendarLoaded(true)

        return () => {
            if (fullCalendarInstance) {
                fullCalendarInstance.destroy()
            }
        }
    }, [fullCalendarInstance])

    const handleAddEvent = (titlse: string, daste: string) => {
        const title = 'title'
        const start = '2024-12-02T14:00:00'
        const end = '2024-12-02T16:00:00'

        setEvents((prevEvents) => [...prevEvents, { title, start, end }])
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

    return (
        <Box sx={{ padding: 2, width: '87vw' }}>
            <div className="flex items-center justify-between">
                <div className="my-5 text-3xl font-bold text-[#0C4177]">
                    Hi, Teacher!
                </div>

                {roles === 'homeroom' && (
                    <Link
                        href="/attendance/today"
                        className="flex h-fit items-center justify-center rounded-md bg-[#0C4177] px-20 py-3 text-center font-bold  text-white"
                    >
                        CLASS ATTENDANCE
                    </Link>
                )}
            </div>
            <div className="flex flex-col justify-between gap-y-10">
                <div className="flex w-full flex-row gap-x-2">
                    <div className="flex h-[40vh] w-full justify-between  rounded-3xl bg-white p-5 px-10 text-[#0C4177] shadow-lg">
                        <div className="w-[49%]">
                            <CalendarComponent
                                {...props}
                                plugins={[
                                    dayGridPlugin,
                                    timeGridPlugin,
                                    interactionPlugin,
                                ]} // Pass plugins here
                                ref={handleCalendarMounted}
                                dateClick={handleDateClick}
                            />
                        </div>
                        <div className="w-[48%]">
                            <div className="mb-3 text-2xl font-bold text-[#0c4277]">
                                {formatDateHeader(events[0].start)}
                            </div>

                            {/* Render the list of events */}
                            {events.map((event, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '8px 0',
                                    }}
                                >
                                    <div className="font-bold text-[#0c4277] ">
                                        {formatTime(event.start)} -{' '}
                                        {formatTime(event.end)}
                                    </div>

                                    <div className="font-bold text-[#0c4277] ">
                                        {event.title}
                                    </div>
                                </Box>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between ">
                    <div className="flex h-[40vh]  w-[48%] flex-col justify-between  rounded-3xl bg-white p-5 px-14 text-[#0C4177] shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold ">
                                Learning Plan
                            </div>
                            <div className="text-xl">Pertemuan 1 - 7A</div>
                        </div>
                        <div>
                            <div className="text-xl font-bold ">
                                Tujuan Pembelajaran
                            </div>
                            <div>
                                B.1 Membaca, menuliskan dan membandingkan
                                bilangan rasional, bilangan bulat positif dan
                                bilangan bulat negative
                            </div>
                            <div>
                                B.2 Membaca, mengidentifikasi, menuliskan dan
                                membandingkan bilangan desimal,pecahan
                            </div>
                            <div>
                                B.3 Mengidentifikasikan jenis-jenis bilangan
                                dari himpunan bilangan yang diberikan
                            </div>
                        </div>
                        <div>
                            <div className="text-xl font-bold ">
                                Metode Pembelajaran
                            </div>
                            <div>
                                Penjelasan Materi, Soal Latihan, Mini Quiz
                            </div>
                        </div>
                    </div>

                    <div className="flex h-[40vh] w-[48%] flex-col rounded-3xl bg-white p-5 px-14 text-[#0c4277] shadow-lg">
                        <div className="text-2xl font-bold ">Scoring</div>
                        <div className="flex flex-col">
                            <div className="flex flex-row justify-around py-3">
                                <div>Class</div>
                                <div>Avarge</div>
                            </div>
                            <div className="flex flex-row justify-around border-y-2 py-3">
                                <div>7A</div>
                                <div>90</div>
                            </div>
                            <div className="flex flex-row justify-around py-3">
                                <div>7B</div>
                                <div>90</div>
                            </div>
                            <div className="flex flex-row justify-around border-t-2  py-3">
                                <div>7C</div>
                                <div>90</div>
                            </div>
                            <div className="mt-2 flex w-full items-end justify-end">
                                <Link
                                    href="/scoring/subject"
                                    className=" rounded-lg bg-[#0C4177] p-2 px-6 text-center text-white"
                                >
                                    See Detail
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default DashboardTeacher
