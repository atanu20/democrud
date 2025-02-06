import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { path } from '../data';

const Edit =()=>{
    const [loading,setLoading] = useState(false)
    const [details ,setDetails]=useState({
        name:'',
        email:'',
        password:"",
        phone:"",
    });
    const his=useHistory();
    const {id}=useParams();


const edituser= async ()=>{
    setLoading(true)
   try {
    const res=await axios.get(`${path}/api/user/${id}`);
    if(res.data.success)
    {
        setDetails(res.data.data);
    }else{
        console.log(res.data.msg)
    }
    
    
   } catch (error) {
    console.log(error.message);
   }

   setTimeout(() => {
    setLoading(false)
}, 2000);
}

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

          const res=  await axios.put(`${path}/api/user/${id}`,details);
            if(res.data.success)
            {
                alert(res.data.msg)
                his.push("/")
            }else{
                console.log(res.data.msg)
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        edituser();
    },[])
    return(
        <>
       <section id="hom">
       <br /><br /><br /><br /><br /><br />
        <div className="container">
            <div className="row">
        <div className="col-6 mx-auto">
 {
    !loading ?(
        <>
         <form onSubmit={formSubmit}>
  <div class="form-group">
    <label for="">Enter Name:</label>
    <input type="text" class="form-control" placeholder="Enter Name" name="name" value={details.name} onChange={inputChange} required />
  </div>
  <div class="form-group">
    <label for="">Enter Email:</label>
    <input type="email" class="form-control" placeholder="Enter Email" name="email" value={details.email} onChange={inputChange}  required readOnly />
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
        
        </>
    ):(
        <>
        
        <div className="text-center">
            <p>Loading...</p>
        </div>
        </>
    )
 }
                </div>
            </div>
        </div>
       </section>
      
        </>
    );
}
export default Edit;