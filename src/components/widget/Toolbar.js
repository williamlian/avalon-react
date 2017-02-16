import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import MenuIcon from 'grommet/components/icons/base/Menu';

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
      abandonButton = <Anchor label="Abandon" onClick={this.onAbandon}/>;
    }

    var quitButton = '';
    if (group && (group.status === 'open' || group.status === 'end')) {
      quitButton = <Anchor label="Quit" onClick={this.props.quitAction}/>;
    }

    return (<Box flex="shrink">
      <Header separator="bottom" size="small">
        <Title pad={{horizontal:'large'}}>Avalon</Title>
        <Box flex={true} align="end"><Title>{group && group.id}</Title></Box>
        <Menu icon={<MenuIcon/>} pad={{horizontal:'large'}} closeOnClick={true} dropAlign={{right:'right',top:'top'}}>
          {abandonButton}
          {quitButton}
        </Menu>
      </Header>
    </Box>)
  }
}

Toolbar.propTypes = {
  group: PropTypes.object,
  player: PropTypes.object,

  abandonAction: PropTypes.func,
  quitAction: PropTypes.func
}

export default Toolbar;
