import React, { Component } from 'react';
import './App.css';
import {SelectFont,InstalledFonts} from './components/SelectFont.js';
import TabNav from './components/TabNav.js';

const {dialog} = window.require('electron').remote;

const elews = require('./js/websockets.js')
// const fs = electron.remote.require('fs');
// const ipcRenderer  = electron.ipcRenderer;

class App extends Component {
  componentDidMount() {
    elews.connect(this.openedSocket,this.closedSocket,this.onMessage)
  }

  openedSocket(ev) {
    console.log("connection opened")
  }
  closedSocket(ev) {
    console.log("connection closed")
  }

  onMessage(ev) {
    var m = JSON.parse(ev.data)
    console.log(m)
  }

  render() {
    return (
      <div className="App">
        <TabNav>
          <SelectFont status="danger" caption="Select Font" onClick={this.openDialog}/>
          <InstalledFonts initialFontList={this.fetchFonts()}/>
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
