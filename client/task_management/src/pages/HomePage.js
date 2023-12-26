import React,{useState,useContext,useEffect} from 'react'
import Avatar from '../components/Avatar'
import PieChartComponent from '../components/PieChartComponent';

import { setToken,getToken } from '../utils/utils';
import { AxiosInstance,addAuthToken } from '../utils/axiosconfig';
import { APIContext } from '../context/APIcontext';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
  const [pieDataTo,setPieDataTo] = useState(null)
  const [pieDataBy,setPieDataBy] = useState(null)
  const {user,setUser} = useContext(APIContext)
  const navigate = useNavigate()

  useEffect(()=>{
    addAuthToken(getToken())
      AxiosInstance.get("/user/user-details/",)
      .then((response) => {
          // console.log("enter in then ");
          if (response.status) {
              // console.log(response.data)
              setUser(response.data.name)
              setPieDataTo(response.data.assignedTo)
              setPieDataBy(response.data.assignedBy)
          }
          else {
              // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
              // console.log("pie chart");
              
          }
      })
      .catch((error) => {
            navigate("/auth")
          // console.log("fetch pie",error)  
                

      })
  },[])


  return (
    <div className="p-4 sm:ml-64  " >

        <div className='  min-h-screen p-3 text-white flex flex-wrap gap-10 flex-col'>
            <div className='flex flex-col items-center gap-5'>

                <h1 className='text-2xl' >Welcome   </h1>
                <div><Avatar name={user} /></div>
            </div>
            <div className='flex flex-wrap  xl:flex-row flex-col  '>
              <div className='flex flex-col xl:w-[50%]'>
                  <span className='text-white bg-bgColor5 p-2 m-1 rounded-xl text-center'>Task assigned To Me</span>
                  <PieChartComponent pieData={pieDataTo} />
              </div>
              <div className='flex flex-col xl:w-[50%]'>
                  <span className='text-white bg-bgColor5 p-2 m-1 rounded-xl text-center'>Task assigned By Me</span>
                  <PieChartComponent pieData={pieDataBy} />
              </div>
            </div>

        </div>
    </div>
  )
}

export default HomePage