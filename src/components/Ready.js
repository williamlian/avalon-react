import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import TextInput from 'grommet/components/TextInput';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';

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
      <Box pad="large">
        <Heading tag="h3">Get Ready By Setting Your Name</Heading>

        <FormField label="Name">
          <TextInput value={this.state.name} onDOMChange={this.onNameChange} placeHolder="Your Name"/>
        </FormField>

        <FormField label="Photo">
          <TextInput value={this.state.photo} onDOMChange={this.onPhotoChange} placeHolder="Not Yet Supported" disabled={true}/>
        </FormField>

        <Box><Button label="Ready" fill={true} onClick={this.onReady}/></Box>
      </Box>
    );
  }

}

Ready.propTypes = {
  groupId: PropTypes.number.isRequired,
  readyAction: PropTypes.func.isRequired
};

export default Ready;
