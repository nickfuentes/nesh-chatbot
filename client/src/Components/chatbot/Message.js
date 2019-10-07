import React from "react"
import { SSL_OP_TLS_BLOCK_PADDING_BUG } from "constants"

const Message = props => {
  return (
    <div className="col s12 m8 offset-m2 offset-l3">
      <div className="card-panel grey lighten-5 z-depth-1">
        <div className="row valign-wrapper">
          {props.speaks === "nesh" && (
            <div className="col s2">
              <a
                style={{ color: "black" }}
                class="btn-floating btn-large waves-effect waves-light yellow"
              >
                {props.speaks}
              </a>
            </div>
          )}
          <div className="col s10">
            <span className="black-text">{props.text}</span>
          </div>
          {props.speaks === "user" && (
            <div className="col s2">
              <a
                style={{ color: "black" }}
                class="btn-floating btn-large waves-effect waves-light yellow"
              >
                {props.speaks}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
