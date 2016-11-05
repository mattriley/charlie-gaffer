'use strict';

const React = require('react');
const _ = require('lodash');
const axios = require('axios');

class Message extends React.Component {
    render() {
        console.log(this.props);

        if (_.get(this.state, 'sent')) {
            return <div className="message">
                <form>
                    <h1 id="contact-me">Contact Me</h1>
                    Thanks for your message, I'll be in touch shortly.
                </form>
            </div>
        }

        return <div className="message">
            <form>
                <h1 id="contact-me">Contact Me</h1>
                <div id="errorMessage">{_.get(this.state, 'errorMessage')}</div>
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
                <button type="button" onClick={this.send.bind(this)}>Send</button>
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

        const isValid = this.validate(data);

        if (!isValid) return;

        axios({
            url: this.props.apiUrl + '/messages',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            method: "post",
            data: data
            // body: JSON.stringify(data)
        })
            .then(res => {
                console.log(res);
                this.setState({sent: true});
            })
            .catch(res => {
                console.log(res)
            });
    }

    validate(data) {
        if (isBlank(data.message, 'name')) {
            this.setState({errorMessage: 'Name is required'});
            return false;
        }
        if (isBlank(data.message, 'email')) {
            this.setState({errorMessage: 'Email is required'});
            return false;
        }
        if (!isEmail(data.message.email)) {
            this.setState({errorMessage: 'Email must contain @'});
            return false;
        }
        if (isBlank(data.message, 'body')) {
            this.setState({errorMessage: 'Message is required'});
            return false;
        }
        if (isBlank(data, 'grecaptchaResponse')) {
            this.setState({errorMessage: "Please prove you're not a robot"});
            return false;
        }

        this.setState({errorMessage: null});

        return true;
    }
}

function isBlank(obj, path) {
    return _.get(obj, path).trim() === '';
}

function isEmail(value) {
    return value.indexOf('@') !== -1;
}

module.exports = Message;