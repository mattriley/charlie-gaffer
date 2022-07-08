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
            grecaptchaResponse: null,
            errorMessages: []
        }
    }

    render() {
        if (this._isStatus('sent')) {
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

        const sendButton = this._isStatus('sending') ? <span><img src="/images/ajax-loader.gif" /> Sending...</span> :
            <button type="button" onClick={this._sendMessage.bind(this)}>Send</button>;

        const captcha = <div className="field">
            <div className="g-recaptcha" data-sitekey={this.props.googleRecaptchaSiteKey}></div>
        </div>

        return <div className="message">
            <form>
                <h1 id="contact-me">Contact Me</h1>
                <p>Van Package available</p>
                <div id="errorMessage">{errorMessages}</div>
                <br />
                <div className="field">
                    <label>Name</label>
                    <input name="name" type="text" value={this.state.name} onChange={this._fieldChanged.bind(this)} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input name="email" type="email" value={this.state.email} onChange={this._fieldChanged.bind(this)} />
                </div>
                <div className="field">
                    <label>Phone</label>
                    <input name="phone" type="tel" value={this.state.phone} onChange={this._fieldChanged.bind(this)} />
                </div>
                <div className="field">
                    <label>Message</label>
                    <textarea name="message" value={this.state.message} onChange={this._fieldChanged.bind(this)} />
                </div>
                {captcha}
                {sendButton}
            </form>
        </div>
    }

    _fieldChanged(e) {
        const fieldName = e.target.getAttribute('name');
        this.setState({ [fieldName]: e.target.value }, () => {
            const errorMessages = this._getErrorMessages({ field: fieldName });
            this.setState({ errorMessages });
        });
    }

    _sendMessage() {
        const state = { grecaptchaResponse: grecaptcha.getResponse() };
        this.setState(state, () => {
            const errorMessages = this._getErrorMessages({});
            const isValid = errorMessages.length === 0;
            this.setState({ errorMessages });
            if (!isValid) return;

            this.setState({ status: 'sending' }, () => {
                this._postMessage().then(() => {
                    this.setState({ status: 'sent' });
                }).catch(() => {
                    this.setState({
                        status: 'error',
                        errorMessages: ['Sorry, an unexpected error occurred. Please try again later.']
                    });
                });
            });
        });
    }

    _postMessage() {
        return axios({
            url: `${this.props.apiUrl}/contact-me`,
            method: 'post',
            data: _.pick(this.state, ['name', 'email', 'phone', 'message', 'grecaptchaResponse'])
        });
    }

    _getErrorMessages(params) {
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
            }
        ];

        validations.push({
            fn: () => !isBlank(this.state.grecaptchaResponse),
            errorMessage: "Please prove you're not a robot"
        });

        const filteredValidations = params.field ?
            validations.filter(item => item.field === params.field) : validations;

        return filteredValidations.reduce((memo, item) => {
            const isValid = item.fn();
            if (!isValid) memo.push(item.errorMessage);
            return memo;
        }, []);
    }

    _isStatus(status) {
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