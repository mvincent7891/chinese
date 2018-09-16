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
      deck: Basic,
      idx: 0
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

  onNext = (step = 1) => {
    const { idx, deck } = this.state;
    const keys = Object.keys(deck);
    const nextIdx = (idx + step) % (keys.length || 1);

    const entry = deck[keys[nextIdx]];

    if (!entry) {
      return;
    }

    this.setState({
      idx: nextIdx,
      entry
    });

    this.onEntrySelection(entry);
  };

  onPrev = () => {
    this.onNext(-1);
  };

  onRandom = () => {
    const { deck } = this.state;
    const keys = Object.keys(deck);
    const nextIdx = Math.floor(Math.random() * keys.length);

    const entry = deck[keys[nextIdx]];
    if (!entry) {
      return;
    }

    this.setState({
      idx: nextIdx,
      entry
    });

    this.onEntrySelection(entry);
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

  onResetDeck = () => {
    this.setState({
      deck: Basic
    });
  };

  render() {
    const { entry, dictionary, deck, idx } = this.state;
    return (
      <div className="App">
        <Deck
          idx={idx}
          deck={deck}
          onClearDeck={this.onClearDeck}
          onNext={this.onNext}
          onRandom={this.onRandom}
          onResetDeck={this.onResetDeck}
        />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Learn Chinese - v1</h1>
        </header>
        <br />
        <div className="vert-container">
          <Card
            onRandom={this.onRandom}
            onNext={this.onNext}
            onPrev={this.onPrev}
            entry={entry}
            onAdditionToDeck={this.onAdditionToDeck}
          />
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
