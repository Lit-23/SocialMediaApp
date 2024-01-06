import { Box, Stack } from '@mui/material'
import React from 'react'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Rightbar from '../components/Rightbar'
import AddPost from '../components/AddPost'

const MainPage = () => {
  return (
    <>
      <Box>
        <Stack direction='row' spacing={2}>
          <Sidebar/>
          <Feed/>
          <Rightbar/>
        </Stack>
        <AddPost/>
      </Box>
    </>
  )
}

export default MainPage