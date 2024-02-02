import React, { useEffect, useState } from 'react';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { axiousInstance } from '../../helpers/axiousInstance';
import { useDispatch } from 'react-redux';
import { Col, Row, message } from 'antd';
import Bus from '../../components/Bus';

const UserHome = () => {
    const dispatch = useDispatch();
    const [buses, setBuses] = React.useState([]); 
    const [showPopup, setShowPopup] = useState(true);

    const handlePopupClose = () => {
        setShowPopup(false);
    };
    const getBuses = async () => {
        try {
          // Dispatch the ShowLoading action to show the loading indicator
          dispatch(ShowLoading());
          // Make a POST request to the server to get the buses data
          const response = await axiousInstance.post("/api/buses/get-buses", {});
          // Dispatch the HideLoading action to hide the loading indicator
          dispatch(HideLoading());
          // If the response is successful
          if (response.data.success) {
            setBuses(response.data.buses);
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };
      useEffect(() => {
        getBuses();
      }, []);

    return (
        <div className="relative">
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black opacity-50 w-full h-full absolute"></div>
                    <div className="bg-white p-6 rounded shadow-lg z-50 m-4">
                        <h2 className="text-xl font-bold mb-4">Rules and Regulations</h2>
                        <p className="mb-4">Here are the rules and regulations for the bus system.</p>
                        <button onClick={handlePopupClose} className='btn btn-primary'>OK</button>
                    </div>
                </div>
            )}

            <div className="user-info">
                {/* Display user information here */}
                <div></div>
                <div>
                    <Row>
                      {/* this is used to display all bus info in table */}
                        {buses.map(bus=>(
                             <Col lg={12} xs={24} sm={24}>
                             <Bus bus={bus}/>
                             </Col>
                        )
                           
                        )}


                    </Row>
                </div>
            </div>
        </div>
    );
};

export default UserHome;