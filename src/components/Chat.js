import React, { Component } from 'react';
import io from 'socket.io-client';

class Chat extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      message: '',
      messages: []
    }
    this.socket = io(process.env.DOMAIN_NAME)
    this.socket.on('receive_message', data => {
      this.newMessage(data);
    })
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(data) {
    this.setState({
      messages: [...this.state.messages, data]
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.socket.emit('send_message', {
      username: this.state.username,
      message: this.state.message
    })
    this.setState({message: ''})
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.messages.map((message, index) => {return (<div key={index}>{message.username}: {message.message}</div>)})}
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleInputChange} />
            <input type="text" placeholder="Message" name="message" value={this.state.message} onChange={this.handleInputChange} />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    )
  }

}

export default Chat
