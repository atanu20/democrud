import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {NavLink, Link} from 'react-router-dom';
import { useHistory } from 'react-router';
import { path } from '../data';

const Home =()=>{
    const [users,setUsers]=useState([]);

    const [loading,setLoading] = useState(false)
    
    const his=useHistory();
    const deleteUser=async (id)=>{
         try {
            const res=await axios.delete(`${path}/api/user/${id}`);
            if(res.data.success)
            {
                alert("data deleted successfully")
                loadData();
            }else
            {
                console.log(res.data.msg)
            }
         } catch (error) {
            console.log(error.message);
         }
       
        // console.log(id)
    
    }
    
const loadData= async ()=>{
setLoading(true)
try {
    const res= await axios.get(`${path}/api/users`);
// console.log(res.data);
setUsers(res.data.data);
} catch (error) {
    console.log(error.message);
}
setTimeout(() => {
    setLoading(false)
}, 2000);

}


useEffect(()=>{
    loadData();

},[])

    return(
        <>
        <br /><br /><br />
       <div className="container show ">
       <div className="row">
          {
            !loading ?(
                <>

<div className="col-8 mx-auto ">
           {
            users.length > 0 ?(
                <>

<table className="table table-bordered table-sm">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
        
            
           {
            users?.map((user,ind)=>{
                return (<>
                
                <tr key={ind}>
                <td>{ind+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                    
                    <NavLink className="btn btn-danger" to={`/edit/${user._id}`}>Edit</NavLink>
                    &nbsp;
                    <Link className="btn btn-danger mx-2" onClick={()=>{ if (window.confirm('Are you sure you want to delete this item?'))deleteUser(user._id)}} >Delete</Link>
         

                </td>
                </tr>
                </>)
            })
    } 
       
    
    </tbody>
  </table>
                
                </>
            ):(
                <>
                <div className="text-center">
                    <h2>No data Found</h2>
                </div>
                </>
            )
           }
           </div>
                
                </>
            ):(
                <>
               <div className="col-12">
               <div className="text-center">
                    <p>loading...</p>
                </div>
               </div>
                </>
            )
          }
       </div>
       </div>
        </>
    );
}
export default Home;