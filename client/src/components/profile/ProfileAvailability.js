import React from 'react';
import Moment from 'react-moment';

const ProfileAvailability = props => {
    const { availability } = props;

    const availabilityItems = availability.map(item => (
        <div>
            <li key={item._id}>
                <h3>{item.department} {item.courseNum}</h3>
            </li>
            <h3>Available to Tutor: </h3>
            <Moment unix format='LLL'>{item.availableTime}</Moment>
        </div>
    ));

    return (
        <div>
            {availabilityItems.length > 0 ? (
                <ul>{availabilityItems}</ul>
            ) : (
                <p>No times available.</p>
            )}
        </div>
    );
}

export default ProfileAvailability;