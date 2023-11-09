import React from 'react'

const CreateNote = ({setpopuptoggle, popuptoggle, groupdata, setgroupnumber, groupnumber, setnoteorselected, noteorselected}) => {
    function noteselectednotehandle(index){
        setgroupnumber(index)
        setnoteorselected(false)
    }
    return(
        <div className="w-4/12 flex flex-col pt-4 pl-4" style={noteorselected ? {display : "flex"} : {display:"fixed"}}>
            <div className="w-full font-medium text-3xl">Pocket Notes</div>
            <button className='border rounded-3xl w-4/5 bg-black text-white text-xl my-7 outline-none py-1 px-2 ml-4'  onClick={() => setpopuptoggle(!popuptoggle)}>+ Create Notes group</button>
            <div className="relative ml-4 flex flex-col w-full">
                {
                    groupdata.map((group, index) => {
                        return (
                            <div className="flex flex-wrap rounded-3xl p-2 mb-4 items-center text-xl font-medium w-full " style={groupnumber == index ? {backgroundColor:"#F7ECDC"}:{}} onClick={() => noteselectednotehandle(index)}>
                                <div className="relative mr-4">
                                    <img className='w-12' src={group.groupcolor} alt="" />
                                    <h3 className='absolute -mt-[38px] ml-3 '>{group.groupname.slice(0, 2).toUpperCase()}</h3>
                                </div>
                                <div className="font-light">{group.groupname}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CreateNote