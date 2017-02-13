import React, { Component, PropTypes } from 'react';

class Ready extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      photo: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onPhotoChange = this.onPhotoChange.bind(this);
    this.onReady = this.onReady.bind(this);
  }

  onNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  onPhotoChange(event) {
    this.setState({
      photo: event.target.value
    });
  }

  onReady() {
    this.props.readyAction(
      this.state.name,
      this.state.photo
    );
  }

  render() {
    return (
      <div>
        <div>
          <p>Group ID: {this.props.groupId}</p>
        </div>
        <div>
          <label>Name:
            <input type="text" value={this.state.name} onChange={this.onNameChange}/>
          </label>
        </div>
        <div>
          <label>Photo:
            <input type="text" value={this.state.photo} onChange={this.onPhotoChange}/>
          </label>
        </div>
        <div>
          <input type="button" value="Ready" onClick={this.onReady}/>
        </div>
      </div>
    );
  }

}

Ready.propTypes = {
  groupId: PropTypes.number.isRequired,
  readyAction: PropTypes.func.isRequired
};

export default Ready;
