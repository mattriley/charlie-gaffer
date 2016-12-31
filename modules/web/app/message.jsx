'use strict';

const React = require('react');
const _ = require('lodash');
const axios = require('axios');

class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            errorMessages: []
        }
    }

    render() {
        if (this.isStatus('sent')) {
            return <div className="message">
                <form>
                    <h1 id="contact-me">Contact Me</h1>
                    Thanks for your message, I'll be in touch shortly.
                </form>
            </div>
        }

        const errorMessages = this.state.errorMessages.map(errorMessage => {
            return <div>{errorMessage}</div>;
        });

        const sendButton = this.isStatus('sending') ? <span><img src="/images/ajax-loader.gif"/> Sending...</span> :
            <button type="button" onClick={this.send.bind(this)}>Send</button>;

        return <div className="message">
            <form>
                <h1 id="contact-me">Contact Me</h1>
                <p>Van Package available</p>
                <div id="errorMessage">{errorMessages}</div>
                <br/>
                <div className="field">
                    <label>Name</label>
                    <input ref="name" type="text" required/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input ref="email" type="email" required="required"/>
                </div>
                <div className="field">
                    <label>Phone</label>
                    <input ref="phone" type="tel"/>
                </div>
                <div className="field">
                    <label>Message</label>
                    <textarea ref="message" required="required"/>
                </div>
                <div className="field">
                    <div className="g-recaptcha" data-sitekey={this.props.googleRecaptchaSiteKey}></div>
                </div>
                {sendButton}
            </form>
        </div>
    }

    send() {
        const data = {
            message: {
                name: this.refs.name.value,
                email: this.refs.email.value,
                phone: this.refs.phone.value,
                body: this.refs.message.value,
            },
            grecaptchaResponse: grecaptcha.getResponse()
        };

        const isValid = this.validateData(data);

        if (!isValid) return;

        this.setStatus('sending');

        axios({
            url: this.props.apiUrl + '/messages',
            method: 'post',
            data: data
        })
            .then(() => {
                this.setStatus('sent');
            })
            .catch(() => {
                this.setStatus('error');
                this.setErrorMessages(['Sorry, an unexpected error occurred. Please try again later.'])
            });
    }

    getErrorMessages(data) {
        const validations = [
            {
                fn: () => !isBlank(data.message, 'name'),
                errorMessage: 'Name is required'
            },
            {
                fn: () => !isBlank(data.message, 'email'),
                errorMessage: 'Email is required'
            },
            {
                fn: () => !isEmail(data.message.email),
                errorMessage: 'Email must contain @'
            },
            {
                fn: () => !isBlank(data.message, 'body'),
                errorMessage: 'Message is required'
            },
            {
                fn: () => !isBlank(data, 'grecaptchaResponse'),
                errorMessage: "Please prove you're not a robot"
            }
        ];

        return validations.reduce((memo, item) => {
            const isValid = item.fn();
            if (!isValid) memo.push(item.errorMessage);
            return memo;
        }, []);
    }

    validateData(data) {
        const errorMessages = this.getErrorMessages(data);
        this.setErrorMessages(errorMessages);
        return errorMessages.length === 0;
    }

    isStatus(status) {
        return _.get(this.state, 'status') === status;
    }

    setStatus(status) {
        this.setState({status});
    }

    setErrorMessages(errorMessages) {
        this.setState({errorMessages});
    }

}

function isBlank(obj, path) {
    return _.get(obj, path).trim() === '';
}

function isEmail(value) {
    return value.indexOf('@') !== -1;
}

module.exports = Message;