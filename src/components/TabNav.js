import React, {Component} from 'react';
import { Tabs, Tab } from 'react-bootstrap';

class TabNav extends Component {
  render() {
    return (
      <Tabs defaultActiveKey={1} id="tab-navigation-elefont">
        <Tab eventKey={1} title="Install new font">
          {this.props.children[0]}
        </Tab>
        <Tab eventKey={2} title="Installed fonts">
          {this.props.children[1]}
        </Tab>
      </Tabs>
    )
  }
}
export default TabNav;
