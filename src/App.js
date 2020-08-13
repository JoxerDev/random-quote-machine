import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResult: null,
      author: '',
      text: '',
      isLoaded: false,
      bgColor: '#080f0f',
      clickCount: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.shareOnTwitter = this.shareOnTwitter.bind(this);
  }

  handleClick() {
    this.generateQuote();
    this.changeColor();
  }

  componentDidMount() {
    fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      {
        headers: {
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          apiResult: responseData.quotes,
          isLoaded: true,
          author: responseData.quotes[0].author,
          text: responseData.quotes[0].quote,
          quotesArrayLength: responseData.quotes.length
        });
      })
      .catch(error => this.setState({ error }));
  }

  generateQuote = () => {
    const chosenQuote = [];
    const quotes = this.state.apiResult;
    let randomNumber = Math.floor(
      Math.random() * this.state.apiResult.length + 1
    );

    quotes.forEach(function(element, index) {
      if (index === randomNumber) {
        chosenQuote.push(element);
      }
    });
    this.setState({
      text: chosenQuote[0].quote,
      author: chosenQuote[0].author
    });
  };

  changeColor = () => {
    const color = [
      '#472E32',
      '#41472e',
      '#0b6b9f',
      '#5f0707',
      '#864d13',
      '#144314',
      '#5c6b82'
    ];
    let i = this.state.clickCount;

    this.setState({
      clickCount: this.state.clickCount+1,
    });

    if (i<6) {
      this.setState({
        clickCount: this.state.clickCount+1,
        bgColor: color[i],
      });
    } else if (i>=6) {
      this.setState({
        bgColor: color[i],
        clickCount: 0,
      });
    } else if (i===0) {
      this.setState({
        clickCount: this.state.clickCount + 1,
        bgColor: color[i],
      })
    } else {
      this.setState({
        bgColor: "#080f0f"
      })
    }
  };

  shareOnTwitter = () => {
    // found on https://gist.github.com/McKinneyDigital/2884508#file-share-twitter-js
    var url = "twitter.com";
    let text = `${this.state.author} - ${this.state.text}`;
    window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(text),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  render() {
    return (
      <div id="wrapper">
        <style>
          {`
          :root {
            --wrapper-bg-color: ${this.state.bgColor};
            --wrapper-txt-color: ${this.state.bgColor};
            }
          `}
        </style>
        <div id="title">
          <h1>Random Quote Machine</h1>
        </div>
        <div id="quote-box">
          <div id="text">{this.state.text}</div>
          <div id="author"> - {this.state.author}</div>
          <div id="buttons">
            <button
              id="tweet-quote"
              title="Tweet out this quote!"
              onClick={this.shareOnTwitter}
            >
              Tweet Quote
            </button>
            <button id="new-quote" onClick={this.handleClick}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
