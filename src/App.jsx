import React,  { useState, useEffect } from "react"
import { supabase } from "../helpers/supabase"
import { Stack, Button } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import TicketList from "./comps/TicketList"
import Home from './comps/Home'
import { useNavigate } from "react-router-dom"
import RouteError from "./comps/RouteError"

const App = () => {

    const nav = useNavigate()
  
    const buttons = [
      {id: 0, name: 'Home', path: '/home'},
      {id: 1, name: 'View / Edit Tickets', path: '/tickets'},
      {id: 2, name: 'Settings', path: '/settings'}
    ]

  return (
    <Stack>
      <Stack sx={{width: '100%', height: '10vh', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'whitesmoke', flexDirection: 'row'}}>
              {buttons?.map((b, i) => <Button onClick={() => nav(b.path)} key={i}>{b.name}</Button>)}
            </Stack>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/tickets' element={<TicketList />}/>
        <Route path='*' element={<RouteError />} />
      </Routes>
    </Stack>
  )
}

export default App
