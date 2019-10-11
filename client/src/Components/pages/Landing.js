import React from "react";
import Map from '../Map';
import { connect } from 'react-redux';
import TopTenCumBOE from '../TopTenCum';

const Landing = (props) => {
  const comp = props.compType
  console.log(comp)
  if (comp == 'cumBoe') {
    return (
      <div>
        <TopTenCumBOE />
      </div>
    );
  } else if (comp == 'Map') {
    return (
      <div>
        <Map/>
      </div>
    );
  } else {
    return null
  }
};

const mapStateToProps = state => {
  return {
    compType: state.query.compType
  }
}

export default connect(mapStateToProps)(Landing);
