const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({

    taskName:{
        type:String,
        required:true
    },

    status:{
        type:String,
        require:true,
        default:'Active'
    }
})

module.exports=mongoose.model("tasks",taskSchema)
