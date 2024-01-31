// import the nessesary dependencies
import React from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { Table, message } from "antd";
import { axiousInstance } from "../../helpers/axiousInstance";
import moment from "moment";
import { Modal } from 'antd';

// this is a function for admin buses
function AdminBuses() {
  // Use the useDispatch hook to get the Redux dispatch function
  const dispatch = useDispatch();
  //Define state variables for the buses data and the visibility of the bus form
  const [buses, setBuses] = React.useState([]);
  const [showBusForm, setShowBusForm] = React.useState(false);
  const [selectedBus, setSelectedBus] = React.useState(null);

  // Define an asynchronous function to fetch the buses data from the server
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

  // Define an asynchronous function to delete a bus
const deleteBus = (id) => {
  Modal.confirm({
    title: 'Are you sure you want to delete this bus?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: async () => {
      try {
        // Dispatch the ShowLoading action to show the loading indicator
        dispatch(ShowLoading());
        // Make a DELETE request to the server to delete the bus
        const response = await axiousInstance.delete(`/api/buses/delete-bus/${id}`);
        // Dispatch the HideLoading action to hide the loading indicator
        dispatch(HideLoading());
        // If the response is successful
        if (response.data.success) {
          message.success(response.data.message);
          getBuses();
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    },
  });
};


  // this is a table for buses 
  const columns = [
    {title: "Bus Name", dataIndex: "name", key: "name"},
    {title: "Bus Number", dataIndex: "number", key: "number"},
    {title: "Capacity", dataIndex: "capacity", key: "capacity"},
    {title: "From", dataIndex: "from", key: "from"},
    {title: "To", dataIndex: "to", key: "to"},
    {title: "Journey Date", dataIndex: "journeyDate", key: "journeyDate",render: (journeyDate)=>moment(journeyDate).format("DD-MM-YYYY") },
    {title: "Departure Time", dataIndex: "departure", key: "departure", render: (departure)=>moment(departure).format("hh:mm A")},
    {title: "Arrival Time", dataIndex: "arrival", key: "arrival", render: (arrival)=>moment(arrival).format("hh:mm A")},
    {title: "status", dataIndex: "status", key: "status"},
    {title: "Action", dataIndex: "action", key: "action", render: (text, record) => (
      <div className="d-flex gap-3">
        <i class="ri-delete-bin-line" onClick={()=>{
          deleteBus(record._id);
        }}></i>
        <i class="ri-pencil-line" onClick={()=>{
          setSelectedBus(record);
          setShowBusForm(true);
        }}></i>
      </div>
      
    )},

  ];

// Use the useEffect hook to fetch the buses data when the component mounts
  React.useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <div className="d-flex justify-between">
        <PageTitle title={"buses"} />
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowBusForm(true);
          }}
        >
          Add Bus
        </button>
      </div>

      <Table columns={columns} dataSource={buses}/>
      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus? "edit":"add"}
          selectedBus={selectedBus}
          setSelectedBus={setSelectedBus}
          getData={getBuses}
        />
      )}
    </div>
  );
}

export default AdminBuses;
