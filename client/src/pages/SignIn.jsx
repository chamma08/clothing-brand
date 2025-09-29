import React from 'react'
import { useState } from 'react'

export default function SignIn() {
    const[form,setForm] = useState({});
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 rounded-2xl'>
      <form className='bg-white p-6 rounded shadow-md w-80'>
        <h2 className='text-lg font-bold mb-4 text-center'>Sign In</h2>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1' htmlFor='email'>
            Email
          </label>
          <input
            className='border border-gray-300 p-2 w-full rounded'
            type='email'
            id='email'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1' htmlFor='password'>
            Password
          </label>
          <input
            className='border border-gray-300 p-2 w-full rounded'
            type='password'
            id='password'
            required
          />
        </div>
        <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
          Sign In
        </button>

        <p className='mt-4 text-sm'>
          Don't have an account?{" "}
          <a href='/signup' className='text-blue-500 hover:underline'>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  )
}
