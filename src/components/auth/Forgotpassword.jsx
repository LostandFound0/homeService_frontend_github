import axios from "axios";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Forgotpassword(){
    const[email,setforgtEmail]=useState("")
    const navigate=useNavigate()
    
    const forgotPassword=async(e)=>{
        e.preventDefault()
        try{
            const response=await axios.post('http://localhost:6060/forgotpassword',{email})
            if (response.status === 200) {
                alert("Success! Please check your email.");
                navigate('/')
            }
        }catch(error){
            console.error("There was an error sending the request!", error);
            alert("An error occurred. Please try again.");
        }
    }
    return(
        <>
            <section className="formConcepts">
                <div className="formBox">
                        <form onSubmit={forgotPassword}>
                            <h1>Forgot password</h1>
                            <div className="inputDetails">
                                <input type="email"  name="email" value={email} onChange={(e)=>setforgtEmail(e.target.value)} required/>
                                <label htmlFor="email">Enter Email</label>
                            </div>
                            <div className="Signupbtns">
                                <button className="srvcbtn" style={{width:'45%'}}>Forgot password</button>
                            </div>
                            <div className="otherlinks">
                                <span>Go to &nbsp;&nbsp;<a href="/">Homepage</a></span>
                            </div>
                        </form>
                    </div>
            </section>
        </>
    )
}