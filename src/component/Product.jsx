import { getAuth } from 'firebase/auth'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import app from '../firebase'

const Product = ({uid}) => {
    const [data, setData] = useState([])
    const [cartData, setCartData] =useState([])
    const [newCart, setNewCart] = useState([])


    const auto = getAuth(app)
    const firestore = getFirestore(app)

    

  async function dummy() {
    return await fetch('https://dummyjson.com/products')
   
  }

   async function fetchData(){
        const res = await dummy()
        const newData = await res.json();
        // console.log(newData)
        setData(newData.products)
      }
      
      const addCart = async () => {
        toast("Adding to Cart...!")
        
      }
      

    
    const getCart = async (id) => {
          try {
            const res = await getDoc(doc(firestore, "cart", id))
            const fireData = res.data()         
            console.log(fireData)
            toast("cart is accessible")
            await setNewCart(fireData.cartData)      
          } catch (error) {
            toast("get" + error.message)
          } 
      }
          

    useEffect(()=>{
 
         getCart(uid)
      
    }, [uid])


      
      
      const handleCart = async (ele) => {
  
        setCartData([...cartData, ele])

        try {
          const res = await  setDoc(doc(firestore, "cart", uid ) , {cartData}) 

          toast("item added successfully")
          
        } catch (error) {
             toast(error.message)

             console.log(error)
        }
        

        // //  await addCart()
    }

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div>

    <div className="container my-5 bg-dark">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item">
         <button className="btn btn-outline-dark btn-sm text-white">🛒- {newCart?.length || 0}</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>



        <div className="container my">
            <div className="row row-cols-4">
                {
                    data?.map((item)=>(
                            <div key={item.id} className="col">
                                <div className="card" >
                                    <img src={item.thumbnail} className="card-img-top" alt="..."/>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.price}</h5>
                                        <p className="card-text">{item.title}</p>
                                        <button onClick={()=>handleCart(item)} className="btn btn-primary btn-sm">Add</button>
                                    </div>
                                    </div>
                            </div>
                    ))
                }
            </div>
        </div>

        <ToastContainer/>
    </div>
  )
}

export default Product