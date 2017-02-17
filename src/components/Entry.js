import React, { Component, PropTypes } from 'react';

import NumberInput from 'grommet/components/NumberInput';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import FormFields from 'grommet/components/FormFields';
import Footer from 'grommet/components/Footer';

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
        <Tabs responsive={false}>
          <Tab title="Join Game" style={{padding:'0 1em'}}>
            <Form>
              <FormFields>
        			  <FormField label="Group ID">
                  <TextInput value={this.state.groupId} onDOMChange={this.onChangeId} placeHolder="Group ID"/>
        			  </FormField>
              </FormFields>
              <Footer pad={{vertical:'medium'}}>
                <Button label=" Join Group " fill={true} onClick={this.onJoin}/>
              </Footer>
            </Form>
          </Tab>
          <Tab title="Create New" style={{padding:'0 1em'}}>
            <Form>
              <FormFields>
                <FormField label="Group Size">
                  <NumberInput value={this.state.groupSize} min={5} max={12} onChange={this.onChangeSize}/>
                </FormField>
              </FormFields>
              <Footer pad={{vertical:'medium'}}>
                <Button label="Create New Group" fill={true} onClick={this.onCreate}/>
              </Footer>
            </Form>
          </Tab>
        </Tabs>
			</Box>
		);
	}

}

Entry.propTypes = {
	createAction: PropTypes.func.isRequired,
	joinAction: PropTypes.func.isRequired
};

export default Entry;
