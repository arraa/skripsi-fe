'use client'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/common/Sidebar'
import { usePathname } from 'next/navigation'
import { AuthProvider } from './context/provider'

const monseMontserrat = Montserrat({ subsets: ['latin'] })

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    if (pathname.includes('/auth')) {
        return (
            <html lang="en">
                <body className={monseMontserrat.className}>
                    <div className="flex min-h-screen bg-[#FAFDFF]">
                        {children}
                    </div>
                </body>
            </html>
        )
    }

    return (
        <AuthProvider>
            <html lang="en">
                <body className={monseMontserrat.className}>
                    <div className="flex min-h-screen bg-[#FAFDFF]">
                        <Sidebar />
                        {children}
                    </div>
                </body>
            </html>
        </AuthProvider>
    )
}
