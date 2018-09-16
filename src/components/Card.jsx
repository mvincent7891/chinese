import React, { Component } from "react";

import "./Card.css";

class Card extends Component {
  render() {
    const { kMandarin, string, kDefinition } = this.props.entry;
    return (
      <div className="Card">
        <div className="string">{string}</div>
        <div className="label">PINYIN</div>
        <div className="pinyin">{kMandarin}</div>
        <div className="label">DEFINITION</div>
        <div className="definition">{kDefinition}</div>
        <div
          className="footer"
          onClick={() => this.props.onAdditionToDeck(this.props.entry)}
        >
          Add to Deck
        </div>
      </div>
    );
  }
}

export default Card;
