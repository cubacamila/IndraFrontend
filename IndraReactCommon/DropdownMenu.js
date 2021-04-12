import React, { Component } from 'react';
import sandpileImg from '../IndraReactWeb/src/components/images/Sandpile.jpg';
import sandpile1Img from '../IndraReactWeb/src/components/images/sandpile_2.png';
import mandelobrotImg from '../IndraReactWeb/src/components/images/mendelobrot_sq.jpg';
import config from 'IndraReactCommon/config.js';


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

}

export default DropdownMenu;
 
