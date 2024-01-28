import React from 'react'

function DefaultLayout({children}) {
  return (
    <div>
        <h1>Ethio Bus Ticket Booking System</h1>
        {children}
    </div>
  )
}

export default DefaultLayout