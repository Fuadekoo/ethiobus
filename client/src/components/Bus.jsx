import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bus = ({ bus }) => {
    const navigate = useNavigate();

    const handleBookingClick = () => {
        // Book the bus
        navigate(`/book-now/${bus._id}`)
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
            <h1 className='text-center'>{bus.name}</h1>
            <div className="md:flex justify-between items-end ">     
                   <div>
                   <p className=''>From</p>
                   <p className=''>{bus.from}</p>
                   </div>
                   <div>
                   <p className=''>To</p>
                   <p className=''>{bus.to}</p>
                   </div>
                   <div>
                   <p className=''>Fare</p>
                   <p className=''>{bus.fare} birr</p>
                   </div>
            </div>
            <div className="d-flex justify-between">
            <div>
                   <p className=''>Journey date</p>
                   <p className=''>{bus.journeyDate}</p>
                   </div>
                   <div className="mt-4">
                        <button onClick={handleBookingClick} className="ml-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700">Booking</button>
                    </div>
            </div>
        </div>
    );
};

export default Bus;