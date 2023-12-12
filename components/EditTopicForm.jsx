'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
const EditTopicForm = ({ topic }) => {
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      alert('Please fill all the fields');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${topic._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newTitle,
          newDescription
        })
      })
      if (res.ok) {
       
        router.push('/')
        router.refresh();
      }
      else {
        throw new Error('Failed to update Topics');
      }
    } catch (error) {
      console.log('Failed to update Topics:', error)
    }
  }

  const [newTitle, setNewTitle] = useState(topic.title);
  const [newDescription, setNewDescription] = useState(topic.description);
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <input onChange={e => setNewTitle(e.target.value)} value={newTitle} className='border border-slate-500 px-8 py-2' type='text' placeholder='Topic Title' />
      <input onChange={e => setNewDescription(e.target.value)} value={newDescription} className='border border-slate-500 px-8 py-2' type='text' placeholder='Topic Description' />
      <button type='submit' className='bg-green-600 font-bold text-white py-3 px-2 w-fit'> Update Topic</button>
    </form>
  )
}

export default EditTopicForm
