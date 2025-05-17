import React from 'react'

const Loading    = () => {
  return (
    <div className='flex justify-center items-center py-6 h-full'>
      <div className='border-4 rounded-full w-10 h-10 border-red-300 animate-spin border-t-transparent scale-200 '></div>
    </div>
  )
}

export default Loading
