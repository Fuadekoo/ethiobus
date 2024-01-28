import React from 'react';
import { Form,message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import axios from 'axios';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
    const onFinish = async (values) => {
      try {
        dispatch(ShowLoading());
        const response = await axios.post("http://localhost:5000/api/users/login",values);
        console.log("REsponse data is >>>>"+response.data);
        console.log(values);
        

        if(response.data.success){
          message.success(response.data.message);
          localStorage.setItem("token",response.data.data);
          navigate("/");
          dispatch(HideLoading());
        }else{
          message.error(response.data.message);
          dispatch(HideLoading());
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
        console.log("error in this part" + error.message)
        
      }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login page</h1>
      <Form layout='vertical' onFinish={onFinish} className='flex flex-col gap-4'>
        <Form.Item  name='phone'  className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'>
          <input
            type='number'
            className='border-none p-3 rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder='Enter your phone number'
          />
        </Form.Item>
        <Form.Item  name='password'  className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'>
          <input
            type='password'
            className='border-none p-3 rounded-lg focus:outline-none focus:border-blue-500 w-full'
            placeholder='Enter your password'
          />
        </Form.Item>
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          Login
        </button>
      </Form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to='/Register' className='text-blue-700'>
          Log in
        </Link>
      </div>
      <p>Error</p>
    </div>
  );
};

export default Login;
