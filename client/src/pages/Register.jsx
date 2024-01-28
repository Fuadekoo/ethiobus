import React from 'react';
import { Form ,message} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useDispatch} from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const Register = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/register",values);
      dispatch(HideLoading());
      if(response.data.success){
        message.success(response.data.message);
      }else{
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
      
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Register page</h1>
      <Form layout='vertical' onFinish={onFinish} className='flex flex-col gap-4'>
        <Form.Item  name='name'  className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'>
          <input
            type='text'
            className=' border-none rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Enter your name'
          />
        </Form.Item>
        <Form.Item  name='phone'  className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'>
          <input
            type='number'
            className='border-none p-3 rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Enter your phone number'
          />
        </Form.Item>
        <Form.Item  name='password'  className='border p-3 rounded-lg focus:outline-none focus:border-blue-500'>
          <input
            type='password'
            className='border-none p-3 rounded-lg focus:outline-none focus:border-blue-500'
            placeholder='Enter your password'
          />
        </Form.Item>
        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          type='submit'
        >
          Register
        </button>
      </Form>
      <div className='flex gap-2 mt-5'>
        <p>Do you  have an account?</p>
        <Link to='/Login' className='text-blue-700'>
          Log in
        </Link>
      </div>
      <p>Error</p>
    </div>
  );
};

export default Register;
