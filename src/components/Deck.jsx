import React, { Component } from "react";
import "./Deck.css";
import Icon from "@mdi/react";
import { mdiShuffle, mdiRefresh } from "@mdi/js";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: props.deck
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    console.log(props.deck);
    return {
      deck: props.deck
    };
  };

  onNext = () => {
    this.props.onNext();
  };

  onRandom = () => {
    this.props.onRandom();
  };

  render() {
    const { deck } = this.state;
    return (
      <div>
        <div>
          <div className="Deck" onClick={this.onNext}>
            <small>Deck</small>
            <div>{Object.keys(deck).length}</div>
          </div>
          <div className="clear" onClick={this.props.onClearDeck}>
            <small>Clear</small>
          </div>
        </div>
        <div className="Shuffle" onClick={this.onRandom}>
          <Icon path={mdiShuffle} size={1} horizontal color="#00dbfc" />
        </div>
        <div className="Shuffle Refresh" onClick={this.props.onResetDeck}>
          <Icon path={mdiRefresh} size={1} horizontal color="#00dbfc" />
        </div>
      </div>
    );
  }
}

export default Deck;
