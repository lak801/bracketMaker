import styled, { css } from "styled-components";
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
let Competitor = styled.button`
  text-align: center;
  grid-column-start: ${props => props.indexOfColumn};
  grid-row-start: ${props => props.indexOfRow};
`;
const Main = styled.div`
  grid-template-columns: ${props => props.mainIndexOfColumn};
  grid-template-rows: 20% 20% 20% 20% 20%;
  background-color: #2196f3;
  display: grid;
  height: 100vh;
  text-align: center;
`;

function Input(props) {
  return (
    <div>
      <select onChange={props.onChange}>
        <option value="0">0</option>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
      </select>
      <input
        type="text"
        id="number"
        placeholder="Input Your Values"
        onChange={props.onChangeOfInput}
      />
      <button onClick={props.onClick}>Input!</button>
    </div>
  );
}

class App extends React.Component {
  renderInput() {
    return (
      <Input
        onChangeOfInput={e => this.handleChangeOfInput(e)}
        onChange={e => this.handleChange(e)}
        onClick={e => this.handleClickOfInput(e)}
      />
    );
  }
  bracketInputs = {
    bracket4MainColumn: "30% 20% 20% 30%",
    bracket4Column: [1, 1, 4, 4, 2, 3],
    bracket4Row: [2, 4, 2, 4, 3, 3]
  };
  listBrackets() {
    const bracketList = this.state.names.map((text, key) => {
      return (
        <Competitor
          indexOfColumn={this.bracketInputs.bracket4Column[key]}
          indexOfRow={this.bracketInputs.bracket4Row[key]}
          key={key}
        >
          {text}
        </Competitor>
      );
    });
    return (
      <Main mainIndexOfColumn={this.bracketInputs.bracket4MainColumn}>
        {bracketList}{" "}
      </Main>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      numOfSeeds: 0,
      seedNum: [],
      newName: "",
      names: [],
      vacancy: true,
      class: "container"
    };
  }

  handleChangeOfInput(e) {
    const name = e.target.value;
    this.setState({
      newName: name
    });
  }

  handleChange(e) {
    let newNum = e.target.value;
    this.setState({
      numOfSeeds: newNum
    });

    if (newNum === "4") {
      this.setState({
        names: Array(6).fill(),
        class: "bracket4"
      });
    }
  }

  handleClickOfInput(e) {
    const newNames = this.state.names;
    const arrLength = this.state.names.length;
    let index = Math.floor(Math.random() * arrLength - 1);
    console.log(index);
    while (
      newNames[index] !== undefined ||
      index === arrLength - 1 ||
      index === arrLength - 2 ||
      (!newNames.indexOf(this.state.newName) < 0 && index < 0)
    ) {
      index = Math.floor(Math.random() * arrLength - 1);
    }
    console.log(index);
    newNames.splice(index, 1, this.state.newName);
    this.setState({
      names: newNames
    });
    console.log(this.state.names);
  }

  render() {
    return (
      <div className="bracketMaker">
        <div className="heading">{this.renderInput()}</div>
        <div className="body">{this.listBrackets()}</div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
