import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import authService from '../../appwrite/auth';

function LogOutBtn() {
    const dispatch = useDispatch();
    
    const logOutHandler = async () => {
        await authService.logOut();
        dispatch(logout());
    };

    return (
        <button
            className='px-6 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-700'
            onClick={logOutHandler}
        >
            Log Out
        </button>
    );
}

export default LogOutBtn;
