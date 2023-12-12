'use client'
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation'
const RemoveBtn =  ({ id }) => {
    const router = useRouter();
  async function handleClick() {
    const confirmed = confirm('Are you sure you want to delete this topic?')
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          router.refresh();
        } else {
          throw new Error('Something went wrong!')
        }
      } catch (error) {
        console.log('Failed to delete :', error);
      }
    }
  }

  return (
    <button onClick={handleClick} className='text-red-900'>
      <HiOutlineTrash size={24} />
    </button>
  )
}

export default RemoveBtn
