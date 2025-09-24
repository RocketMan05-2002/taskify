import React from 'react'
import Card from '../components/Card';

const ClipsPage = () =>{
    // const { clips, currentUser } = AuthContext; 
    // todos ko yaha map karna h bas.
    // demo data
    const clips = [
        {id:1, clipHeading:"Learn Java", clipDescription:"Look up for some good java learning videos to hone java concepts to have clarity of what we are coding."},
        {id:2, clipHeading:"Learn Maven", clipDescription:"Look up for some good java learning videos to hone java concepts to have clarity of what we are coding."},
        {id:3, clipHeading:"Learn Spring", clipDescription:"Look up for some good java learning videos to hone java concepts to have clarity of what we are coding."},
        {id:4, clipHeading:"Learn Springboot", clipDescription:"Look up for some good java learning videos to hone java concepts to have clarity of what we are coding."},
        {id:5, clipHeading:"Learn Docker", clipDescription:"Look up for some good java learning videos to hone java concepts to have clarity of what we are coding."},
    ]
    const currentUser = "Abhi";
    return (
        <div className='text-white  bg-amber-200 h-screen p-2'>
            <div className="bg-red-900 border-2 border-gray-950">
                <h1 className='p-4 text-3xl'>{currentUser}'s Clips</h1>
            </div>
            <div className='grid grid-cols-4 gap-4 mt-2'>
                {
                    clips.map((clip,ind)=>{
                        return <div key={clip.id}>
                            <Card clipHeading={clip.clipHeading} clipDescription={clip.clipDescription} />
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ClipsPage;