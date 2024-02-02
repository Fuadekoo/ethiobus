import React from 'react'
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { axiousInstance } from '../helpers/axiousInstance';
import { useDispatch } from 'react-redux';
import { Button, Col, Row, message } from 'antd';
import { useParams } from 'react-router-dom';
import SeatsSelection from '../components/SeatsSelection';

const BookNow = () => {
  const [selectedSeats, setSelectedSeats] = React.useState([]);
    const params = useParams();
    const [bus, setBus] = React.useState(null); 
    const dispatch = useDispatch();
    const getBus = async () => {
        try {
          // Dispatch the ShowLoading action to show the loading indicator
          dispatch(ShowLoading());
          // Make a POST request to the server to get the buses data
          const response = await axiousInstance.post("/api/buses/get-bus-by-id", {
            _id:params.id,
          });
          // Dispatch the HideLoading action to hide the loading indicator
          dispatch(HideLoading());
          // If the response is successful
          if (response.data.success) {
            // this is used to set bus info
            setBus(response.data.bus);
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
        }
      };


      const bookseat = async () => {
        try {
          // Dispatch the ShowLoading action to show the loading indicator
          dispatch(ShowLoading());
          // Make a POST request to the server to get the buses data
          const response = await axiousInstance.post("/api/bookings/book-seat", {
            busId:params.id,
            seats:selectedSeats,
          });
          // Dispatch the HideLoading action to hide the loading indicator
          dispatch(HideLoading());
          // If the response is successful
          if (response.data.success) {
            message.success(response.data.message);
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          
          dispatch(HideLoading());
          message.error(error.message);
        }
      };


    React.useEffect(() => {
        getBus();
      }, []);

  return (
    <div className="container mx-auto px-4 py-8">
        <Row  className="flex flex-wrap -mx-4" gutter={20}>
            <Col lg={12} xs={24} sm={24} className="px-4 mb-4 lg:mb-0">
            {bus && <h1 className='text-sm text-violet-900 mb-2'>{bus.name}</h1>}
            {bus && <h1 className='text-sm mb-4'>{bus.from}-{bus.to}</h1>}
                <hr className='mb-2'/>
                <div className='flex flex-col gap-1'>
                    {/* this is bus information */}
                    {bus && <h1 className='text-sm'> <b>Bus Name</b>:{bus.name}</h1>}
                    {bus && <h1 className='text-sm'> <b>Bus Number</b>:{bus.number}</h1>}
                    {bus && <h1 className='text-sm'> <b>journey Date</b>:{bus.journeyDate}</h1>}
                    {bus && <h1 className='text-sm'> <b>Bus Type</b>:{bus.type}</h1>}
                    {bus && <h1 className='text-sm'> <b>Departure Time</b>:{bus.departure}</h1>}
                    {bus && <h1 className='text-sm'> <b>Arrival Time</b>:{bus.arrival}</h1>}
                    {bus && <h1 className='text-sm'> <b>total seats</b>   :{bus.capacity}</h1>}
                    {bus && <h1 className='text-sm'> <b>Seats Left</b>   :{bus.capacity - bus.seatsBooked.length}</h1>}
                    
                    {bus && <h1 className='text-sm'> <b>Price</b>:{bus.fare} birr</h1>}


                </div>
                <hr/>
              {/* this is display the selected bus seat */}
                <div className='flex flex-col gap-2'>
                  <h1 className='text-2xl'>
                    <b>selected Seats</b>:{selectedSeats.join(",")}
                  </h1>
                  <h1 className='text-2xl mt-2'><b>total price:</b> {bus && bus.fare * selectedSeats.length} BIRR</h1>
                  {/* inthis button icon the classname is disable when selected seats is 0 */}
                  <button className={`btn btn-primary ${selectedSeats.length}`} onClick={bookseat}  disabled={selectedSeats.length === 0}>book </button>
                </div>
            </Col>
            <Col lg={12} xs={24} sm={24} className="px-4">
                <SeatsSelection 
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                bus={bus}
                />
            </Col>
        </Row>
    </div>
  )
}

export default BookNow