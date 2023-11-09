import React from 'react'
import { useEffect, useState } from "react"
import backgroundimg from '../images/backgroundimg.png'

const SelectedNote = ({groupdata, groupnumber, setgroupdata, noteorselected, setnoteorselected}) => {

    const montharr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const[text, settext] = useState("")
    function setnote(){
        
        let hour = new Date().getHours();
        let minute = new Date().getMinutes()
        let ampm = hour >= 12 ? "Pm" : "Am";
        hour = hour % 12
        hour = hour ? hour : 12;
        minute = minute < 10 ? "0" + minute : minute
        let temptime = hour + ":" + minute + " " + ampm
        
        let date = new Date().getDate()
        let month = new Date().getMonth()
        let yyyy = new Date().getFullYear();
        let tempdate = date + " " + montharr[month] + " " + yyyy
        
        groupdata[groupnumber].notesarr.push({time : temptime, datemonth : tempdate, data : text})
        setgroupdata([...groupdata])

        settext("")
    }
    useEffect(()=> {
        localStorage.setItem("groupdata", JSON.stringify(groupdata))
    }, [groupdata[groupnumber]?.notesarr])
    
    return groupnumber != null ? (
        <div className="flex flex-col bg-[#F7ECDC] min-h-screen w-2/3 absolute right-0" style={noteorselected ? {display:"none"}:{display:"flex"}}>
           <div className="h-20 bg-gray-300 flex pl-4 py-4">
            <img src={<i class="ri-arrow-left-line"></i>} alt="" onClick={()=>setnoteorselected(true)}/>
                <div className="group flex items-center">
                    <div className="groupicon mr-6">
                        <img className='w-16' src={groupdata[groupnumber]?.groupcolor} alt="" />
                        <h3 className='absolute -mt-[48px] ml-[14px] font-semibold text-3xl'>{groupdata[groupnumber]?.groupname.slice(0, 2).toUpperCase()}</h3>
                    </div>
                    <div className="groupname font-semibold text-xl">{groupdata[groupnumber]?.groupname}</div>
                </div>
           </div>
           <div className="p-10">
            {
                groupdata[groupnumber].notesarr.map(note => {
                    return(
                        <div className="py-4 flex w-full">
                            <div className="w-3/12">
                                <p style={{margin: '0px'}}>{note?.time}</p>
                                <p style={{margin: '0px'}}>{note?.datemonth}</p>
                            </div>
                            <div className="ml-10">
                                {note?.data}
                            </div>
                        </div>
                    )
                })
            }
           </div>
           <div className="absolute bottom-0 w-full outline-none border rounded-lg p-4 bg-gray-300">
            <img src={<i class="ri-send-plane-2-fill"></i>} alt="" onClick={setnote} style={{cursor:"pointer"}}
            />
            <textarea className='w-full h-32 p-4 text-xl rounded-xl' placeholder="Enter your text here..........."
            onChange={
                (e)=>{
                    if(e.target.value.charCodeAt(0) != 10) settext(e.target.value)
                }
            
            } value={text}
            onKeyDown={(e) =>{
                    if(e.key === "Enter"){
                        setnote()
                    } 
                }
            }
            />
           </div>
        </div>
    )
    :
    (
        <div className="background-cont bg-[#F7ECDC] w-full min-h-screen flex flex-col justify-center items-center">
            <img src={backgroundimg} alt="" />
            <h2 className='text-5xl my-4 font-medium'>Pocket Notes</h2>
            <p className='text-lg font-light'>Send and receive messages without keeping your phone online. <br />
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <div className='absolute bottom-0 mb-4'>
                <i class="ri-lock-2-fill"></i>
                <span className='ml-2'>end-to-end encrypted</span>
            </div>
        </div>
    )
    
}

export default SelectedNote