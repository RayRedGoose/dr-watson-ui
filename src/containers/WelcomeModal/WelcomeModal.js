import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser, hasErrored } from '../../actions'
import { startConversation } from '../../apiCalls';
import './WelcomeModal.css'

export class WelcomeModal extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      feeling: '',
      error: '',
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  }

  handleSubmit = e => {
    const { firstName, lastName, feeling } = this.state;
    e.preventDefault();
    if (this.validateForm()) {
      this.props.createUser({
        id: Date.now(),
        firstName,
        lastName,
        feeling,
      });
      this.connectToChatBot();
    }
  }

  validateForm = () => {
    const { firstName, lastName, feeling } = this.state;
    if (firstName === '' && lastName === '' && feeling === '') {
      return this.setState({error: 'All information must be entered!'})
    }
    if (firstName === '' && lastName === '') {
      return this.setState({error: 'Enter first and last names!'})
    }
    if (firstName === '' && feeling === '') {
      return this.setState({error: 'Enter first name and feeling!'})
    }
    if (lastName === '' && feeling === '') {
      return this.setState({error: 'Enter last name and feeling!'})
    }
    if (firstName === '') {
      return this.setState({error: 'Enter first name!'})
    }
    if (lastName === '') {
      return this.setState({error: 'Enter last name!'})
    }
    if (feeling === '') {
      return this.setState({error: 'Choose your feeling!'})
    }
    return true;
  }

  connectToChatBot = async () => {
    try {
      const firstMessage = await startConversation(this.state.feeling);
      this.props.addMessage(firstMessage.message, false);
    } catch({ message }) {
      this.props.hasErrored(message);
    }
  }

  render() {
    const { firstName, lastName, feeling, error } = this.state;
    return (
      <form className="welcome-modal">
        <legend>Welcome to Survey Bot!  Please enter your name.</legend>
        {error && <p className="error-msg">{error}</p>}
        <label>First Name:
          <input
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
        </label>
        <label>Last Name:
        <input
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
        </label>
        <select name="feeling" value={feeling} onChange={this.handleChange}>
          <option value="">How are you feeling currently?</option>
          <option value="happy">Happy</option>
          <option value="tired">Tired</option>
          <option value="stressed">Stressed</option>
          <option value="frustrated">Frustrated</option>
        </select>
        <button onClick={this.handleSubmit}>
          Take 5 minutes to check in!
        </button>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators({ createUser, hasErrored }, dispatch)

export default connect(null, mapDispatchToProps)(WelcomeModal);
