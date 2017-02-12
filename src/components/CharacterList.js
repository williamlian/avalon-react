import React, { Component, PropTypes } from 'react';

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
    const index = parseInt(event.target.value, 10);
    checked[index] = event.target.checked;
    this.setState({checked: checked})
  }

  onSubmit() {
    const checked = this.state.checked;
    const characterSelected = [];
    checked.forEach((check, i) => {
      if (check) {
        characterSelected.push(this.props.characters[i])
      }
    });
    this.props.submitAction(characterSelected);
  }

  render() {
    const self = this;
    const characterSwitches = this.props.characters.map(function(c, i) {
      return (
        <li key={i}>
          <label>{c}
          <input type="checkbox" value={i} checked={self.state.checked[i] || false} onChange={self.onCharacterChanged}/>
          </label>
        </li>
      );
    });

    return (
      <div>
        <ul>{characterSwitches}</ul>
        <div>
          <input type="button" value="submit" onClick={this.onSubmit}/>
        </div>
      </div>
    );
  }

}

CharacterList.propTypes = {
  characters: PropTypes.array.isRequired,
  submitAction: PropTypes.func.isRequired,
  getCharacterListAction: PropTypes.func.isRequired
};

export default CharacterList;
