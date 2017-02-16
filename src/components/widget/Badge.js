import React, { Component, PropTypes } from 'react';
import Measure from 'react-measure';
import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';

class Badge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: -1,
      height: -1
    };
  }

  render() {
    const {width, height} = this.state;
    const size = Math.max(width, height);
    const style = {
      width: size,
      height: size,
      background: this.props.color || '#EEE',
      borderRadius: '50%',
      textAlign: 'center'
    };

    return (
      <Box>
        <Measure
          onMeasure={(dimensions) => {
            this.setState(dimensions)
          }}>
            <div style={style}>
              <div style={{margin: this.props.margin || 5}}>
              <Value value={this.props.value.toString()} size={this.props.size || "large"}/>
              </div>
            </div>
        </Measure>
      </Box>
    );
  }
}

Badge.propTypes = {
  value: PropTypes.any.isRequired,
  size: PropTypes.string,
  margin: PropTypes.number,
  color: PropTypes.string
}

export default Badge;