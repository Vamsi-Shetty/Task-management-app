import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userDetails = {email, password};
        try {
            const postData = await fetch(`https://task-management-app-cvk5.onrender.com/user/login`, {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            })
            const json = await postData.json();
            if(json.token) {
                localStorage.setItem("jwt", json.token);
            }
            alert("Login Success");
            console.log(json);
        } catch (error) {
            alert("Login Failed, Check Credentials");
            console.log(error);
        }
    }

  return (
    <div className='flex flex-col'>
        <div className='text-center'>
            <h1>Login</h1>
            <h4>Please Login to use our services.</h4>
        </div>
        <div className='flex items-center justify-center align-middle border-2 rounded-md mx-auto my-6 p-5'>
            <form onSubmit={handleSubmit} className=''>
                <label htmlFor="">Email</label><br />
                <input
                 className='border-[1px]  rounded-md my-1 p-1'
                 type="text" placeholder='Enter Email Id' onChange={(e) => setEmail(e.target.value)}/><br />
                <label htmlFor="">Password</label><br />
                <input
                 className='border-[1px] rounded-md my-1 p-1'
                 type="text" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/><br />
                <button
                 className='w-full bg-black text-white border-2 rounded-md py-2'
                 type="submit">Login</button>
            </form>
        </div>
        <div className='text-center my-1'>
            <h1>Create Account. {" "}
                <Link to='/signup'
                 className='font-bold underline'
                >Signup</Link>
            </h1>
        </div>
    </div>
  )
}

export default Login