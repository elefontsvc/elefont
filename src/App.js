import React, { Component } from 'react';
import './App.css';
import {SelectFont,InstalledFonts} from './components/SelectFont.js';
import TabNav from './components/TabNav.js';
import Message from './components/Message.js';
const {dialog} = window.require('electron').remote;

const elews = require('./js/websockets.js')
// const fs = electron.remote.require('fs');
// const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
  constructor() {
    super();
    this.state = {
      fonts: [],
      fontselection: {
        status: "danger",
        caption: "Select Font"
      },
      message: {
        show: false,
        level: "info",
        message: ""
      }
    }
    this.onMessage = this.onMessage.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount() {
    elews.connect(this.openedSocket,this.closedSocket,this.onMessage)
  }

  openedSocket(ev) {
    console.log("connection opened")
    elews.send(JSON.stringify({version: 1, type: elews.GETFONT, message: "", status: elews.STATUSOK}))
  }
  closedSocket(ev) {
    console.log("connection closed")
  }

  onMessage(ev) {
    var m = JSON.parse(ev.data)

    if (m.type===elews.GETFONT && m.status === elews.STATUSOK) {
      if (m.fonts === undefined) {
        this.setState({fonts: []})
        return
      }
      // console.log("rcv fonts: " + m.fonts)
      this.setState({fonts: m.fonts})
      return
    }

    if (m.type===elews.DELFONT) {
      this.setState({message: {level: elews.bootstrap(m.status), show: true, message: m.message}})
      if (m.status === elews.STATUSOK) {
        elews.send(JSON.stringify({version: 1, type: elews.GETFONT, message: "", status: elews.STATUSOK}))
      }
    }

    if (m.type === elews.ADDFONT) {
      this.setState({fontselection: {status: "danger", caption: this.state.fontselection.caption}})
      this.setState({message: {level: elews.bootstrap(m.status), show: true, message: m.message}})

      //Update the font list
      if (m.status === elews.STATUSOK) {
        elews.send(JSON.stringify({version: 1, type: elews.GETFONT, message: "", status: elews.STATUSOK}))
      }
    }
  }

  render() {
    return (
      <div className="App">
        <TabNav>
          <SelectFont status={this.state.fontselection.status} caption={this.state.fontselection.caption} onClick={this.openDialog}/>
          <InstalledFonts fonts={this.state.fonts} onClick={this.delFont}/>
        </TabNav>
        <Message show={this.state.message.show} level={this.state.message.level} message={this.state.message.message}/>
      </div>
    );
  }
  validate(files) {
    var mime = require('mime-types')

    if (files===undefined) {
      return
    }
    var fname = files[0]
    this.setState({fontselection: {status: "success", caption: this.state.fontselection.caption}})
    switch(mime.lookup(fname)) {
      case "font/opentype":
      case "application/x-font-ttf":
        this.setState({message: {level: "info", message: "Installing font", show:true}})
        break;
      default:
        this.setState({message: {level: "warning", message: "Invalid file type, elefont only accepts TrueType and OpenFont file types", show: true}})
        return
    }
    var addfont_msg = {version: 1, type: elews.ADDFONT, status: elews.STATUSOK, fonts: [{id: "0", path: fname, name: "unknown"}]}
    elews.send(JSON.stringify(addfont_msg))
  }
  openDialog() {
    dialog.showOpenDialog({
      filters: [{
        name: "Fonts",
        extensions: ['ttf','otf']
      }]
    },this.validate)
  }
  delFont(id,ev) {
    var rm_font = {version: 1, type: elews.DELFONT, status: elews.STATUSOK, fonts: [{id: id}]}
    elews.send(JSON.stringify(rm_font))
  }
}

export default App;
