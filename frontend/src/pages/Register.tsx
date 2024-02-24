import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import * as apiClient from '../api-client'

export type RegisterFormData = {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}


const Register = () => {
    const {register, watch, handleSubmit, formState:{errors}} = useForm<RegisterFormData>();

    

    const mutation = useMutation(apiClient.register, {
        onSuccess:() => {
            console.log("registration successful")
        },
        onError:(error:Error) => {
         console.log(error.message)
        }
    })
  
    const onSubmitForm = handleSubmit((data) => {
        mutation.mutate(data)
      });


  return (
    <div>
      <form  className="flex flex-col gap-5" onSubmit={onSubmitForm}>
        <h2 className='text-3xl font-bold'>Create an Account</h2>
        <div className='flex flex-col md:flex-row gap-5'>
          <label className='text-gray-700 text-sm font-bold flex-1'>
            FirstName

            <input type="text" className='border rounded w-full py-1 px-2 font-normal' 
            {...register("firstName", {required:"firstname is required"})} />
            {errors.firstName && (
                <span className='text-red-500'>{errors.firstName.message}</span>
            )}
          </label>
          <label className='text-gray-700 text-sm font-bold flex-1'>
            LastName

            <input type="text" className='border rounded w-full py-1 px-2 font-normal' {...register("lastName", {
                required:"lastname is required"
            })} />
             {errors.lastName && (
                <span className='text-red-500'>{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label className='text-gray-700 text-sm font-bold flex-1'>
            Email

            <input type="email" className='border rounded w-full py-1 px-2 font-normal' 
            {...register("email", {
                required:"email is required",
            
            })} />
             {errors.email && (
                <span className='text-red-500'>{errors.email.message}</span>
            )}
          </label>
          <label className='text-gray-700 text-sm font-bold flex-1'>
            password

            <input type="text" className='border rounded w-full py-1 px-2 font-normal' 
            {...register('password', {
                required:"email is required",
                minLength:{
                    value:6,
                    message:"password must be atleast 6 characters"
                }
            })} />
             {errors.password && (
                <span className='text-red-500'>{errors.password.message}</span>
            )}
          </label>
          <label className='text-gray-700 text-sm font-bold flex-1'>
            confirm password

            <input type="text" className='border rounded w-full py-1 px-2 font-normal' 
            {...register("confirmPassword", {
                validate:(value) => {
                    if(!value) {
                        return "this field is required"
                    } else if(watch("password") !==value) {
                        return "your passwords did not match"
                    }
                } 
            })} />
             {errors.confirmPassword && (
                <span className='text-red-500'>{errors.confirmPassword.message}</span>
            )}
          </label>
          <span>
            <button type='submit' className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>
                Create Account
            </button>
          </span>
      </form>
    </div>
  )
}

export default Register
