import React ,{useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AxiosInstance } from '../utils/axiosconfig';
import { setToken } from '../utils/utils';
import { APIContext } from '../context/APIcontext';
import {  toast } from 'react-toastify';


const Auth = () => {
    const [authCred, setAuthCred] = useState({
        email: '',
        password: '',
      });
      const navigate = useNavigate()
    
    const [confirmPassword,setConfirmPassword] = useState("")
    const [passwordsMatch,setPasswordsMatch] = useState(true)
    const [signedIn,setSignedIn]  = useState(true)
    const {setIsLoggedIn} = useContext(APIContext)
    const [submitBtnClick,setSubmitBtnClick] = useState(false)


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthCred({
          ...authCred,
          [name]: value
        });
      };


      const login =(loginPayload)=>{
        setSubmitBtnClick(true)
        const toastId = toast.loading("Please wait...");
        AxiosInstance.post("/api/token/",loginPayload)
        .then((response) => {
            // console.log("enter in then ");
            if (response.status) {
                toast.update(toastId, { render: "Logged in", type: "success", isLoading: false, autoClose:3000 })
                setSubmitBtnClick(false)
                setToken(response.data.access)
                setIsLoggedIn(true)
                navigate("/")
            }
            else {
                
                setSubmitBtnClick(false)
                // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                
            }
        })
        .catch((error) => {
            toast.update(toastId, { render: "something went wrong", type: "error", isLoading: false, autoClose:3000 })
            window.location.reload()
            setSubmitBtnClick(false)
                  

        })

}

      const singup =(loginPayload)=>{
        const toastId = toast.loading("Please wait...");

        setSubmitBtnClick(true)
        AxiosInstance.post("/user/register/",loginPayload)
        .then((response) => {
            if (response.status) {
                toast.update(toastId, { render: "Account created", type: "success", isLoading: false, autoClose:3000 })

                setSubmitBtnClick(false)
            }
            else {

                // toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                setSubmitBtnClick(false)
                
            }
        })
        .catch((error) => {
            toast.update(toastId, { render: error.response.data.email[0], type: "error", isLoading: false, autoClose:3000 })

            setSubmitBtnClick(false)
                  

        })

}

    const handleSignInUp = (e)=>{
        e.preventDefault()
        if(authCred.name){
            singup(authCred)
        }else{
            login(authCred)
        }

        
    }


  return (
    <div>
        <section >
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-bgColor4 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white ">
                        {signedIn ? "Sign in to your account" : "Sign Up to create account" }
                        
                    </h1>
                    <form className="space-y-4 md:space-y-6">
                    {signedIn ?"": <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-white">Your Name</label>
                            <input type="text" name="name" id="email" className="border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-bgColor5 dark:border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name" required={true}
                            onChange={handleInputChange}

                            value={authCred.name}
                            />
                        </div>

                        }
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                            <input type="email" name="email" id="email" className="border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-bgColor5 dark:border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required={true}
                            onChange={handleInputChange}

                            value={authCred.email}
                            />
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-bgColor5 dark:border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required onChange={handleInputChange}
                            value={authCred.password} />
                        </div>
                        {signedIn ?"": <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-white">Comfirm Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 bg-bgColor5 dark:border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required onChange={(e)=>{
                                setConfirmPassword(e.target.value);
                                if(e.target.value !== authCred.password){
                                setPasswordsMatch(false)
                                }else{
                                
                                setPasswordsMatch(true)
                                }
                            }}
                            value={confirmPassword} />

                        {!passwordsMatch && confirmPassword!=="" && (
                            <small className='text-red-800'>Password does not match</small>
                        )}
                        </div>

                        
                        }
                        

                            
                        <button type="submit" className="w-full text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-primary-700 focus:ring-primary-800" onClick={handleSignInUp} disabled={submitBtnClick} >{signedIn ? "Sign in" : "Sign Up"}</button>

                        {signedIn? <p className="text-sm font-light text-gray-400">
                            Don’t have an account yet? <a href="" className="font-medium hover:underline text-primary-500" onClick={(e)=>{
                                e.preventDefault();
                                setSignedIn(false);
                        }}>Sign up</a>
                        </p> :
                        <p className="text-sm font-light text-gray-400">
                        Already have an account <a href="" className="font-medium hover:underline text-primary-500" onClick={(e)=>{
                            e.preventDefault();
                            setSignedIn(true);
                    }}>Sign In</a>
                    </p>
                        }
                        
                    </form>
                </div>
            </div>
        </section>

    </div>
  )
}

export default Auth