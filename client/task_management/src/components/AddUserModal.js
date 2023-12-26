import React,{useState} from 'react'
import {useParams} from 'react-router-dom'
import { AxiosInstance,addAuthToken } from '../utils/axiosconfig';
import { setToken ,getToken} from '../utils/utils';
import { APIContext } from '../context/APIcontext';
import {  toast } from 'react-toastify';


const AddUserModal = ({enable,setEnable}) => {
    const [emailToAdd,setEmailToAdd] = useState([])
    const {channelId}  = useParams()
    const [addBtnClick,setAddBtnClick] = useState(false)
    
    const handleEmailChange = (e) => {
        const email = e.target.value
        setEmailToAdd(
          email
        );

        // console.log(emailToAdd)
      };

      const handleInvitation =(e)=>{
        e.preventDefault()
        setAddBtnClick(true);
        const toastId = toast.loading("Please wait...");
        const payLoad = {
            'email':emailToAdd,
            'channel':channelId
        }
        addAuthToken(getToken())
        AxiosInstance.post("/core/send-invitation/",payLoad)
        .then((response) => {
            // console.log("enter in then ");
            setAddBtnClick(false)
            if (response.status) {
                toast.update(toastId, { render: "Email sent", type: "success", isLoading: false, autoClose:3000 })
                // console.log(response.data)
                
            }
            else {
                // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                // console.log("login failed");
                
            }
        })
        .catch((error) => {
            setAddBtnClick(false);
            toast.update(toastId, { render: error.response.data.msg, type: "error", isLoading: false, autoClose:3000 })

            // console.log("login faile",error)  
                  

        })

}

  return (
    <div>


        {/* // <!-- Main modal --> */}
        <div id="crud-modal" tabindex="-1" aria-hidden="true" className={` ${enable ? "" :"hidden"} overflow-y-auto overflow-x-hidden fixed min-h-screen top-0 left-0 z-50 flex justify-center items-center w-full  `}>

            
            <div className="relative  w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative  rounded-lg shadow bg-bgColor4">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <h3 className="text-lg font-semibold  text-white">
                            Add new User
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={()=>{setEnable(false)}}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            
                            <div className="col-span-2">
                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email of User</label>
                                <input id="description" className="block p-2.5 w-full text-sm bg-bgColor5 rounded-lg border border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Write one email"  
                                value={emailToAdd}
                                onChange={handleEmailChange} required></input>                    
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleInvitation} disabled={addBtnClick}>
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add User
                        </button>
                    </form>
                </div>
            </div>
        </div> 

</div>

  )
}

export default AddUserModal