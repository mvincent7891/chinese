import React, { Component } from "react";

import "./Dictionary.css";
// import Row from "./Row";

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary: props.dictionary
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    const useState = state && state.dictionary.length > 0;
    const dictionary = useState ? state.dictionary : props.dictionary;
    return {
      dictionary: dictionary
    };
  };

  getDictionaryItems = () => {
    return this.state.dictionary.slice(0, 100).map((entry, idx) => {
      return (
        <tr
          className="row"
          onClick={() => this.props.onRowSelection(entry)}
          key={`row-${idx}`}
        >
          <td className="add" onClick={event => this.addToDeck(event, entry)}>
            +
          </td>
          <td>{entry.string}</td>
          <td>{entry.kMandarin}</td>
          <td>{entry.kDefinition}</td>
        </tr>
      );
    });
  };

  addToDeck = (event, entry) => {
    event.stopPropagation();
    this.props.onAdditionToDeck(entry);
  };

  filterByDefinition = event => {
    const test = event.target.value.toLowerCase();
    const filtered = this.props.dictionary.filter(
      entry =>
        entry.kDefinition && entry.kDefinition.toLowerCase().includes(test)
    );
    this.setState({
      dictionary: filtered
    });
  };

  filterByPinyin = event => {
    const test = event.target.value.toLowerCase();
    const filtered = this.props.dictionary.filter(
      entry => entry.kMandarin && entry.kMandarin.toLowerCase().startsWith(test)
    );
    this.setState({
      dictionary: filtered
    });
  };

  render() {
    return (
      <div className="container">
        <div className="search">
          <div>
            Definition Contains: <input onChange={this.filterByDefinition} />
          </div>
          <br />
          <div>
            Pinyin: <input onChange={this.filterByPinyin} />
          </div>
          <br />
        </div>
        <table>
          <tbody className="Dictionary">{this.getDictionaryItems()}</tbody>
        </table>
      </div>
    );
  }
}

export default Dictionary;
