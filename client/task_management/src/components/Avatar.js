import React from 'react'


const Avatar = ({name}) => {

    
    const getInitials = (name) => {
      console.log(name,"nin avatar")
        const initials = name
          ?.split(' ')
          .map((word) => word.charAt(0).toUpperCase())
          .join('');
    
        return initials?.slice(0, 2); // Change this number to adjust the number of letters shown in the avatar
      };
    
  return (
    <div className='w-5 h-5 bg-fLetter rounded-full p-10 flex justify-center items-center animate-pulse'>
        <span className='text-3xl '>{getInitials(name)}</span>
    </div>
  )
}

export default Avatar