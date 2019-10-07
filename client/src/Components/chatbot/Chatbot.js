import React, { Component } from "react"
import axios from "axios/index"

import Message from "./Message"

class Chatbot extends Component {
  messagesEnd
  constructor(props) {
    super(props)

    this._handleInputKeyPress = this._handleInputKeyPress.bind(this)
    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)

    this.state = {
      messages: [],
      showBot: true
    }
  }

  async df_text_query(text) {
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: text
        }
      }
    }

    this.setState({ messages: [...this.state.messages, says] })

    const res = await axios.post("/api/df_text_query", { text })

    for (let msg of res.data[0].queryResult.fulfillmentMessages) {
      says = {
        speaks: "nesh",
        msg: msg
      }
      this.setState({ messages: [...this.state.messages, says] })
    }
  }

  async df_event_query(event) {
    const res = await axios.post("/api/df_event_query", { event })
    console.log(res)

    for (let msg of res.data[0].queryResult.fulfillmentMessages) {
      let says = {
        speaks: "nesh",
        msg: msg
      }

      this.setState({ messages: [...this.state.messages, says] })
    }
  }

  componentDidMount() {
    // this.df_event_query("Welcome")
    this.df_event_query("Welcome")
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" })
  }

  show() {
    this.setState({ showBot: true })
  }

  hide() {
    this.setState({ showBot: false })
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return (
          <Message
            key={i}
            speaks={message.speaks}
            text={message.msg.text.text}
          />
        )
      })
    } else {
      return null
    }
  }

  _handleInputKeyPress(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value)
      e.target.value = ""
    }
  }

  render() {
    return (
      <div
        style={{
          height: 500,
          width: 400,
          position: "absolute",
          bottom: 0,
          right: 0
        }}
      >
        <nav>
          <div
            style={{ backgroundColor: "rgba(50, 173, 222, 1)" }}
            className="nav-wrapper"
          >
            <a className="brand-log">
              <h1>I'm NESH</h1>
            </a>
          </div>
        </nav>
        <div
          id="chatbot"
          style={{
            minHeight: 500,
            maxHeight: 500,
            width: "100%",
            overflow: "auto"
          }}
        >
          {this.renderMessages(this.state.messages)}
          <div
            ref={el => {
              this.messagesEnd = el
            }}
            style={{ float: "left", clear: "both" }}
          ></div>
        </div>
        <div className="col s12">
          <input
            type="text"
            onKeyPress={this._handleInputKeyPress}
            placeholder="Type Here"
            style={{
              margin: 2,
              paddingLeft: "1%",
              paddingRight: "1%",
              width: "98%"
            }}
          ></input>
        </div>
      </div>
    )
  }
}

export default Chatbot
