import React, { Component } from 'react';

class ChatRoom extends Component{
    constructor(){
        super();
        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            message: '',
            messages: [
                {id: 0, text: 'hola'},
                {id: 1, text: 'que tal'},
                {id: 2, text: 'como estas'}
            ]
        }
    }

    updateMessage(e){
        this.setState({
            message: e.target.value
        })
    }

    sendMessage(){
        const message = {
            id: this.state.messages.length,
            text: this.state.message
        }

        let listMessages = this.state.messages;
        listMessages.push(message);
        this.setState({
            messages: listMessages
        })

        this.setState({message: ""})
    }

    render(){
        const currentMessages = this.state.messages.map((message, i) => {
            return(
                <li className="list-group-item list-group-item-action" key={message.id}>{message.text}</li>
            )
        })

        return(
            <div className="card">
                <div className="card-body">
                    <ul className="list-group">
                        {currentMessages}
                    </ul>
                </div>
                <div className="card-footer">
                    <input type="text" className="form-control" placeholder="Escribe tu mensaje..." onChange={this.updateMessage} value={this.state.message} />
                    <button className="btn btn-primary btn-block mt-3" onClick={this.sendMessage}>Enviar</button>
                </div>
            </div>
        )
    }
}

export default ChatRoom;