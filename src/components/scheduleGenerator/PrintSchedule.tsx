import React, { useEffect, useState } from 'react'

interface ScheduleProps {
    data: ScheduleRow[]
}

interface ScheduleRow {
    day: string // Example: "Senin"
    timeSlots: TimeSlot[]
}

interface TimeSlot {
    waktu: string // Example: "08:15 - 08:55"
    jamKe: number // Example: 1
	periods: {
		VII: string[];
		VIII: string[];
		IX: string[];
	  };
}


const PrintSchedule = ({ data }: ScheduleProps) => {
    const [printDate, setPrintDate] = useState('')
    const [printTime, setPrintTime] = useState('')

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

        const currentTime = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        })

        setPrintDate(currentDate)
        setPrintTime(currentTime)
    }, [])

    return (
        <div
            style={{
                width: '100%',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                color: '#000',
            }}
        >
            <style jsx>{`
                @page {
                    size: A4 landscape;
                    margin: 15mm;
                }

                @media print {
                    .data-table {
                        width: 100%;
                        border-collapse: collapse;
                    }

                    .data-table th,
                    .data-table td {
                        border: 1px solid #000;
                        text-align: center;
                        padding: 5px;
                        font-size: 10px;
                    }

                    .data-table th {
                        background-color: #f2f2f2;
                        font-size: 11px;
                    }

                    .data-table td:first-child {
                        font-weight: bold;
                    }
                }
            `}</style>

            <div>
                <h2 style={{ textAlign: 'center', fontSize: '18px' }}>
                    JADWAL PELAJARAN
                </h2>
                <p style={{ textAlign: 'right', marginBottom: '10px' }}>
                    Tanggal: {printDate} | Waktu: {printTime}
                </p>
            </div>

            <table className="data-table">
                <thead>
                    <tr>
                        <th rowSpan={2}>HARI</th>
                        <th rowSpan={2}>WAKTU</th>
                        <th rowSpan={2}>JAM KE</th>
                        <th colSpan={3}>VII</th>
                        <th colSpan={3}>VIII</th>
                        <th colSpan={3}>IX</th>
                    </tr>
                    <tr>
                        {['A', 'B', 'C'].map((className) => (
                            <th key={`VII-${className}`}>{className}</th>
                        ))}
                        {['A', 'B', 'C'].map((className) => (
                            <th key={`VIII-${className}`}>{className}</th>
                        ))}
                        {['A', 'B', 'C'].map((className) => (
                            <th key={`IX-${className}`}>{className}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            {row.timeSlots.map((timeSlot, slotIndex) => (
                                <tr key={`${rowIndex}-${slotIndex}`}>
                                    {slotIndex === 0 && (
                                        <td rowSpan={row.timeSlots.length}>
                                            {row.day}
                                        </td>
                                    )}
                                    <td>{timeSlot.waktu}</td>
                                    <td>{timeSlot.jamKe}</td>
                                    {[
                                        timeSlot.periods.VII,
                                        timeSlot.periods.VIII,
                                        timeSlot.periods.IX,
                                    ].flatMap((classPeriods, classIndex) =>
                                        classPeriods.map(
                                            (period: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined, periodIndex: any) => (
                                                <td
                                                    key={`${classIndex}-${periodIndex}`}
                                                >
                                                    {period}
                                                </td>
                                            )
                                        )
                                    )}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PrintSchedule
