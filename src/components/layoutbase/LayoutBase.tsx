"use client"
import React, { Children, useEffect } from 'react'
import WebsiteSkeleton from '../ui/websiteSkeleton/WebsiteSkeleton'

const DashboardLayoutClient = ({ children }: { children: React.ReactNode }) => {

    return (
    <>
     <WebsiteSkeleton>
        {children}
     </WebsiteSkeleton>
     </>
  )
}

export default DashboardLayoutClient
