import { Col, Row } from 'antd';
import React from 'react'
import "../resources/bus.css"

const SeatsSelection = ({
    selectedSeats,
    setSelectedSeats,
    bus
}) => {
    const capacity = bus ? bus.capacity : 0;
    const selectOrunselectSeats = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };
    

    return (
        <div className='h-half-screen overflow-y-auto' >
            <div className='bus-container'>
                <Row gutter={[10,10]}>
                    {Array.from(Array(capacity).keys()).map((seat) => {
                        // this is used to select seat
                        let seatClass= ""
                        if(selectedSeats.includes(seat+1)){
                            seatClass = "selected-seat"
                        }
                        //this code is used to filter the book seat by using color
                        else if(bus && bus.seatsBooked.includes(seat+1)){
                            seatClass = "booked-seat"
                        }
                        return (
                            // this is bus capacity is based on each bus capacity
                            <Col span={6} className="p-1">
                            <div className={`seat ${seatClass}`} onClick={()=>selectOrunselectSeats(seat+1)}>
                                {seat + 1}
                            </div>
                        </Col>
                        )
                    }
                       
                    
                    )}
                </Row>
            </div>
        </div>
    )
}

export default SeatsSelection