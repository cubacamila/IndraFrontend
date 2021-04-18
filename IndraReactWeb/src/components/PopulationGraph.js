import React, { useState, useEffect } from 'react';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import PropType from 'prop-types';
import CardWrapper from './CardWrapper';
import axios from 'axios';
import config from 'IndraReactCommon/config';

const POPHIST_URL  = config.POPHIST_URL ;

function PopulationGraph(props) {
  const [popHist, setPopHist] = useState({});
  const { loadingData, envFile } = props;

  useEffect(() => {
    async function fetchPopHist() {
      const EXEC_KEY = envFile.exec_key;
      const res = await axios.get(`${POPHIST_URL}${EXEC_KEY}`);
      setPopHist(res.data.pops);
    }

    fetchPopHist();
  }, [props]);

  const NUM_COLORS = 7;
  const colors = ['red', 'green', 'blue', 'black', 'purple', 'magenta', 'orange'];
  let thisColor = 0;
  if (loadingData) {
    const data = [];
    console.log(popHist);
    const env = popHist;
    // populate 'data' array with groups from 'pops'
    // and their respective values
    Object.keys(env).forEach((group, iGroup) => {
      data.push({
        name: group,
        color: colors[thisColor % NUM_COLORS],
        //color: envFile.members[group]
          //? envFile.members[group].attrs.color : colors[thisColor % NUM_COLORS],
        data: {},
      });
      // modify individual 'data' dictionary of each pops
      // group by copying over value
      Object.keys(env[group]).forEach((member, iMember) => {
        data[iGroup].data[member] = env[group][iMember];
      });
      thisColor += 1;
    });
    return (
      <CardWrapper title="Population Graph">
        <LineChart data={data} width="600px" height="600px" />
      </CardWrapper>
    );
  }
  return null;
}

PopulationGraph.propTypes = {
  loadingData: PropType.bool,
  envFile: PropType.shape(),
};

PopulationGraph.defaultProps = {
  loadingData: true,
  envFile: {},
};

export default PopulationGraph;