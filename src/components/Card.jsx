import React, { Component } from "react";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiShuffle, mdiChevronLeft } from "@mdi/js";

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
        <div className="arrows">
          <Icon
            onClick={() => this.props.onPrev()}
            className="arrow-icon"
            path={mdiChevronLeft}
            size={1}
            horizontal
            color="#50e5cd"
          />
          <Icon
            onClick={() => this.props.onRandom()}
            className="arrow-icon"
            path={mdiShuffle}
            size={1}
            horizontal
            color="#50e5cd"
          />
          <Icon
            onClick={() => this.props.onNext()}
            className="arrow-icon"
            path={mdiChevronRight}
            size={1}
            horizontal
            color="#50e5cd"
          />
        </div>
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
