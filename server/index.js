require('./DB/config')
const express=require('express')
const cors=require('cors')

const tasks=require('./Model/task')

const app=express()

app.use(express.json())
app.use(cors())

app.post("/addtask",async (req,res)=>{
    try{
        console.log(req.body)
        let addTasks=new tasks(req.body)
        addTasks=await addTasks.save()

        res.status(201).send({status:'Created'})
    }catch (err)
    {
        console.log(err)
    }

})

app.get("/taskdata",async (req,res)=>{
    try{
        let taskData=await tasks.find({})
        res.status(200).send(taskData)
    }catch(err){
        console.log(err)
    }
})

app.put('/update',async (req,res)=>{

    let updateTask=await tasks.updateOne({_id:req.body.id},{$set:{status:req.body.status}})

    res.send(updateTask)
    console.log(updateTask)

})

app.delete('/delete/:id',async (req,res)=>{
    let deleteTask=await tasks.deleteOne({_id:req.params.id})

    res.send(deleteTask)
    console.log(deleteTask)
})

app.listen(5000,()=>{
    console.log("application listening on port 5000")
})