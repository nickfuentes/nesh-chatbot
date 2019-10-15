import React, { Component } from "react";
import "./chatbot.css";
import { connect } from "react-redux";
import { df_text_query } from "../../actions/queryActions";
import { CSSTransition } from "react-transition-group";

import Message from "./Message";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

class Chatbot extends Component {
  messagesEnd;
  constructor(props) {
    super(props);

    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this._toggleListen = this._toggleListen.bind(this);
    this._handleListen = this._handleListen.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this.state = {
      messages: [],
      showBot: true,
      listening: false
    };
  }

  componentDidMount() {
    // this.df_event_query("Welcome")
    // this.props.df_event_query("Welcome");
    // this._toggleListen();
    this.talkInput.focus();
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    if (this.talkInput) {
      this.talkInput.focus();
    }
    // if (this.state.listening === false) {
    //   this._toggleListen();
    // }
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
        if (stateMessages.length - 1 === i && message.speaks === "nesh") {
          speechSynthesis.speak(
            new SpeechSynthesisUtterance(message.msg.text.text)
          );
        }
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

  _toggleListen() {
    this.setState(
      {
        listening: !this.state.listening
      },
      this._handleListen
    );
  }

  _handleListen() {
    console.log("listening?", this.state.listening);

    if (this.state.listening) {
      recognition.start();
      recognition.onend = () => {
        console.log("...continue listening...");
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log("Stopped listening per click");
      };
      // this._toggleListen();
    }

    recognition.onstart = () => {
      console.log("Listening!");
    };

    let finalTranscript = "";
    recognition.onresult = event => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        else interimTranscript += transcript;
      }

      const transcriptArr = finalTranscript.split(" ");
      const stopCmd = transcriptArr.slice(-3, -1);
      console.log("stopCmd", stopCmd);

      if (stopCmd[0] === "send" && stopCmd[1] === "request") {
        recognition.stop();
        recognition.onend = () => {
          console.log("Stopped listening per command");
          const finalText = transcriptArr.slice(0, -3).join(" ");
          // const removeIntro = finalText.split("computer ");
          // const submittedText = removeIntro[1].charAt(0).toUpperCase() + removeIntro[1].substring(1);
          const submittedText =
            finalText.charAt(0).toUpperCase() + finalText.substring(1);
          this.props.df_text_query(this.props.queryMessages, submittedText);
          this.setState({ listening: !this.state.listening });
        };
      } else if (stopCmd[0] === "send" || stopCmd[1] === "send") {
        recognition.stop();
        recognition.onend = () => {
          console.log("Stopped listening per command");
          const finalText = transcriptArr.slice(0, -2).join(" ");
          // const removeIntro = finalText.split("computer ");
          // const submittedText =
          //   removeIntro[1].charAt(0).toUpperCase() +
          //   removeIntro[1].substring(1);
          const submittedText =
            finalText.charAt(0).toUpperCase() + finalText.substring(1);
          this.props.df_text_query(this.props.queryMessages, submittedText);
          this.setState({ listening: !this.state.listening });
        };
      }

      recognition.onerror = event => {
        console.log("Error occured in recognition: " + event.error);
      };
    };
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
        <CSSTransition
          in={this.showBot}
          appear={true}
          timeout={1000}
          classNames="fade"
        >
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
                    // onClick={this._toggleListen}
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
        </CSSTransition>
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
