import React, { Component } from "react";
// import axios from "axios/index";
// import Map from "google-map-react";
// import Marker from "../Marker";
import { connect } from "react-redux";
// import { api_key } from "../../config";
import { df_text_query } from "../../actions/queryActions";

import Message from "./Message";

class Chatbot extends Component {
  messagesEnd;
  constructor(props) {
    super(props);

    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this.state = {
      messages: [],
      showBot: true
    };
  }

  componentDidMount() {
    // this.df_event_query("Welcome")
    // this.props.df_event_query("Welcome");
    this.talkInput.focus();
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    if (this.talkInput) {
      this.talkInput.focus();
    }
  }

  show(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: true });
  }

  hide(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: false });
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      // console.log(this.props.queryMessages);
      return stateMessages.map((message, i) => {
        return (
          <Message
            key={i}
            speaks={message.speaks}
            text={message.msg.text.text}
          />
        );
      });
    } else {
      return null;
    }
  }

  _handleInputKeyPress(e) {
    if (e.key === "Enter") {
      this.props.df_text_query(this.props.queryMessages, e.target.value);
      e.target.value = "";
    }
  }

  render() {
    // console.log(this.props);
    if (this.state.showBot) {
      return (
        <div className="chat-view">
          <div id="chatbot">
            {this.renderMessages(this.props.queryMessages)}

            <div
              ref={el => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            >
              <div className="input-section">
                <input
                  className="chat-input"
                  ref={input => {
                    this.talkInput = input;
                  }}
                  placeholder="Ask Nesh..."
                  onKeyPress={this._handleInputKeyPress}
                  id="user_says"
                  type="text"
                />{" "}
                {/* NESH CHAT SHOW/HIDE */}
                <div
                  style={{
                    minHeight: 40,
                    // maxHeight: 500,
                    // width: 400,
                    zIndex: 100
                  }}
                >
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer"
                    }}
                    onClick={this.hide}
                  >
                    <img
                      src="robot.png"
                      width="50"
                      height="50"
                      alt="nesh"
                    ></img>
                  </button>
                </div>
                {/* END OF SHOW BUTTON */}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            minHeight: 40,
            maxHeight: 500,
            width: 400,
            position: "absolute",
            bottom: 0,
            right: 40
          }}
        >
          <ul className="right hide-on-med-and-down">
            <li>
              <button
                aria-label="Open Chat"
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer"
                }}
                onClick={this.show}
              >
                <img
                  aria-label="Open Chat"
                  src="robot.png"
                  width="50"
                  height="50"
                  alt="nesh"
                ></img>
              </button>
            </li>
          </ul>
          <div
            ref={el => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    df_text_query: (queryMessages, text) =>
      dispatch(df_text_query(queryMessages, text))
  };
};

const mapStateToProps = state => {
  return {
    text: state.query.text,
    queryMessages: state.query.messages
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbot);
