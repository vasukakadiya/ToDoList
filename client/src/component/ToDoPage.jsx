import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function ToDoPage() {
    const [taskName,setTaskName]=useState()
    const [taskData,setTaskData]=useState([])
    const [check,setCheck]=useState(['d'])

    useEffect(()=>{
        getTaskData()
    },[])

    const handleAddTask=async (e)=>{
            e.preventDefault()
            // alert("h")
            let addTask=await fetch('http://localhost:5000/addtask',{
                method:"post",
                body:JSON.stringify({taskName:taskName}),
                headers:{
                'Content-Type':'application/json'

                }
            })

            addTask=await addTask.json()

            if(addTask.status==="Created")
                {
                    getTaskData()
                    toast.success("Task added....")
                }
                else{
                    toast.error("Something went wrong....")
                }

    }

    const getTaskData=async ()=>{
        let getData=await fetch("http://localhost:5000/taskdata")

        getData=await getData.json()
        console.log(getData)

        setTaskData(getData)
    }

    const handleCheckbox=async (e)=>{
        let value=e.target.value;
        let checked=e.target.checked;
        console.log(checked)

      
        

        if(checked)
            {
                check.push(value)
                console.log(check)

                let update=await fetch('http://localhost:5000/update',{
                    method:'put',
                    body:JSON.stringify({id:value,status:'Completed'}),
                    headers:{
                        'content-Type':'application/json'
                    }
                })
        
                update=await update.json()

                getTaskData()

            }
            else{
                check.pop(value)
                console.log(check)

                
                let update=await fetch('http://localhost:5000/update',{
                    method:'put',
                    body:JSON.stringify({id:value,status:'Active'}),
                    headers:{
                        'content-Type':'application/json'
                    }
                })
        
                update=await update.json()

                if(update.modifiedCount===1)
                    {
                        getTaskData()
                        toast.success("Task updated...")

                    }else{
                        toast.error("Something went wrong...")
                    }


            }
    

    }

    const deleteTask=async (id)=>{
        let data= await fetch(`http://localhost:5000/delete/${id}`,{
            method:'delete'
        })

        data=await data.json()

        if(data.deletedCount===1)
            {
                getTaskData()
                toast.success("Task has been deleted....")
            }else{
                toast.error("Something went wrong...")
            }
    }
  return (
    <div style={{backgroundColor:'#eff1f3'}}>
        <section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">

        <div className="card">
          <div className="card-body p-5 shadow">
            <h2 className='m-4'><i class="fa fa-check-square-o"></i> To Do List</h2>
            <form onSubmit={handleAddTask} className="d-flex justify-content-center align-items-center mb-4">
              <div  className="form-floating flex-fill">
              <input type="text" class="form-control form-control-sm" id="floatingInput" value={taskName} onChange={(e)=>setTaskName(e.target.value)}/>
              <label for="floatingInput">New Task...</label>
              </div>
              <button type="submit"  className="btn btn-primary btn-lg ms-2">Add</button>
            </form>

            
{/* 
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link " id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Active</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Completed</button>
  </li>
</ul> */}
      

            {/* <!-- Tabs content --> */}
            <div className="tab-content" id="ex1-content">
              <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"
                aria-labelledby="ex1-tab-1">
                <ul className="list-group mb-0">

                {taskData.map((item)=>
                    <div>
                    <li className="row list-group-item d-flex align-items-center  border-0 mb-2 rounded"
                      style={{backgroundColor:'#f4f6f7'}}>
                      
                      <div className={`col-11 ${item.status==='Completed'?"text-decoration-line-through":""}`}>
                      <input className="form-check-input me-2" type="checkbox" value={item._id} checked={item.status==='Completed'?true:false} onChange={handleCheckbox} aria-label="..."  />
                      {item.taskName}
                      </div>
                      <div className='col-1'>
                        <div onClick={()=>deleteTask(item._id)}><i class="fa fa-close"></i></div>
                      </div>

                      

                    

                  </li>
                  
                  </div>
                )}
                  
                 
                </ul>
              </div>
             
             
            </div>
            {/* <!-- Tabs content --> */}

          </div>
        </div>

      </div>
    </div>
  </div>
</section>
    </div>
  )
}
