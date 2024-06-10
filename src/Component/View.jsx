import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// notes
import { FaNotesMedical } from "react-icons/fa";
//delete
import { RiDeleteBin6Fill } from "react-icons/ri";
//edit
import { MdEditSquare } from "react-icons/md";

const View = () => {

  const navigate = useNavigate();
  const all = JSON.parse(localStorage.getItem("task")) ? JSON.parse(localStorage.getItem("task")) : [];
  const [task, setTask] = useState(all)
  const [multiDelet, setMultiDelet] = useState([]);
  const [multiStatus, setMultiStatus] = useState([]);
  
  //delet Task
  const DeletUser = (id) => {
    let del = task.filter(val => val.id != id);
    setTask(del);
    localStorage.setItem("task", JSON.stringify(del))
    alert("Deleted...")

  }

  // checkChangDelet
  const checkChangDelet = (id, checked) => {
    let Mdelet = [...multiDelet];
    if (checked) {
      Mdelet.push(id);

    } else {
      Mdelet = Mdelet.filter(val => val != id);
    }
    setMultiDelet(Mdelet);

  }
  const DeletAll = () => {
    if (multiDelet.length > 0) {
      let MDelet = task.filter(val => !multiDelet.includes(val.id));
      setTask(MDelet)
      setMultiDelet([]);
      alert("Delet All...");
      localStorage.setItem("task", JSON.stringify(MDelet));

    } else {
      alert("Atleast One Selected....")
    }
  }

  // StatusUpadate
  const StatusUpadate = (id, status) => {
    if (status === "Inactive") {
      let UpStatus = task.map((val) => {
        if (val.id === id) {
          val.status = "Active"
        }
        return val;
      })
      setTask(UpStatus);
      localStorage.setItem("task", JSON.stringify(UpStatus))
      alert("Update status...");
    }else{
      let UpStatus = task.map((val) => {
        if (val.id === id) {
          val.status = "Inactive"
        }
        return val;
      })
      setTask(UpStatus);
      localStorage.setItem("task", JSON.stringify(UpStatus))
      alert("Update status...");
    }
  }

  const checkChangStatus =(id, checked)=> {
    let Mstatus = [...multiStatus];

    if(checked){
      Mstatus.push(id);

    }else{
      Mstatus = Mstatus.filter(val => val != id);
    }
    setMultiStatus(Mstatus);
   
  }
  const UpStatus =() =>{
    if(multiStatus.length > 0){
      let UpdateStatus = task.map((val)=>{
        if(multiStatus.includes(val.id)){
          if(val.status === "Inactive"){
            val.status = "Active"
          }else{
            val.status = "Inactive"
          }
        }
        return val;
      })
      setTask(UpdateStatus);
      localStorage.setItem("task",JSON.stringify(UpdateStatus));
      alert("update All Status")
      setMultiStatus([])
    }else{
      alert("Atleast One selected")
    }
  }
  return (
    <div className='bg-primary ' >
      <div className='col-md-9  pt-5 ' >
        <h1 align="center" className='text-white'>All Task</h1>
        <div className='d-flex justify-content-end mb-3 me-3nn'>
          <Link to={'/'}>
            <button className='btn  bg-success text-white'>
              Add
            </button></Link>

        </div>
       <div style={{height : "100vh"}}>
       <table className="table shadow table-striped" style={{ border: "3px solid #0d6efd", borderRadius : "10px",overflow : "hidden"}} >
          <thead align='center'>
            <tr>
              <th scope="col"><span className='fs-5 text-primary'><FaNotesMedical /></span></th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
              <th scope="col">
                <button className='btn  bg-success text-white' onClick={() => DeletAll()}>Delet All</button>
              </th>
              <th><button className='btn  bg-secondary text-white' onClick={() => UpStatus()}>Update Status</button> </th>

            </tr>
          </thead>
          <tbody align='center'>
            {
              task.map((val) => {
                const { id, title, description, status } = val;
                return (
                  <tr key={id}>
                    <td><span className='fs-5 text-primary'><FaNotesMedical /></span></td>
                    <td>{title}</td>
                    <td>{description}</td>
                    <td>
                      {
                        status == "Inactive" ? (<button className='btn bg-secondary text-white' onClick={(e) => StatusUpadate(id, status)}>{status}</button>
                        ) : (<button className='btn bg-primary text-white' onClick={(e) => StatusUpadate(id, status)}>{status}</button>
                        )
                      }
                    </td>
                    <td>
                      <button className='btn bg-danger text-white me-3' onClick={() => DeletUser(id)}><span ><RiDeleteBin6Fill /></span></button>
                      <button className='btn bg-info text-white' onClick={() => navigate(`/edit`, { state: val })}><span ><MdEditSquare /></span></button>

                    </td>
                    <td>
                      <input type="checkbox" checked={multiDelet.includes(id)}  name="" id="" onChange={(e) => checkChangDelet(id, e.target.checked)} />
                    </td>
                    <td>
                      <input type="checkbox" checked={multiStatus.includes(id)} name="" id="" onChange={(e) => checkChangStatus(id, e.target.checked)} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
       </div>
      </div>
    </div>
  )
}

export default View
