import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Typography } from '@mui/material'
import * as oops from '../../assets/oops.png'

const RouteError = () => {
    const [time, setTime] = useState(5)
    const nav = useNavigate()

    useEffect(() => {
        if(time < 5 && time > 0){
            setTimeout(() => {
                setTime(prev => prev -1)
            }, 1000);
        }
        if(time == 0){
            setTimeout(() => {
                nav('/home')
            }, 1000);
        }
    }, [time])

    useEffect(() => {
        setTimeout(() => {
            setTime(prev => prev -1)
        }, 1000);
    }, [])


  return (
   <Stack sx={{width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
        <img 
            style={{
                position: 'absolute',
                width: '40vw',
                top: '10%', 
                filter: 'drop-shadow(0px 0px 2px whitesmoke)',
                opacity: '0.45'
                }} src={'../../assets/oops.png'}/>
        <Typography sx={{fontSize: 25, zIndex: 2, filter: 'drop-shadow(0px 0px 2px black)'}}>Whoops! This route doesn't exist...</Typography>
        <Typography sx={{fontSize: 18, zIndex: 2, filter: 'drop-shadow(0px 0px 2px black)'}}>Redirecting in {time} seconds</Typography>
   </Stack>
  )
}

export default RouteError
