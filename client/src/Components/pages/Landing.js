import React from "react";
import Map from '../Map';
import { connect } from 'react-redux';
import Graph from '../Graph';

const Landing = (props) => {
  const comp = props.compType
  console.log(comp)
  if (comp == '') {
    return (
      <div>
        <Graph/>
      </div>
    );
  } else if (comp == 'Map') {
    return (
      <div>
        <Map/>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    compType: state.query.compType
  }
}

export default connect(mapStateToProps)(Landing);
