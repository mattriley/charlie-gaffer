'use strict';

const React = require('react');
const _ = require('lodash');
const axios = require('axios');

class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
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
                    <input name="name" type="text" value={this.state.name} onChange={this._fieldChanged.bind(this)}/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input name="email" type="email" value={this.state.email} onChange={this._fieldChanged.bind(this)}/>
                </div>
                <div className="field">
                    <label>Phone</label>
                    <input name="phone" type="tel" value={this.state.phone} onChange={this._fieldChanged.bind(this)}/>
                </div>
                <div className="field">
                    <label>Message</label>
                    <textarea name="message" value={this.state.message} onChange={this._fieldChanged.bind(this)}/>
                </div>
                <div className="field">
                    <div className="g-recaptcha" data-sitekey={this.props.googleRecaptchaSiteKey}></div>
                </div>
                {sendButton}
            </form>
        </div>
    }

    _fieldChanged(e) {
        const name = e.target.getAttribute('name');
        this.setState({[name]: e.target.value}, () => this.validateField(name));
    }

    send() {
        this.setState({grecaptchaResponse: grecaptcha.getResponse()}, () => {
            const errorMessages = this.getErrorMessages({});
            const isValid = errorMessages.length === 0;
            this.setState({errorMessages});

            if (!isValid) return;

            this.setState({status: 'sending'});

            const data = {
                message: {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    body: this.state.message
                },
                grecaptchaResponse: this.state.grecaptchaResponse
            };

            axios({
                url: this.props.apiUrl + '/messages',
                method: 'post',
                data: data
            })
                .then(() => {
                    this.setState({status: 'sent'});
                })
                .catch(() => {
                    this.setState({status: 'error'});
                    this.setState({errorMessages: ['Sorry, an unexpected error occurred. Please try again later.']});
                });
        });
    }

    validateField(field) {
        const errorMessages = this.getErrorMessages({field});
        this.setState({errorMessages});
    }

    validate() {
        const errorMessages = this.getErrorMessages({});
        this.setState({errorMessages});
        return errorMessages.length === 0;
    }

    getErrorMessages(params) {
        const validations = [
            {
                field: 'name',
                fn: () => !isBlank(this.state.name),
                errorMessage: 'Name is required'
            },
            {
                field: 'email',
                fn: () => !isBlank(this.state.email),
                errorMessage: 'Email is required'
            },
            {
                field: 'email',
                fn: () => isEmail(this.state.email),
                errorMessage: 'Email must contain @'
            },
            {
                field: 'message',
                fn: () => !isBlank(this.state.message),
                errorMessage: 'Message is required'
            },
            {
                fn: () => !isBlank(this.state.grecaptchaResponse),
                errorMessage: "Please prove you're not a robot"
            }
        ];

        const filteredValidations = params.field ?
            validations.filter(item => item.field === params.field) : validations;

        return filteredValidations.reduce((memo, item) => {
            const isValid = item.fn();
            if (!isValid) memo.push(item.errorMessage);
            return memo;
        }, []);
    }

    isStatus(status) {
        return _.get(this.state, 'status') === status;
    }

}

function isBlank(obj) {
    return obj.trim() === '';
}

function isEmail(value) {
    return value.indexOf('@') !== -1;
}

module.exports = Message;