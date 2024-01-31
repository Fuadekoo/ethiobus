import React from 'react';
import {Modal,Form,message} from "antd";
import { TimePicker } from 'antd';
import { useDispatch} from 'react-redux';
import { axiousInstance } from '../helpers/axiousInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import moment from "moment";
//work 

function BusForm({showBusForm, setShowBusForm, type="add", getData, selectedBus, setSelectedBus}) {
    const dispatch = useDispatch();
    const onFinish = async (values)=>{
        try {
            dispatch(ShowLoading());
            let response = null;
            if(type === "add"){
                 response = await axiousInstance.post("/api/buses/add-bus",{
                  ...values,
                  journeyDate: moment(values.journeyDate).format("YYYY-MM-DD"),
                });
            }
            else{
              response = await axiousInstance.put(`/api/buses/update-bus/${selectedBus._id}`, {
                ...values,
                journeyDate: moment(values.journeyDate).format("YYYY-MM-DD"),
            });
            }
            if(response.data.success){
                message.success(response.data.message);
                getData();
            }else{
                message.error(response.data.message);
            }
            dispatch(HideLoading());
            setSelectedBus(null);
            setShowBusForm(false); 
                
            
        } catch (error) {
            message.error(error.message);
            dispatch(HideLoading());
        }
    }


    const initialValues = selectedBus ? {
      ...selectedBus,
      journeyDate: moment(selectedBus.journeyDate, 'YYYY-MM-DD'), // Convert journeyDate to a moment object
      departure: moment(selectedBus.departure, 'HH:mm'), // Convert departure to a moment object
      arrival: moment(selectedBus.arrival, 'HH:mm'), // Convert arrival to a moment object
  } : {};

    return (
        <Modal  title={type==="add" ? " Add Bus":"Update Bus"} visible={showBusForm} onCancel={() => {
           // THIS CODE IS USED FOR NULL IN ADD PC FORM AFTER SELECT THE UPDATE FORM
          setSelectedBus(null); 
        setShowBusForm(false)}} footer={false}>
  <Form layout='horizontal' onFinish={onFinish} initialValues={initialValues}>
    <div className="flex justify-between">
      <div className="flex-1 mr-4">
        <Form.Item label="Bus Name" name="name">
          <input className="border p-2 rounded w-full" type="text" name="name" id="name" />
        </Form.Item>
        <Form.Item label="Bus Number" name="number">
          <input className="border p-2 rounded w-full" type="number" name="number" id="number" />
        </Form.Item>
        <Form.Item label="Capacity" name="capacity">
          <input className="border p-2 rounded w-full" type="number" name="capacity" id="capacity" />
        </Form.Item>
      </div>
      <div className="flex-1 ml-2">
        <Form.Item label="From" name="from">
          <input className="border p-2 rounded w-full" type="text" name="from" id="from" />
        </Form.Item>
        <Form.Item label="To" name="to">
          <input className="border p-2 rounded w-full" type="text" name="to" id="to" />
        </Form.Item>
      </div>
    </div>
    <div className="flex justify-between">
      <div className="flex-1 mr-2">
        <Form.Item label="Journey Date" name="journeyDate">
          <input className="border p-2 rounded w-full" type="Date" name="journeyDate" id="journeyDate" />
        </Form.Item>
      </div>
      <div className="flex-1 ml-2">
        <Form.Item label="Departure" name="departure">
          <TimePicker  use12Hours  format="h:mm a" className="border p-2 rounded w-full"  name="departure" id="departure" />
        </Form.Item>
        
        <Form.Item label="Arrival" name="arrival">
          <TimePicker  use12Hours  format="h:mm a" className="border p-2 rounded w-full"  name="arrival" id="arrival" />
        </Form.Item>
      </div>
      <div className="flex-1 ml-2">
        <Form.Item label="type" name="type">
          <input className="border p-2 rounded w-full" type="string" name="type" id="type" />
        </Form.Item>
        <Form.Item label="Fare" name="fare">
  <input className="border p-2 rounded w-full" type="number" name="fare" id="fare" />
</Form.Item>
      </div>
    </div>
    <div className='d-flux justify-between'>
        <button className='btn btn-secondary justify-end' type='submit'>save</button>
    </div>
  </Form>
</Modal>
    )
}

export default BusForm