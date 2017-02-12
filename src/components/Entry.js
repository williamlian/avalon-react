import React, { Component, PropTypes } from 'react';

class Entry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groupId: "",
      groupSize: 5
    };

    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onJoin = this.onJoin.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  onChangeId(event) {
    this.setState({
      groupId: event.target.value
    });
  }

  onChangeSize(event) {
    this.setState({
      groupSize: event.target.value
    });
  }

  onJoin() {
    this.props.joinAction(this.state.groupId);
  }

  onCreate() {
    this.props.createAction(this.state.groupSize);
  }

	render() {
		return (
			<div>
        <div>
  				<label>Group ID: 
  				  <input type="text" value={this.state.groupId} onChange={this.onChangeId}/>
  				</label>
        </div>
        <div>
          <label>Group Size:
            <input type="text" value={this.state.groupSize} onChange={this.onChangeSize}/>
          </label>
        </div>
        <div>
          <input type="button" value="Create New Group" onClick={this.onCreate}/>
        </div>
        <div>
          <input type="button" value="Join Group" onClick={this.onJoin}/>
        </div>
			</div>
		);
	}

}

Entry.propTypes = {
	createAction: PropTypes.func.isRequired,
	joinAction: PropTypes.func.isRequired
};

export default Entry;
