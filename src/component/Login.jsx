import React, { useState } from 'react'

import app from '../firebase'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'

const Login = () => {


    const auth = getAuth(app)

    const [reg, setReg] = useState({name:"", email:"", password:""})


    const handleChange = (e) => {
        const {value, name} = e.target
        setReg({
            ...reg,
            [name] : value
        })
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
  <button onClick={handleReg} className="btn btn-primary">Register</button>
  <button onClick={handleLog} className="btn btn-primary">LOgin</button>
</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login