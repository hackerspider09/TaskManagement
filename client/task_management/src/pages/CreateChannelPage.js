import React from 'react'
import ChannelForm from '../components/ChannelForm'

const CreateChannel = () => {
  return (
    <div className="p-4 sm:ml-64  " >

        <div className=' bg  min-h-screen p-3 text-white flex justify-center items-center'>

            <ChannelForm />
        </div>
    </div>
  )
}

export default CreateChannel