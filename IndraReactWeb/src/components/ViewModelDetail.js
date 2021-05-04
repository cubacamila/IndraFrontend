import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';
import propTypes from 'prop-types';
import CardWrapper from './CardWrapper';
import config from 'IndraReactCommon/config';
import axios from 'axios';

const API_URL = config.API_URL;

function ViewModelDetail(props) {
    const [data, setData] = useState({});
    const { url, EXEC_KEY } = props;
    useEffect(() => {
        async function fetchData() {
          const res = await axios.get(`${API_URL}/models/${EXEC_KEY}`);
          setData(res.data);
        }
    
        fetchData();
      }, [props, EXEC_KEY]);
    console.log(data);
    return (
        <CardWrapper title="Model Details">
          <ReactJson src={data} />
        </CardWrapper>
      );

}

export default ViewModelDetail;