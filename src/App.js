import React, { Component } from 'react';
import './App.css';
import {SelectFont,InstalledFonts} from './components/SelectFont.js';
import TabNav from './components/TabNav.js';

const {dialog} = window.require('electron').remote;

const elews = require('./js/websockets.js')
// const fs = electron.remote.require('fs');
// const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
  constructor() {
    super();
    this.state = {
      fonts: []
    }
    this.onMessage = this.onMessage.bind(this)
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
      this.setState({fonts: m.fonts})
      console.log(m.fonts)
    }

    console.log(m)
    console.log(elews.status(m.status) + " " , elews.type(m.type))
  }

  render() {
    return (
      <div className="App">
        <TabNav>
          <SelectFont status="danger" caption="Select Font" onClick={this.openDialog}/>
          <InstalledFonts fonts={this.state.fonts}/>
        </TabNav>
      </div>
    );
  }

  fetchFonts() {
    return ["Adobe Something","Donkey Licker","Guacamole","Donkey Licker","Guacamole","Donkey Licker","Guacamole","Donkey Licker","Guacamole","Donkey Licker","Guacamole","Donkey Licker","Guacamole","Donkey Licker","Guacamole","Donkey Licker","Guacamole","Donkey Licker","Guacamole"]
  }

  openDialog() {
    dialog.showOpenDialog({
      filters: [{
        name: "Fonts",
        extensions: ['ttf','otf']
      }]
    },function(files) {
      var mime = require('mime-types')

      if (files===undefined) {
        return
      }

      var fname = files[0]
      switch(mime.lookup(fname)) {
        case "font/opentype":
          alert("OK!")
          break;
        case "application/x-font-ttf":
          alert("OK!")
          break;
        default:
          alert("Invalid file type. Elefont only accepts TrueType and OpenType fonts")
          return
      }
    })
  }
}

export default App;
