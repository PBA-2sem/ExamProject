import React from 'react';

export default function Modal(props) {

    let list = props.cars.map((c, idx) => {
        return <li key={idx}>{c.car_type_name}| seats: {c.amount_of_seats} | seats booked: {c.amount_of_seats_taken} | origin: {c.origin} <button id={c.car_id} onClick={props.handleBookCar}>book</button></li>
    })

  return (
      <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
            {props.event.name ? (
                <h5 className="modal-title" id="exampleModalLongTitle">{props.event.name + " | " + props.event.date + " | " + props.event.amount_of_people + " people"}</h5>
                ) : (
                <h5 className="modal-title" id="exampleModalLongTitle">No event</h5>
            )}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
            {JSON.stringify(props.event.description)}
            <hr></hr>
            Book yourself on one of the following cars
            <hr></hr>
            <ul>
                {list}
            </ul>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>
  );
}