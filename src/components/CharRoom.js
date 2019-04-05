import React, { Component } from 'react';
import firebase from "firebase";

class ChatRoom extends Component{
    constructor(){
        super();

        var config = {
            //YOUR FIREBASE DATABASE CONFIG
          };
        firebase.initializeApp(config);

        this.updateMessage = this.updateMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.state = {
            message: '',
            messages: []
        }
    }

    componentDidMount(){
        firebase.database().ref('messages/').on('value', snapshot => {
            const currentMessages = snapshot.val();
            if(currentMessages != null){
                this.setState({
                    messages: currentMessages
                })
            }
            else{

            }
        })
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

        firebase.database().ref('messages/' + message.id).set(message);

        this.setState({message: ''})
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
