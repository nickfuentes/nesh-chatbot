import React from "react";

const Message = props => {
  return (
    <div className="col s12 m8 offset-m2 offset-l3">
      <div className="card-panel grey lighten-5 z-depth-1">
        <div className="row valign-wrapper">
          {/* // NESH MESSAGE */}
          {props.speaks === "nesh" && (
            <div className="col s2">
              <a
                style={{ color: "black" }}
                className="btn-floating btn-large waves-effect waves-light yellow"
              >
                {props.speaks}
              </a>
            </div>
          )}
          <div className="col s10">
            <span className="black-text">{props.text}</span>
          </div>
          {/* // USER MESSAGE */}
          {props.speaks === "user" && (
            <div className="col s2">
              <a
                style={{ color: "black" }}
                className="btn-floating btn-large waves-effect waves-light yellow"
              >
                {props.speaks}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>

    // <div className="col s12 m8 offset-m2 offset-l3">
    //   <div className="card-panel grey lighten-5 z-depth-1">
    //     <div className="row valign-wrapper">
    //       // NESH MESSAGE
    //       {props.speaks === "nesh" && (
    //         <div className="col s2">
    //           <a
    //             style={{ color: "black" }}
    //             className="btn-floating btn-large waves-effect waves-light yellow"
    //           >
    //             {props.speaks}
    //           </a>
    //         </div>
    //       )}
    //       <div className="col s10">
    //         <span className="black-text">{props.text}</span>
    //       </div>
    //       // USER MESSAGE
    //       {props.speaks === "user" && (
    //         <div className="col s2">
    //           <a
    //             style={{ color: "black" }}
    //             className="btn-floating btn-large waves-effect waves-light yellow"
    //           >
    //             {props.speaks}
    //           </a>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Message;
