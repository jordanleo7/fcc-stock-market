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
      <div className="chat">
        <p>Chat with other users on the site! (Messages are not saved)</p>
        <div className="chat--messages">
          {this.state.messages.map((message, index) => {return (<div key={index}><span className="chat--username">{message.username}:</span> {message.message}</div>)})}
        </div>
        <div>
          <form className="chat--form" onSubmit={this.handleSubmit}>
            <input className="chat--input-username" type="text" maxLength="30" placeholder="Username" name="username" value={this.state.username} onChange={this.handleInputChange} />
            <input className="chat--input-message" type="text" maxLength="200" placeholder="Message" name="message" value={this.state.message} onChange={this.handleInputChange} />
            <input className="chat--submit" type="submit" value="Send" />
          </form>
        </div>
      </div>
    )
  }

}

export default Chat
