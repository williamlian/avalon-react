import React, { Component, PropTypes } from 'react';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import CheckBox from 'grommet/components/CheckBox';
import Notification from 'grommet/components/Notification';

class CharacterList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };

    this.onCharacterChanged = this.onCharacterChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCharacterListAction();
  }

  onCharacterChanged(event) {
    const checked = this.state.checked;
    const index = parseInt(event.target.id, 10);
    checked[index] = event.target.checked;
    this.setState({checked: checked})
  }

  onSubmit() {
    const checked = this.state.checked;
    const characterSelected = [];
    checked.forEach((check, i) => {
      if (check) {
        characterSelected.push(this.props.characters[i].key)
      }
    });
    this.props.submitAction(characterSelected);
  }

  render() {
    const self = this;
    const setting = this.props.setting;
    const characterSwitches = this.props.characters.map(function(char, index) {
      return (
        <CheckBox
          key={index}
          label={`${char.name} (${char.side})`}
          id={index}
          checked={self.state.checked[index] || false} 
          onChange={self.onCharacterChanged}/>
      );
    });

    const countMessage = `Good ${setting.good} | Evil ${setting.evil}`;
    return (
      <Box flex="grow" direction="column" responsive={false}>
        <Notification size="small" status="ok" message={countMessage} pad="none"/>

        <Box flex={true} 
             pad={{horizontal:"large"}}
             style={{overflow:'auto', height:'1px'}}
             className="scroll">
          <Box pad={{between:"small", vertical:"large"}}
               direction="column"
               responsive={false}
               className="scroll">
            {characterSwitches}
          </Box>
        </Box>
        
        <Box pad="medium">
          <Button label="Submit" fill={true} onClick={this.onSubmit}/>
        </Box>
      </Box>
    );
  }

}

CharacterList.propTypes = {
  characters: PropTypes.array.isRequired,
  submitAction: PropTypes.func.isRequired,
  getCharacterListAction: PropTypes.func.isRequired
};

export default CharacterList;
