import React, { Component, PropTypes } from 'react';
import AppConstants from '../AppConstants'

import EntryContainer from '../containers/EntryContainer'
import CharacterListContainer from '../containers/CharacterListContainer'

class App extends Component {

	constructor(props) {
		super(props);
		this.subscription = null;
	}

	componentDidUpdate(prevProps, prevState) {
		const oldPlayerId = prevProps.playerId;
		const newPlayerId = this.props.playerId;
		
		if (oldPlayerId !== newPlayerId && newPlayerId) {
			if (this.subscription) {
				console.log(`close existing subscription for player ${oldPlayerId}`);
				this.subscription.onmessage = null;
				this.subscription.close();
			}
			console.log(`start subsription for player ${newPlayerId}`)
			this.subscription = new window.EventSource(`${AppConstants.server}/api/subscribe/${newPlayerId}`);
			this.subscription.onmessage = (message) => {
				this.props.getPlayerViewAction();
			};
		}
	}

	componentWillUnmount() {
		if (this.subscription) {
			console.log(`close existing subscription for player ${this.props.playerId}`);
			this.subscription.onmessage = null;
			this.subscription.close();
		}
	}

  render() {
  	var page;
  	const status = this.props.status;
  	if (status === 'created') {
			page = <CharacterListContainer/>;
  	} else if (status === 'open') {
  		page = 'open'	
  	} else if (status === 'started') {
  		page = 'started'	
  	} else if (status === 'voting') {
  		page = 'voting'	
  	} else if (status === 'quest') {
  		page = 'quest'	
  	} else {
			page = <EntryContainer/>;
  	}

    return (
      <div>
        {page}
      </div>
    );
  }
}

App.propTypes = {
  playerId: PropTypes.string
};

export default App;
