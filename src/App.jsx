import React, { useState, useEffect } from 'react';
import CreateNote from './components/CreateNote';
import SelectedNote from './components/SelectedNote';
import { Color } from './Color';
import color1 from './images/color1.png';

const App = () => {
  
  const [popuptoggle, setpopuptoggle] = useState(false)
  const [groupdata, setgroupdata] = useState(JSON.parse(localStorage.getItem("groupdata")) || [])
  const [groupname, setgroupname] = useState("")
  const [groupcolor, setgroupcolor] = useState(color1)
  const [groupnumber, setgroupnumber] = useState(null)
  const [noteorselected, setnoteorselected] = useState(true)

  let TOP_MIDDLE_TOGGLE = "top";
  function handlemiddle(){
    if(TOP_MIDDLE_TOGGLE == "create") TOP_MIDDLE_TOGGLE = "top"
    else TOP_MIDDLE_TOGGLE = "middle"
  }
  function handletop(){
    if(TOP_MIDDLE_TOGGLE == "middle") setpopuptoggle(true)
    else if(TOP_MIDDLE_TOGGLE == "top") setpopuptoggle(false)
    TOP_MIDDLE_TOGGLE = "top"
  }
  function setgroup(){
    if(groupname){
      setgroupdata([...groupdata, {groupname : groupname, groupcolor : groupcolor, notesarr : []}])
    }
    else{
      setgroupdata([...groupdata, {groupname : "New Note", groupcolor : groupcolor, notesarr : []}])
    }
    setgroupname("")
    setgroupcolor(color1)
    TOP_MIDDLE_TOGGLE = "create"
  }
  useEffect(()=>{
    localStorage.setItem("groupdata", JSON.stringify(groupdata))
  }, [groupdata])

  return (
    <>
      <main className='flex justify-between '>
        <CreateNote setpopuptoggle={setpopuptoggle} popuptoggle={popuptoggle} groupdata = {groupdata}
        setgroupnumber = {setgroupnumber} groupnumber={groupnumber} noteorselected = {noteorselected}
        setnoteorselected = {setnoteorselected} />
        <SelectedNote groupdata = {groupdata} groupnumber = {groupnumber} setgroupdata = {setgroupdata}
        noteorselected={noteorselected} setnoteorselected={setnoteorselected} /> 

        {/* -----------------*/}

        <div className='flex absolute justify-center items-center top-0 left-0 right-0 z-50 h-[calc(100%-1rem)]' style={popuptoggle ? {}:{display:"none"}} onClick={handletop}>
          <div className='flex relative justify-items-center px-10 flex-col text-xl font-medium bg-white h-56 w-5/12 border rounded-lg' onClick={handlemiddle}>
            <h1 className='text-xl font-medium mb-2 mt-4'>Create New Notes group</h1>

            <div className='flex my-2 ml-2 items-center'>
              <h1>Group Name</h1>
              <input className='ml-6 px-4 py-1 font-normal border border-gray-400 rounded-2xl text-xl outline-none' type="text" placeholder='Enter your group name...' value={groupname} onChange={(e)=>setgroupname(e.target.value)} />
            </div>

            <div className='flex ml-2 mt-2 items-center'>
              <h1>Choose colour</h1>
              {
                Color.map(color => {
                  return(
                    <img src={color.img} className='w-8 ml-4 cursor-pointer' onClick={()=>setgroupcolor(color.img)}/>
                  )
                })
              }
            </div>

            <button className='absolute right-8 bottom-4 border px-6 py-0.5 bg-black text-white rounded-xl font-light' onClick={setgroup} >Create</button>

          </div>
        </div>
      </main>
    </>
  )
}

export default App