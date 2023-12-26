import React,{useState,useEffect, useContext} from 'react'
import { AxiosInstance,addAuthToken } from '../utils/axiosconfig';
import { useParams } from 'react-router-dom';
import { setToken,getToken } from '../utils/utils';
import { APIContext } from '../context/APIcontext';
import {  toast } from 'react-toastify';

const TaskModal = ({enable,setEnable,data,taskId}) => {
    const {channelAdminMap} = useContext(APIContext)
    
    // console.log("chhanel admin map",channelAdminMap)
    const { channelId } = useParams();

    const isCurrentUserAdmin = channelAdminMap[channelId] || false;
   
    const [payLoad, setPayLoad] = useState({
        channel:channelId,
        title: '',
        junior: '',
        deadline: '',
        description: '',
      });

      useEffect(()=>{

        if(taskId){

            addAuthToken(getToken())
            AxiosInstance.get(`/core/task/${taskId}`)
            .then((response) => {
                if (response.status) {
                    // deleteAllState()
                    // console.log(response.data)
                    setPayLoad({
                        channel:channelId,
                        title: response.data.title,
                        junior: response.data.junior,
                        deadline: response.data.deadline,
                        description: response.data.description,
                        status:response.data.status
                    })
                }
                
            })
            .catch((error) => {
                // console.log(error)                  
                
            })
        }
      },[])


      const updateTask=(e)=>{
        e.preventDefault()
        // console.log(payLoad)
        const toastId = toast.loading("Please wait...");

        addAuthToken(getToken())
        AxiosInstance.put(`/core/create-task/${taskId}/`,payLoad)
        .then((response) => {
            if (response.status) {
                // deleteAllState()
                toast.update(toastId, { render: response.data.msg, type: "success", isLoading: false, autoClose:3000 })
                // console.log("patch method ",response.data)
            }
            
        })
        .catch((error) => {
            toast.update(toastId, { render: error.response.data.msg, type: "error", isLoading: false, autoClose:3000 })
            // console.log("patch method ",error)
                  

        })
      }

      const deleteAllState =()=>{
        setPayLoad({
            channel:channelId,
            title: '',
            junior: '',
            deadline: '',
            description: '',
        })
      }

      const checkAllFields=()=>{
        const errors = {};

        if (payLoad.title.trim() === '') {
            errors.title = 'Title cannot be blank';
        }

        if (payLoad.junior.trim() === '') {
            errors.junior = 'Please select a junior';
        }
        
        if (payLoad.deadline === '') {
            errors.deadline = 'Deadline cannot be blank';
        }
        if (payLoad.description.trim() === '') {
            errors.deadline = 'Description cannot be blank';
        }

        if (Object.keys(errors).length > 0) {
            // Handle errors here (e.g., show error messages, prevent form submission)
            Object.keys(errors).forEach((key) => {
                const errorMessage = errors[key];
              
                toast.error(errorMessage, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              });
            // Return errors object if needed for further handling
            return errors;
        }

        return null
      }


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPayLoad({
          ...payLoad,
          [name]: value
        });
        
      };

      const addTask=(e)=>{
        e.preventDefault()
        let check = checkAllFields();
        if(check){
            return;
        }
        const toastId = toast.loading("Please wait...");

        addAuthToken(getToken())
        AxiosInstance.post("/core/create-task/",payLoad)
        .then((response) => {
            if (response.status) {
                deleteAllState()
                toast.update(toastId, { render: response.data.msg, type: "success", isLoading: false, autoClose:3000 })
            }
            
        })
        .catch((error) => {
            toast.update(toastId, { render: error.response.data.msg, type: "error", isLoading: false, autoClose:3000 })
                  

        })
      }

  return (
    <div>


        {/* // <!-- Main modal --> */}
        <div id="crud-modal" tabindex="-1" aria-hidden="true" className={` ${enable ? "" :"hidden"} overflow-y-auto overflow-x-hidden fixed min-h-screen top-0 left-0 z-50 flex justify-center items-center w-full  `}>

            
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative rounded-lg shadow bg-bgColor4">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create Task
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
                                <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" name="title" id="name" className="border   text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-bgColor5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Type product name" onChange={handleInputChange} required={true} value={payLoad.title}
                                disabled={!isCurrentUserAdmin} />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label for="junior" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Junior</label>
                                <select id="junior" name='junior'  className="bg-bgColor5 border  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  border-gray-500 placeholder-gray-400 text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required
                                onChange={handleInputChange} 
                                value={payLoad.junior}
                                disabled={!isCurrentUserAdmin}
                                >
                                    <option selected="" >Select junior</option>
                                    
                                    {data.map((user, index) => {
                                        if (user.status !== 'admin') {
                                        return (
                                            <option key={index} value={user.user}>
                                            {user.name}
                                            </option>
                                        );
                                        }
                                        return null; // Exclude 'admin' users from the dropdown
                                    })}
                                    {/* <option value="TV">TV/Monitors</option> */}
                                    
                                </select>
                            </div>


                            <div className="col-span-2 sm:col-span-1">
                                <label for="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select id="status" name='status'  className="bg-bgColor5 border  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" required
                                onChange={handleInputChange} 
                                value={payLoad.status}
                                
                                >
                                    <option selected="" >Select status</option>
                                    
                                    <option value="completed">Completed</option>
                                    <option value="on_hold">On Hold</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="not_completed">Not Completed</option>
                                    
                                </select>
                            </div>
                            
                            <div className="col-span-2 sm:col-span-1">
                                <label for="deadline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DeadLine</label>
                                <input type="date" name="deadline" id="deadline" className="bg-bgColor5 border border-gray-300  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Type product name" required onChange={handleInputChange} value={payLoad.deadline}
                                disabled={!isCurrentUserAdmin} />
                            </div>
                            <div className="col-span-2">
                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea name='description' id="description" rows="4" className="block p-2.5 w-full text-sm bg-bgColor5 rounded-lg border border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Write product description here" required onChange={handleInputChange} value={payLoad.description}
                                disabled={!isCurrentUserAdmin}></textarea>                    
                            </div>
                        </div>
                        {taskId ?
                        
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={updateTask}>
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Update
                        </button>

                        :
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addTask}>
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add new task
                        </button>
                        }
                    </form>
                </div>
            </div>
        </div> 

</div>

  )
}

export default TaskModal