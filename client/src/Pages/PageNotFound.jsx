import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='text-center'>
        <h1>Oops! The page you are looking is missing.</h1>
        <p>Goto {" "} 
            <Link className='underline font-bold' to='/'>Homepage</Link></p>
    </div>
  )
}

export default PageNotFound