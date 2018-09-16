import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dictionary from "./components/Dictionary";
import Card from "./components/Card";
import Deck from "./components/Deck";

import Basic from "./assets/basic";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {
        kDefinition: "confusion, state of chaos, revolt",
        kMandarin: "LUAN4",
        uvalue: "U+4E71",
        string: "\u4e71"
      },
      dictionary: [],
      deck: Basic
    };

    const dictionaryRequest = new Request(
      `http://ccdb.hemiola.com/characters?fields=kDefinition,kMandarin,uvalue,string`
    );

    fetch(dictionaryRequest).then(response => {
      response.json().then(dictionary => {
        this.setState({
          dictionary
        });
      });
    });
  }

  onEntrySelection = entry => {
    this.setState({ entry });
  };

  onAdditionToDeck = entry => {
    const { deck } = this.state;
    this.setState({
      deck: {
        [entry.uvalue]: entry,
        ...deck
      }
    });
  };

  onClearDeck = () => {
    this.setState({
      deck: {}
    });
  };

  render() {
    const { entry, dictionary, deck } = this.state;
    return (
      <div className="App">
        <Deck
          deck={deck}
          onClearDeck={this.onClearDeck}
          onNextCard={this.onEntrySelection}
        />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Learn Chinese - v1</h1>
        </header>
        <br />
        <div className="vert-container">
          <Card entry={entry} onAdditionToDeck={this.onAdditionToDeck} />
          <Dictionary
            dictionary={dictionary}
            onAdditionToDeck={this.onAdditionToDeck}
            onRowSelection={this.onEntrySelection}
          />
        </div>
        <div className="copyright">
          {`${"\u00A9"} 2018 Michael Parlato. All Rights Reserved.`}
        </div>
      </div>
    );
  }
}

export default App;
