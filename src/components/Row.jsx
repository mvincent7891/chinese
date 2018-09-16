import React, { Component } from "react";
import { DragSource } from "react-dnd";
import PropTypes from "prop-types";

import "./Dictionary.css";

const propTypes = {
  entry: PropTypes.object.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

const TYPES = {
  ROW: "row"
};

/**
 * Implements the drag source contract.
 */
const rowSource = {
  beginDrag(props) {
    return {
      entry: props.entry
    };
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Row extends Component {
  constructor(props) {
    this.state = {
      entry: props.entry
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      entry: props.entry
    };
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { entry } = this.state;

    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }} className="row">
        <div>{entry.string}</div>
        <div>{entry.kMandarin}</div>
        <div>{entry.kDefinition}</div>
      </div>
    );
  }
}

Row.propTypes = propTypes;

export default DragSource(TYPES.ROW, rowSource, collect)(Row);
