"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill all the fields');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description
        })
      })
      if (res.ok) {
       router.replace('/');
      }
      else {
        throw new Error('Failed to create Topics');
      }
    } catch (error) {
      console.log('Failed to create Topics:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <input onChange={e => setTitle(e.target.value)} value={title} className='border border-slate-500 px-8 py-2' type='text' placeholder='Topic Title' />
      <input onChange={e => setDescription(e.target.value)} value={description} className='border border-slate-500 px-8 py-2' type='text' placeholder='Topic Description' />
      <button type='submit' className='bg-green-600 font-bold text-white py-3 px-2 w-fit'> Add Topic</button>
    </form>
  )
}

export default page
