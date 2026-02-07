import { React, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RatelimitedUI from '../components/RatelimitedUI'
import axios from "axios"
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard'
import NoNotesFound from '../components/NoNotesFound'
import api from '../lib/axios'

const HomePage = () => {
  const [isRatelimited, setRatelimited] = useState(true)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async ()=>{
      try {
        const res = await api.get("/notes")
        setNotes(res.data)
        setRatelimited(false)//if we able to get the data, we're not ratelimited
        console.log(res.data)
      } catch (error) {
        console.log("Error fetching notes ", error)
        if(error.response.status === 429) setRatelimited(true)
        else toast.error("Failed to load notes");
      }finally{
        setLoading(false);
      }
    }
    fetchNotes()
  },[])

  return (
  <div className='min-h-screen'> 

    <Navbar/>
    {isRatelimited && <RatelimitedUI/>}

    <div className='max-w-7xl mx-auto p-4 mt-6'>

      {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

      {notes.length==0 && !isRatelimited && <NoNotesFound/>}

      {notes.length>0 && !isRatelimited &&(
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map((note)=>(
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      )}

    </div>

  </div>
  )
}

export default HomePage
