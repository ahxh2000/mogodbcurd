import React from 'react'
import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from "react-icons/hi";
async function getTopics() {
    try {
        const res = await fetch('http://localhost:3000/api/topics', { cache: 'no-store', })
        if (!res.ok) {
            throw new Error('Failed to load topics')
        }
        return res.json();
    } catch (err) {
        console.log("Error loading topics: ", err);
    }
}
const TopicsList = async () => {
    const { topics } = await getTopics();
    return (
        <>
            {
                topics.map((topic) => (
                    <div className='p-4 border border-slate-300 my-3 flex justify-between items-start' key={topic._id}>  
                        <div>
                            <h2 className='font-bold text-2xl'>{topic.title}</h2>
                            <div>{topic.description}</div>
                        </div>
                        <div className='flex gap-2'>
                            <RemoveBtn id={topic._id} />
                            <Link href={`/editTopic/${topic._id}`}>
                                <HiPencilAlt size={20} color="blue" />
                            </Link>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default TopicsList
