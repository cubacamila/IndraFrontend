import React, { Component } from 'react';
import config from 'IndraReactCommon/config';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

class DebugMenu extends Component {

  constructor(props){
    super(props);
    const {location} = this.props;
    this.debug_url = config.DEBUG_URL;
    this.state = {
      menu: {},
      EXEC_KEY: location.pathname.substr(13)
    };
  }

  async componentDidMount() {
    try {
      const menu = await axios.get(`${this.debug_url}`);
      this.setState({
        menu: menu.data
      })
    } catch (e) {
    }
  }
  
  MenuItem = (i, text, url, key) => {
    /**
     * All models will have all the menu items appear on the page.
     * However, we keep one of the graphs (Population graph or Scatter plot)
     * disabled based on "graph" field from models.json
    **/
    const { history } = this.props;
    const { EXEC_KEY } = this.state;
    return (
      <ListGroup.Item
        className="w-50 p-3 list-group-item list-group-item-action"
        as="li"
        key={key}
      >
        {text}
      </ListGroup.Item>
    );
  };

  renderMapItem = () => {
    const { menu } = this.state;
    return (
      <div className="row margin-bottom-80">
        <div className="col w-25">
          <ListGroup>
            {Object.keys(menu).map((id, i) => (
            parseInt(id) > 1
              ? this.MenuItem(
                i,
                menu[id].question,
                menu[id].url,
                i
              )
              : null))}
          </ListGroup>
        </div>
      </div>
    );
  };

  render() {
    console.log(this.state.menu);
    return (
      <div>
        <h1 className="header">Debug menu</h1>
        <div>
        </div>
        <ul className="list-group">
          <div className="row">
          </div>
        </ul>
        {this.renderMapItem()}
      </div>
    );
  }
}

export default DebugMenu;
