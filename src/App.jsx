import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Dictionary from "./components/Dictionary";
import Card from "./components/Card";
import Deck from "./components/Deck";

import Basic from "./assets/basic";
import New from "./assets/new";

import Icon from "@mdi/react";
import { mdiSwapHorizontal } from "@mdi/js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: Basic["U+4EBA"],
      dictionary: [],
      deck: Basic,
      decks: [Basic, New],
      deckIdx: 0,
      idx: 0
    };
  }

  onEntrySelection = entry => {
    this.setState({ entry });
  };

  onFetchDictionary = () => {
    const dictionaryRequest = new Request(
      `https://ccdb.hemiola.com/characters?fields=kDefinition,kMandarin,uvalue,string`
    );

    fetch(dictionaryRequest).then(response => {
      response.json().then(dictionary => {
        this.setState({
          dictionary
        });
      });
    });
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
    const { decks, deckIdx } = this.state;
    const newDeck = decks[deckIdx];
    const newEntry = newDeck[Object.keys(newDeck)[0]];

    this.setState({
      entry: newEntry,
      deck: newDeck
    });
  };

  onSwap = () => {
    const { deckIdx, decks } = this.state;

    const newIdx = (deckIdx + 1) % decks.length;

    this.setState(
      {
        deckIdx: newIdx
      },
      () => this.onResetDeck()
    );
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
          <div className="Swap" onClick={this.onSwap}>
            <Icon
              path={mdiSwapHorizontal}
              size={1}
              horizontal
              color="#00dbfc"
            />
          </div>

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
            onFetchDictionary={this.onFetchDictionary}
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
