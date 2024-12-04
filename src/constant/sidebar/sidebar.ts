export const SIDEBAR = [
    {
        name: 'Home',
        link: '/',
        img: '/icon/icon-silabus.svg',
    },
    {
        name: 'Personal Data',
        link: '/personal-data',
        img: '/icon/icon-data.svg',
        subMenu: [
            {
                name: 'Student',
                link: '/personal-data/student',
            },
            {
                name: 'Teacher',
                link: '/personal-data/teacher',
            },
            {
                name: 'Staff',
                link: '/personal-data/staff',
            },
        ],
    },
    {
        name: 'Silabus',
        link: '/silabus',
        img: '/icon/icon-silabus.svg',
    },
    {
        name: 'Attendance',
        link: '/attendance',
        img: '/icon/icon-data.svg',
        subMenu: [
            {
                name: 'Today',
                link: '/attendance/today',
            },
            {
                name: 'Summary',
                link: '/attendance/summary',
            },
        ],
    },
    {
        name: 'Generator',
        link: '/generator',
        img: '/icon/icon-data.svg',
        subMenu: [
            {
                name: 'Class',
                link: '/generator/class',
            },
            {
                name: 'Schedule',
                link: '/generator/schedule',
            },
        ],
    },
    {
        name: 'Scoring',
        link: '/scoring',
        img: '/icon/icon-scoring.svg',
    },
    {
        name: 'Calender',
        link: '/calender',
        img: '/icon/icon-calendar.svg',
    },
];
