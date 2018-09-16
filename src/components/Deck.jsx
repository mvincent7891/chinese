import React, { Component } from "react";
import "./Deck.css";
import Icon from "@mdi/react";
import { mdiShuffle, mdiRefresh } from "@mdi/js";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: props.deck,
      idx: 0
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      deck: props.deck
    };
  };

  onNext = () => {
    const { idx, deck } = this.state;
    const keys = Object.keys(deck);
    const nextIdx = (idx + 1) % (keys.length || 1);

    this.setState({
      idx: nextIdx
    });

    const entry = deck[keys[nextIdx]];
    if (!entry) {
      return;
    }
    this.props.onNextCard(entry);
  };

  onRandom = () => {
    const { deck } = this.state;
    const keys = Object.keys(deck);
    const nextIdx = Math.floor(Math.random() * keys.length);

    this.setState({
      idx: nextIdx
    });

    const entry = deck[keys[nextIdx]];
    if (!entry) {
      return;
    }
    this.props.onNextCard(entry);
  };

  render() {
    const { deck } = this.state;
    return (
      <div>
        <div className="Deck">
          <div onClick={this.onNext}>
            <small>Deck</small>
            <div>{Object.keys(deck).length}</div>
          </div>
          <div className="clear" onClick={this.props.onClearDeck}>
            <small>Clear</small>
          </div>
        </div>
        <div className="Shuffle" onClick={this.onRandom}>
          <Icon path={mdiShuffle} size={1} horizontal color="#50e5cd" />
        </div>
        <div className="Shuffle Refresh" onClick={this.props.onResetDeck}>
          <Icon path={mdiRefresh} size={1} horizontal color="#50e5cd" />
        </div>
      </div>
    );
  }
}

export default Deck;
