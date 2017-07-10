import React, {Component} from 'react';
import { Button, Glyphicon , Table} from 'react-bootstrap';
import './SelectFont.css'

export class SelectFont extends Component {
  // constructor() {
  //   super();
  // }
  render() {
    return (
      <Button className="pad-top" bsStyle={this.props.status} onClick={this.props.onClick}>
        <Glyphicon glyph="folder-open" className="pad-right"/>
        {this.props.caption}
      </Button>
    );
  }
}

export class InstalledFonts extends Component {
  trimExt(name) {
    return name.split(".")[0]
  }
  trimName(name) {
    return name.split(".")[1].toUpperCase()
  }
  render() {
    return (
      <Table>
        <thead>
          <tr className="installed-fonts-headers">
            <th>Font</th>
            <th>Type</th>
            <th>Uninstall</th>
          </tr>
        </thead>
        <tbody>
          {this.props.fonts.map(item =>
            <tr key={item.id}>
              <td>{this.trimExt(item.name)}</td>
              <td>{this.trimName(item.name)}</td>
              <td><Button bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash"/></Button></td>
            </tr>
          )}
        </tbody>
      </Table>

    );
  }
}
