import React, { Component } from 'react';

class UserConfirm extends Component {
    componentDidMount = () => {
        const { id } = this.props.match.params;
        fetch(`http://localhost:8080/email/confirm/${id}`)
        .then(res => res.json())
        .catch(err => console.error(err));
    }


    render() {
        return (
            <div>
                <h1>Confirmed</h1>
            </div>
        )
    }
}


export default UserConfirm;