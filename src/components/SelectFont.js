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
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Font</th>
            <th>Uninstall</th>
          </tr>
        </thead>
        <tbody>
          {[...this.props.initialFontList].map((x,i) =>
            <tr key={i}>
              <td>{x}</td>
              <td>
                <Button bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash"/></Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

    );
  }
}
