'use strict';

const React = require('react');

class Message extends React.Component {
    render() {
        return <div className="message">
            <h1 id="contact-me">Contact Me</h1>
            <div className="field">
                <label>Name</label>
                <input ref="name" type="text"/>
            </div>
            <div className="field">
                <label>Email</label>
                <input ref="email" type="text"/>
            </div>
            <div className="field">
                <label>Phone</label>
                <input ref="phone" type="text"/>
            </div>
            <div className="field">
                <label>Message</label>
                <textarea ref="message"/>
            </div>
            <button onClick={this.send.bind(this)}>Send</button>
        </div>
    }

    send() {
        const data = {
            name: this.refs.name.value,
            email: this.refs.email.value,
            phone: this.refs.phone.value,
            message: this.refs.message.value
        };
        console.log(data);
    }
}

module.exports = Message;