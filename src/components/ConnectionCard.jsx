import React from 'react'

const ConnectionCard = ({data}) => {
  const {firstName, lastName, age, gender, photoUrl, skills, about} = data;
  return (
    <div className='w-full bg-base-300 rounded-lg flex gap-4 p-4 m-2 items-center'>
      <img className="h-10 w-10 rounded-full" src={photoUrl} alt='photo'/>
      <div>
        <p>{firstName + " " + lastName}</p>
        <p>{about}</p>
      </div>
    </div>
  )
}

export default ConnectionCard