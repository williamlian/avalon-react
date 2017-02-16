import React, { Component, PropTypes } from 'react';

import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import List from 'grommet/components/List';
import CheckBox from 'grommet/components/CheckBox';

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

    return (
      <Box flex="grow" pad="large" direction="column" responsive={false}>
        <Box>
          <Heading align="center" tag="h4">Good: {setting.good} | Evil: {setting.evil}</Heading>
        </Box>

        <Box flex="grow" pad={{vertical:"large"}}>
          <Box pad={{between:"small"}} direction="column" flex={true} responsive={false} style={{overflow:'auto', height:'1'}}>
            {characterSwitches}
          </Box>
        </Box>
        
        <Box><Button label="submit" fill={true} onClick={this.onSubmit}/></Box>
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
