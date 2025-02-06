import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { path } from '../data';

const Add =()=>{
    const [details ,setDetails]=useState({
        name:'',
        email:'',
        password:"",
        phone:"",
    });
    const his=useHistory();
    const inputChange=(e)=>{
        const {name,value}=e.target;
        setDetails((prevvalue)=>{
            return {
                ...prevvalue,
                [name]:value,
            }
        })
    }
    const formSubmit=async (e)=>{
        e.preventDefault();
        try {
           const res= await axios.post(`${path}/api/user`,details);
            if(res.data.success)
            {
                his.push("/")
            }else{
                console.log(res.data.msg)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return(
        <>
       <section id="hom">
       <br /><br /><br /><br /><br /><br />
        <div className="container">
            <div className="row">
        <div className="col-6 mx-auto">
  <form onSubmit={formSubmit}>
  <div class="form-group">
    <label for="">Enter Name:</label>
    <input type="text" class="form-control" placeholder="Enter Name" name="name" value={details.name} onChange={inputChange} required />
  </div>
  <div class="form-group">
    <label for="">Enter Email:</label>
    <input type="email" class="form-control" placeholder="Enter Email" name="email" value={details.email} onChange={inputChange}  required />
  </div>
  <div class="form-group">
    <label for="">Enter password:</label>
    <input type="password" class="form-control" placeholder="Enter Password" name="password" value={details.password} onChange={inputChange}  required />
  </div>
  <div class="form-group">
    <label for="">Enter Phone Number:</label>
    <input type="number" class="form-control" placeholder="Enter Phone Number" name="phone" value={details.phone} onChange={inputChange}  required />
  </div>
  
  <button type="submit" class="btn btn-warning">Submit</button>
</form>
                </div>
            </div>
        </div>
       </section>
      
        </>
    );
}
export default Add;