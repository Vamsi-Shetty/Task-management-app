import React, {useState} from 'react'

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
    <div>
        <div className='intro-div'>
            <h1>Login</h1>
            <h4>Please Login to use our services.</h4>
        </div>
        <div className='signup-div'>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Email Id' onChange={(e) => setEmail(e.target.value)}/><br />
                <input type="text" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}/><br />
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login