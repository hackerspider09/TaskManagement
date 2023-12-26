import React ,{useState,useContext, useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { AxiosInstance } from '../utils/axiosconfig';
import { setToken } from '../utils/utils';
import { APIContext } from '../context/APIcontext';

const AcceptInvitation = () => {

  
      const navigate = useNavigate()

    const { invitationId } = useParams();
    const [confirmPassword,setConfirmPassword] = useState("")
    const [passwordsMatch,setPasswordsMatch] = useState(true)
    const [signedIn,setSignedIn]  = useState(true)
    const [invitationDetail,setInvitationDetail]  = useState(null)
    const {setIsLoggedIn} = useContext(APIContext)

    const [authCred, setAuthCred] = useState({
        'invitationId': invitationId
      });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.value)
        setAuthCred({
          ...authCred,
          [name]: value
        });
      };

      useEffect(()=>{
          AxiosInstance.get(`/core/invitation/${invitationId}`)
          .then((response) => {
            //   console.log("enter in then ");
              if (response.status) {
                //   console.log(response)
                  setInvitationDetail(response.data)
              }
              else {
                  // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                //   console.log("login failed");
                  
              }
          })
          .catch((error) => {
            //   console.log("login faile",error)  
                    
    
          })

      },[])


      const handleInvitation =(e)=>{
        e.preventDefault()
        //   console.log(authCred)
        AxiosInstance.post("/core/accept-invitation/",authCred)
        .then((response) => {
            // console.log("enter in then ");
            if (response.status) {
                // console.log(response)
                navigate("/auth")
            }
            else {
                // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                // console.log("login failed");
                
            }
        })
        .catch((error) => {
            // console.log("login faile",error)  
                  

        })

}

    
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <div>
        <section >
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-bgColor4 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white text-center">
                        Accept Invitation
                        
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                        {!invitationDetail?.userExists &&
                        <>
                    <div>
                            <label for="name" className="block mb-2 text-sm font-medium text-white">Your Name</label>
                            <input type="text" name="name" id="name" className="border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-bgColor5 dark:border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name" required={true}
                            onChange={handleInputChange}

                            value={authCred.name}
                            />
                        </div>
                       
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-bgColor5 dark:border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required onChange={handleInputChange}
                            value={authCred.password} />
                        </div>
                        </>
                        }
                        
                            
                        <button type="submit" className="w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-primary-700 focus:ring-primary-800" onClick={handleInvitation} >Join</button>

                       
                        
                    </form>
                </div>
            </div>
        </section>
        </div>
    </div>
  )
}

export default AcceptInvitation