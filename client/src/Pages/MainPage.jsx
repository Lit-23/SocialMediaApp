import { Box } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Rightbar from '../components/Rightbar'

const MainPage = () => {
  return (
    <>
      <Box display='flex' gap={2}>
        <Sidebar/>
        <Feed/>
        <Rightbar/>
      </Box>
    </>
  )
}

export default MainPage