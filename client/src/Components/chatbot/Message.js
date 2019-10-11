import React from "react";

const Message = props => {
  return (
    <div className="col s12 m8 offset-m2 offset-l3">
      {props.speaks === "nesh" && (
        <div className="card-panel z-depth-1 msg nesh-msg">
          <div className="row valign-wrapper msg-inside">
            <div className="col s2">
              <a
                style={{ color: "black" }}
                className="btn-floating btn-large waves-effect waves-light yellow user-pic"
              >
                {/* {props.speaks} */}
                <img className="neshbot-img" src="robot.png" alt="" />
              </a>
            </div>
            <div className="col s10">
              <span className="black-text">{props.text}</span>
            </div>
          </div>
        </div>
      )}

      {props.speaks === "user" && (
        <div className="card-panel z-depth-1 msg user-msg">
          <div className="row valign-wrapper msg-inside">
            <div className="col s10">
              <span className="white-text">{props.text}</span>
            </div>
            <div className="col s2">
              <a
                style={{ color: "black" }}
                className="btn-floating btn-large waves-effect waves-light yellow user-pic"
              >
                {props.speaks}
              </a>
            </div>
          </div>
        </div>
      )}
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
