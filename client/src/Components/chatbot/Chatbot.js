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
          {/* <nav>
            <div
              style={{
                backgroundColor: "rgba(50, 173, 222, 1)"
              }}
              className="nav-wrapper"
            >
              <a href="/" className="brand-logo">
                I'm Nesh
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.hide}>
                    Close
                  </a>
                </li>
              </ul>
            </div>
          </nav> */}

          <div id="chatbot">
            {this.renderMessages(this.props.queryMessages)}

            <div
              ref={el => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            ></div>
            <div className=" col s12">
              <input
                className="chat-input"
                ref={input => {
                  this.talkInput = input;
                }}
                placeholder="Ask Nesh..."
                onKeyPress={this._handleInputKeyPress}
                id="user_says"
                type="text"
              />
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
            right: 0,
            border: "1px solid lightgray"
          }}
        >
          <nav>
            <div
              style={{
                backgroundColor: "rgba(50, 173, 222, 1)"
              }}
              className="nav-wrapper"
            >
              <a style={{ marginLeft: "10px" }} href="/" className="brand-logo">
                I'm Nesh
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.show}>
                    Show
                  </a>
                </li>
              </ul>
            </div>
          </nav>
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
