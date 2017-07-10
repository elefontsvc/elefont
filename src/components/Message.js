import React, {Component} from 'react';
import { Alert} from 'react-bootstrap';

class Message extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
    this.hideMessage = this.hideMessage.bind(this)
  }
  hideMessage() {
    this.setState({show: false})
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.show === true) {
      this.setState({show:true})
      setTimeout(this.hideMessage,10000)
    }
  }
  render() {
    return (
       <Alert className={this.state.show ? '' : 'hidden'} bsStyle={this.props.level}>{this.props.message}</Alert>
    )
  }
}

export default Message
