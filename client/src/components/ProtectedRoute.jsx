import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
const {loading } = useSelector(state=>state.alerts);
const {user} = useSelector(state=>state.users);
  const navigate = useNavigate();

  const validateToken = async () => {
    
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        'http://localhost:5000/api/users/get-user-by-id',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      dispatch(HideLoading());
      if (response.data.success) {
        
        dispatch(SetUser(response.data.data));
      } else {
        
        localStorage.removeItem('token');
        message.error(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      localStorage.removeItem('token');
        message.error(error.message);
        dispatch(HideLoading());
      navigate('/login');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
    } else {
      navigate('/login');
    }
  }, []);

  return <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>;
}

export default ProtectedRoute;