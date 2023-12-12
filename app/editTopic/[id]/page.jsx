import EditTopicForm from '@/components/EditTopicForm'
import React from 'react'

async function getTopicById(id) {
  try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, { cache: 'no-store', })
      if (!res.ok) {
          throw new Error('Failed to load the topic')
      }
      return res.json();
  } catch (err) { 
      console.log("Error loading topic: ", err);
  }
}

const page =async ({params}) => {
  const {id} = params;
 const {topic} = await getTopicById(id);  
  return (
    <EditTopicForm topic={topic} />
  )
}

export default page
 