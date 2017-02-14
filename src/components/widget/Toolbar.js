import React, { Component, PropTypes } from 'react';

class Toolbar extends Component {

  constructor(props) {
    super(props);

    this.onAbandon = this.onAbandon.bind(this);
  }

  onAbandon(event) {
    const abandon = confirm('Are you sure to abandon the group? All Player will be kicked out.');
    if (abandon) {
      this.props.abandonAction();
    }
  }
  
  render() {
    const player = this.props.player;
    
    var content = '';
    if (player && player.is_admin) {
      content = <div>
        <input type="button" value="Abandon Game" onClick={this.onAbandon}/>
      </div>;
    }

    return (<div style={ {border:'solid 1px black'} }>
      {content}
    </div>)
  }
}

Toolbar.propTypes = {
  player: PropTypes.object,

  abandonAction: PropTypes.func
}

export default Toolbar;
