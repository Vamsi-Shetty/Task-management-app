import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("jwt");
  const {taskId} = useParams();

  const handleCreate = async () => {
    try {
      const taskDetails = {title, description};
      const createData = await fetch(`https://task-management-app-cvk5.onrender.com/task/create`, {
          method:"POST",
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskDetails)
      })
      console.log(createData)
      const json = await createData.json();
      alert("Task created successfuly");
      console.log(json);
    } catch (error) {
        alert("Task Creation Failed");
        console.log(error);
    }
  }

  const handleEdit = async () => {
    try {
      const taskDetails = {title, description};
      
      const patchData = await fetch(`https://task-management-app-cvk5.onrender.com/task/edit/:${taskId}`, {
          method:"PATCH",
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskDetails)
      })
      console.log(patchData)
      const json = await patchData.json();
      alert("Task updated successfuly");
      console.log(json);
    } catch (error) {
        alert("Task update Failed");
        console.log(error);
    }
  }

  const handleDelete = async () => {
    try {
      const deleteData = await fetch(`https://task-management-app-cvk5.onrender.com/task/delete/:${taskId}`, {
          method:"POST",
          headers:{
              'Content-Type': 'application/json'
          }
      })
      console.log(deleteData)
      const json = await deleteData.json();
      alert("Task deleted successfuly");
      console.log(json);
    } catch (error) {
        alert("Task delete Failed");
        console.log(error);
    }
  }

  const fetchData = async () => {
    try {
        const postData = await fetch(`https://task-management-app-cvk5.onrender.com/task`,{
          method:"GET",
          headers:{
            'Authorization':`Bearer ${token}` 
          }
        })
        const json = await postData.json();
        setTasks(tasks);
        console.log(json)
    } catch (error) {
        alert("Login Failed, Check Credentials");
        console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  },[tasks])

  return (
    <div>
      <h1>Tasks</h1>
      <div className='create-task-div'>
        <input type="text" placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder='Enter Description' onChange={(e) => setDescription(e.target.value)}/>
        <button onClick={handleCreate}>Create Task</button>
      </div>
      <div className='display-tasks-div'>
        {!tasks ? "No Tasks found" : 
          <div>
            {tasks?.map((task) => {
              <div>
                <h4>{task.title}</h4>
                <h4>{task.description}</h4>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>

            })}
          </div>}
      </div>
    </div>
  )
}

export default Tasks