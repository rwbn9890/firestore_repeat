import React, { useEffect, useState } from 'react'

import app from '../firebase'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, setPersistence, browserLocalPersistence, browserSessionPersistence, inMemoryPersistence } from 'firebase/auth'
import { toast } from 'react-toastify'
import Navbar from './Navbar'


const Login = () => {

const [remember, setRemember] =useState(false)
  const [user, setUser] = useState({photo:"", name:"", email:""})



    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider(app)
    const githubProvider = new GithubAuthProvider(app)

    const [reg, setReg] = useState({name:"", email:"", password:""})


    const handleChange = (e) => {
        const {value, name} = e.target
        setReg({
            ...reg,
            [name] : value
        })
    }



  
  


    useEffect(() => {

        const persisteProvider =  remember  ? browserLocalPersistence : browserSessionPersistence 

     setPersistence(auth, persisteProvider)

       onAuthStateChanged(auth, (user)=>{
        if(user)
        {
          console.log(user)
           
          setUser({...user, photo:user.photoURL, name:user.displayName, email:user.email})
        }
       })
    },[auth])

    const handleGoogle = async () => {
      
      try {
 
        let res =  await signInWithPopup(auth, googleProvider);
          // console.log(auth.currentUser)
          toast("goolge Signin  Successfull...!")

          // setUrl(auth.currentUser.photoURL)
      } catch (error) {
        toast("goolge Signin  fiale3d...!")
        console.log(error.code)
      }
    }

    const handleGithub = async () => {
       try {
        let res = await signInWithPopup(auth, githubProvider) 
          // console.log(auth.currentUser)
            // toast("Github Signin  Successfull...!")
             
        } catch (error) {
          toast("Github Signin  fiale3d...!")
          console.log(error.code)
      }
    }




    const handleReg = async () => {
        // console.log(reg)

        try {
            const res = await  createUserWithEmailAndPassword(auth, reg.email, reg.password)
            toast("REgistration Successfull...!")
            let user = auth.currentUser


             await updateProfile(auth.currentUser, {
                displayName:reg.name
             })

            console.log(user)
        } catch (error) {
            toast(error.code)
            console.log(error.message)
            console.log(error.code)
        }

    }


    const handleLog = async () => {

        try {
              const res = await signInWithEmailAndPassword(auth, reg.email, reg.password)
          
              
      let user = auth.currentUser
      console.log(user)
                toast(user.displayName +  " Loged Successfull...!")

        } catch (error) {
            toast(error.code)
            console.log(error.message)
            console.log(error.code)
        }
    }

  return (
    <div>
         <Navbar user={user} />
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" name="name" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" onChange={handleChange} className="form-control" id="exampleInputPassword1" />
  </div>
  {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1">
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
<div className='d-flex gap-2 justify-content-start pb-4'>
  <input type="checkbox" className='form-check-input' checked={remember} onChange={() => setRemember(!remember)} />
  <label className={remember ? 'text-success' : "text-dark"}>Remember Me </label>
</div>
  <button onClick={handleReg} className="btn btn-primary">Register</button>
  <button onClick={handleLog} className="btn btn-primary">LOgin</button>

  <div className='my-2 d-flex gap-4'>
    <button onClick={handleGoogle} className='btn rounded-circle shadow'><img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" className='img-fluid rounded-circle' style={{width:"30px"}} alt="" /></button>
    <button onClick={handleGithub}  className='btn rounded-circle shadow'><img src="https://cdn-icons-png.flaticon.com/128/3291/3291695.png" className='img-fluid rounded-circle' style={{width:"30px"}} alt="" /></button>
  </div>
</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login