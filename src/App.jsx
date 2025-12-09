import React,  { useState, useEffect } from "react"
import { supabase } from "../helpers/supabase"
import { Stack } from "@mui/material"
import TicketList from "./comps/TicketList"

const App = () => {

  return (
    <Stack>
      <TicketList />
    </Stack>
  )
}

export default App
