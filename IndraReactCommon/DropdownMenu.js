import React, { Component } from 'react';
import sandpileImg from '../IndraReactWeb/src/components/images/Sandpile.jpg';
import sandpile1Img from '../IndraReactWeb/src/components/images/sandpile_2.png';
import mandelobrotImg from '../IndraReactWeb/src/components/images/mendelobrot_sq.jpg';
import config from 'IndraReactCommon/config.js';
import axios from 'axios';

class DropdownMenu extends Component{
 constructor(props) {
   super(props);
   this.state = {
      allItems: [],
      loadingData: false,
      apiFailed: false,
      dataForCarousel: [
        { image: sandpileImg, title: 'by Seth Terashima' },
        { image: sandpile1Img, title: 'by Colt Browninga' },
        { image: mandelobrotImg, title: 'by Adam Majewski' },
      ],
    };
    this.api_server = config.API_URL;

}
 async componentDidMount() {
    const { history } = this.props;
    try {
      this.setState({ loadingData: true });
      document.title = 'Home';
      const res = await axios.get(`${this.api_server}models?active=true`);
      this.setState({ allItems: res.data, loadingData: false });
      // setting this so model properties like name, graph etc are access
      // in all tabs of a browser
      localStorage.setItem('indra_model_details', JSON.stringify(res.data));
    } catch (e) {
      history.push('/errorCatching');
    }
  }

}

export default DropdownMenu;
 
