import React, { useEffect, useState } from 'react'
import { Button, Input, Stack } from '@mui/material'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import { supabase } from '../../helpers/supabase';
import {Paper} from '@mui/material';

const TicketList = () => {

    const [tickets, setTickets] = useState([])
    const [columns, setColumns] = useState(['EDIT'])
    const [editRow, setEditRow] = useState(null)
    const [editVals, setEditVals] = useState([])

    const updateValue = (newVal, i) => {
        setEditVals(prev => {
            const next = [...prev];
            next[i] = newVal;
            return next;
        });
    };

    const dateVal = (str) => {
        const [month, day, year] = str.split("/");

        const mm = month.padStart(2, "0");
        const dd = day.padStart(2, "0");

        return `${year}-${mm}-${dd}`;
    }

        const timeVal = (str = "") => {
        const clean = str.trim().toUpperCase();
        if (!clean) return "";

        // Match things like "1:23 AM", "01:23AM", "9:05 pm"
        const match = clean.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!match) {
            console.warn("Bad time string:", str);
            return "";
        }

        let [, h, m, modifier] = match;
        let hours = parseInt(h, 10);

        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        const hh = String(hours).padStart(2, "0");
        return `${hh}:${m}`;
        };

    const getTickets = async () => {

        let { data, error } = await supabase
            .from('tickets')
            .select('*')
          
            if(data) {
                setTickets(data)
                setColumns(Object.keys(data[0]))
            }
    }

    useEffect(() => {
        getTickets()
    }, [])

    useEffect(() => {
        if(editRow !== null && tickets?.length > 0){
            const vals = Object.values(tickets[editRow])
            setEditVals(vals)
        }
    }, [editRow, tickets])

    const saveChanges = async () => {
        // Build object: { columnName: value }
        const updateObj = {};

        columns.forEach((col, idx) => {
            updateObj[col] = editVals[idx];
        });

        // Extract ID safely
        const idIndex = columns.indexOf("id");
        const ticketId = editVals[idIndex];

        // Remove fields you never want to update
        delete updateObj.id;

        console.log("PAYLOAD:", updateObj);
        console.log("ID:", ticketId);

        const { data, error } = await supabase
            .from("tickets")
            .update(updateObj)
            .eq("id", ticketId)
            .select();

        if (error) console.error(error);
        else {
            console.log("Updated:", data)
            setEditRow(null),
            setEditVals([])
            getTickets()
        }

    };


  return (
    <Stack>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>EDIT</TableCell>
                        {columns?.map((c, i) => <TableCell align="center" key={i}>{c.toUpperCase()}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody key={tickets?.length}>
                    {tickets?.map((t, i) => {
                        return (
                        <TableRow key={i}>
                            <TableCell align='center'>
                                <Button onClick={() => setEditRow(i)} variant='outlined'>Edit</Button>
                            </TableCell>
                            {columns?.map((c, idx) => (
                                <TableCell align='center' key={idx}>{t[c]}</TableCell>
                                ))}
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
        {editRow !== null && tickets?.length > 0 && editVals?.length > 0 && <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Action</TableCell>
                        {columns?.map((c, i) => <TableCell align="center" key={i}>{c.toUpperCase()}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell onClick={() => saveChanges()} align='center'><Button variant='outlined' >SAVE</Button></TableCell>
                        {columns?.map((c, i) => {
                            let val = editVals?.[i]
                            let type

                            if(c === 'date'){
                                type = 'date'
                                val = dateVal(val)
                            } else if(c=== 'time'){
                                type = 'time'
                                val = timeVal(val)
                            } else if (typeof val === 'string'){
                                type = 'text'
                            }

                            // console.log(val)
                            
                            const disabled = ['id', 'date', 'time', 'ticket_num']
                            
                           return( <TableCell align="center" key={i}>
                                <Input disabled={disabled.includes(c)} inputProps={{ style: { textAlign: "center", width: 'min-content' } }} type={type} value={val || ''} onChange={(e) => updateValue(e.target.value, i)}/>
                            </TableCell>)
                    })}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>}
    </Stack>
  )
}

export default TicketList
