import React, {useState} from 'react';
import axios from 'axios';

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userDetails = {name, email, password};
        try {
            const postData = await fetch(`https://task-management-app-cvk5.onrender.com/user/signup`, {
                                        method:"POST",
                                        headers:{
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(userDetails)
                                    })
            const json =await postData.json();
            alert("Signup Successful!");
            console.log(json);
        } catch (error) {
            console.log(error);
            alert("Signup Failed!");
        }
    }

  return (
    <div>
        <div className='intro-div'>
            <h1>Create Account</h1>
            <h4>Please signup to use our services.</h4>
        </div>
        <div className='signup-div'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)}/><br />
                <input type="text" placeholder='Enter Email Id' onChange={(e) => setEmail(e.target.value)}/><br />
                <input type="text" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/><br />
                <button type="submit">Signup</button>
            </form>
        </div>
    </div>
  )
}

export default Signup