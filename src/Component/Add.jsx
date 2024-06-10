import React, { useState } from 'react'
import { Link, json, useLocation, useNavigate } from 'react-router-dom'

const Add = () => {

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const AllTask = JSON.parse(localStorage.getItem("task")) ? JSON.parse(localStorage.getItem("task")) : [];
    const [task,setTask] = useState(AllTask);
    const location = useLocation();
    const navigate = useNavigate();

    const hendelSubmit =(event) =>{
        event.preventDefault();
      let obj ={
        id : Date.now(),
        title,
        description,
        status : "Inactive"
        
      }
      if(!title || !description){
        alert("Required All Field...")
        return false;
      }
      const newfield = [...task,obj];
      setTask(newfield);
      localStorage.setItem("task",JSON.stringify(newfield));
      setTitle("");
      setDescription("")
      setTimeout(()=>{
        navigate('/View');
      },1000)

    }

  return (
    <div>

      <div className='col-md-7 mx-auto pt-5 bg-info mt-5 p-5 text-white rounded'>
   <h1  align="center">Input Form</h1>

   <div className='d-flex justify-content-end mb-3'>
   <Link  to={'/View'}>
   <button className='btn  bg-success text-white'>
        View
        </button></Link>
          
        </div>
   <form  onSubmit={hendelSubmit}>
   <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Task :</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputEmail1" onChange={(e) => setTitle(e.target.value)}  value={title }/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Description:</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputEmail2" onChange={(e) => setDescription(e.target.value)}  value={description} />
    </div>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

   </div>
    </div>
  )
}

export default Add
