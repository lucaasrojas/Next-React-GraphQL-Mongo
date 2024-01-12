"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import { usePathname } from 'next/navigation'
import Login from './login/page'
import Head from 'next/head'
import NuevaCuenta from './nuevacuenta/page'
import { ApolloProvider } from '@apollo/client'
import client from '../../config/apollo'
import Header from '@/components/Header/Header'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <title>CRM - Administracion de Clientes</title>
      <body className={inter.className}>

        <ApolloProvider client={client}>

          <div className="flex min-h-screen bg-gray-200">

            {
              pathname === "/login" ? (
                <div className='bg-gray-800 w-screen flex flex-col justify-center' >
                  <Login />
                </div>
              ) : pathname === "/nuevacuenta" ? (
                <div className='bg-gray-800 w-screen flex flex-col justify-center' >
                  <NuevaCuenta />
                </div>
              ) :
                (
                  <>
                    <Sidebar></Sidebar>
                    <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
                      <Header />
                      {children}

                    </main>
                  </>
                )
            }


          </div>
        </ApolloProvider>
      </body >
    </html >
  )
}
