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
    const {group, player} = this.props;
    
    var abandonButton = '';
    if (player && player.is_admin) {
      abandonButton = <div>
        <input type="button" value="Abandon Game" onClick={this.onAbandon}/>
      </div>;
    }

    var quitButton = '';
    if (group && (group.status === 'open' || group.status === 'end')) {
      quitButton = <div>
        <input type="button" value="Quit" onClick={this.props.quitAction}/>
      </div>;
    }

    return (<div style={ {border:'solid 1px black'} }>
      {abandonButton}
      {quitButton}
    </div>)
  }
}

Toolbar.propTypes = {
  group: PropTypes.object,
  player: PropTypes.object,

  abandonAction: PropTypes.func,
  quitAction: PropTypes.func
}

export default Toolbar;
