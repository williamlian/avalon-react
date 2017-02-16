import React, { Component, PropTypes } from 'react';

import NumberInput from 'grommet/components/NumberInput';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Label from 'grommet/components/Label';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';

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
			<Box pad="large">
			  <FormField label="Group ID">
          <TextInput value={this.state.groupId} onDOMChange={this.onChangeId} placeHolder="Group ID"/>
			  </FormField>

        <FormField label="Group Size">
          <NumberInput value={this.state.groupSize} min={5} max={12} onChange={this.onChangeSize}/>
        </FormField>
        <Box direction="column" 
             responsive={false}
             pad={{vertical:"medium", between:"small"}}
             separator="top">
          <Button label="Create New Group" fill={true} onClick={this.onCreate}/>
          <Button label="Join Group" fill={true} onClick={this.onJoin}/>
        </Box>
			</Box>
		);
	}

}

Entry.propTypes = {
	createAction: PropTypes.func.isRequired,
	joinAction: PropTypes.func.isRequired
};

export default Entry;
