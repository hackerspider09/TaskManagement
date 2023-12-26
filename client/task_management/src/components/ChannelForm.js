import React ,{useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosInstance } from '../utils/axiosconfig';
import { setToken } from '../utils/utils';
import { APIContext } from '../context/APIcontext';
import {  toast } from 'react-toastify';

const ChannelForm = () => {

    const [payload, setPayload] = useState({
        
      });
      const navigate = useNavigate()
    
    const [confirmPassword,setConfirmPassword] = useState("")
    const [passwordsMatch,setPasswordsMatch] = useState(true)
    const [submitBtn,setSubmitBtn]  = useState(false)
    const {setIsLoggedIn} = useContext(APIContext)


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.value)
        setPayload({
          ...payload,
          [name]: value
        });
      };


    const handleSubmit = (e)=>{
        e.preventDefault()
        const toastId = toast.loading("Please wait...");
        setSubmitBtn(true);
        AxiosInstance.post("/core/channel/",payload)
        .then((response) => {
            if (response.status) {
                toast.update(toastId, { render: "Channel created", type: "success", isLoading: false, autoClose:3000 })
                setPayload({'name':''})
                setSubmitBtn(false);
            }
            else {
                // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                // console.log("login failed");
                
            }
        })
        .catch((error) => {
            toast.update(toastId, { render: error.response.data.msg, type: "error", isLoading: false, autoClose:3000 })
            // console.log("login faile")  
                  

        })

        
    }


  return (
    <div>
        <section >
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-bgColor4 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white ">
                        Create Channel
                        
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                    
                        <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-white">Channel Name</label>
                            <input type="text" name="name" id="name" className="border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-bgColor5 dark:border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="channel name" required={true}
                            onChange={handleInputChange}

                            value={payload.name}
                            />
                        </div>
                        

                            
                        <button type="submit" className="w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-primary-700 focus:ring-primary-800" onClick={
                            handleSubmit
                        } disabled={submitBtn} >Submit</button>

                        
                    </form>
                </div>
            </div>
        </section>

    </div>
  )
}

export default ChannelForm