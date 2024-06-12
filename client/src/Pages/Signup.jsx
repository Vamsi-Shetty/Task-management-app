import React, {useState} from 'react';
import {Link} from 'react-router-dom';
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
    <div className='flex flex-col'>
        <div className='text-center'>
            <h1>Create Account</h1>
            <h4>Please signup to use our services.</h4>
        </div>
        <div className='flex items-center justify-center align-middle border-2 rounded-md mx-auto my-6 p-5'>
            <form onSubmit={handleSubmit}>
                <label
                 htmlFor=""
                 >Name</label><br />
                <input
                 className='border-[1px] py-1 my-1 rounded-md'
                 type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)}/><br />
                <label
                 htmlFor="">Email</label><br />
                <input
                 className='border-[1px] py-1 my-1 rounded-md'
                 type="text" placeholder='Enter Email Id' onChange={(e) => setEmail(e.target.value)}/><br />
                <label htmlFor="">Password</label><br />
                <input
                 className='border-[1px] py-1 my-1 rounded-md'
                 type="text" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/><br />
                <input
                 className='w-full bg-black text-white border-2 rounded-md py-2'
                 type="button" value="Signup" />
            </form>
        </div>
        <div className='text-center'>
            <h2>Already Signed up? {" "}
                <Link to='/login'
                 className='underline font-bold'
                 >Log In</Link>
            </h2>
        </div>
    </div>
  )
}

export default Signup