import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import {ImageList, ImageListItem} from '@mui/material'

const Home = () => {

  const nav = useNavigate()

  const cards = [
    {
      name: 'count',
      value: 30,
      title: 'Ticket Count'
  }, {
      name: 'revenue',
      value: '$5000',
      title: 'Ticket Revenue'
  }, {
      name: 'missing_info',
      value: 10,
      title: 'Pending'
  }]

  const GlassCard = ({itm}) => {

    console.log(itm)

    return (
      <Stack 
        sx={{
          width: 225,
          height: 500,
          backgroundColor: '#55555564',
          borderRadius: 5,
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <Typography>{itm.title}</Typography>
        <Typography sx={{fontSize: 40}}>{itm.value}</Typography>
      </Stack>
    )
  }

  return (
    <Stack sx={{width: '100%', height: '100vh', justifyContent: 'flex-start', alignItems: 'center'}}>
      <Stack sx={{position: 'absolute', width: '100%', height: '90vh', justifyContent: 'center', alignItems: 'center'}}>
        <img style={{opacity: 0.4, mixBlendMode: 'multiply'}} width={'auto'} height={'85%'} src={'../../assets/DRHS_Logo.png'} />
      </Stack>

      <ImageList cols={3} rowHeight={164} sx={{width: '98%', height: '33%', justifyContent: 'center', alignItems:'center'}}>
        {cards?.map((c) => <ImageListItem sx={{alignItems: 'center'}}><GlassCard itm={c}/></ImageListItem>)}
      </ImageList>

    </Stack>
  )
}

export default Home
