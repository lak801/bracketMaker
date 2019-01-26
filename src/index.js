import styled, { css } from "styled-components";
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
let Competitor = styled.button`
  color: white;
  font-size: 20px;
  text-align: center;
  grid-column-start: ${props => props.indexOfColumn};
  grid-row-start: ${props => props.indexOfRow};
  background-color: ${props => props.isClicked};
`;
const Main = styled.div`
  grid-template-columns: ${props => props.mainIndexOfColumn};
  grid-template-rows: ${props => props.mainIndexOfRow};
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

  listBrackets() {
    let bracketType = this.state.bracket4;
    if (this.state.numOfSeeds === "4") {
      bracketType = this.state.bracket4;
    }
    if (this.state.numOfSeeds === "8") {
      bracketType = this.state.bracket8;
    }
    const bracketList = this.state.names.map((text, key) => {
      return (
        <Competitor
          indexOfColumn={bracketType.column[key]}
          indexOfRow={bracketType.row[key]}
          key={key}
          isClicked={this.state.isClicked[key]}
          onClick={e => this.handleClickOfSeed(e, key, text)}
        >
          {text}
        </Competitor>
      );
    });
    return (
      <Main
        mainIndexOfColumn={bracketType.mainColumn}
        mainIndexOfRow={bracketType.mainRow}
      >
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
      isClicked: [],
      class: "container",
      bracket4: {
        mainColumn: "30% 20% 20% 30%",
        column: [1, 1, 4, 4, 2, 3],
        row: [2, 4, 2, 4, 3, 3],
        mainRow: "20% 20% 20% 20% 20%"
      },
      bracket8: {
        mainColumn: "20% 15% 15% 15% 15% 20%",
        column: [1, 1, 1, 1, 6, 6, 6, 6, 2, 2, 5, 5, 3, 4],
        row: [1, 2, 4, 5, 1, 2, 4, 5, 2, 4, 2, 4, 3, 3],
        mainRow: "20% 20% 20% 20% 20%"
      }
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
        class: "bracket4",
        isClicked: Array(6).fill("blue")
      });
    }
    if (newNum === "8") {
      this.setState({
        names: Array(14).fill(),
        isClicked: Array(14).fill("blue")
      });
    }
  }

  handleClickOfSeed(e, key, text) {
    let arr = this.state.names;
    let newArr = this.state.names;
    let numBracket = this.state.numOfSeeds;
    let clickedArr = this.state.isClicked;
    if (text !== undefined) {
      if (key === arr.length - arr.length && clickedArr[key + 1] !== "gold") {
        newArr[arr.length - arr.length + parseInt(numBracket, 10)] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === arr.length - arr.length + 1 &&
        clickedArr[key - 1] !== "gold"
      ) {
        newArr[arr.length - arr.length + parseInt(numBracket, 10)] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
      if (
        key === arr.length - arr.length + 2 &&
        clickedArr[key + 1] !== "gold"
      ) {
        newArr[arr.length - arr.length + parseInt(numBracket, 10) + 1] =
          arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === arr.length - arr.length + 3 &&
        clickedArr[key - 1] !== "gold"
      ) {
        newArr[arr.length - arr.length + parseInt(numBracket, 10) + 1] =
          arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
      if (
        key === arr.length - arr.length + 4 &&
        clickedArr[key + 1] !== "gold" &&
        newArr[key + 1] !== undefined &&
        this.state.numOfSeeds === "4"
      ) {
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === arr.length - arr.length + 4 &&
        clickedArr[key + 1] !== "gold" &&
        newArr[key + 1] !== undefined &&
        this.state.numOfSeeds === "8"
      ) {
        newArr[arr.length - arr.length + parseInt(numBracket, 10) + 1] =
          arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === arr.length - arr.length + 5 &&
        clickedArr[key - 1] !== "gold" &&
        newArr[key - 1] !== undefined
      ) {
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
    }
    this.setState({
      names: newArr
    });
  }

  handleClickOfInput(e) {
    const newNames = this.state.names;
    const arrLength = this.state.names.length;
    let index = Math.floor(Math.random() * arrLength - 1);
    if (arrLength === 6) {
      while (
        newNames[index] !== undefined ||
        index === arrLength - 1 ||
        index === arrLength - 2 ||
        !newNames.indexOf(this.state.newName) < 0 ||
        index < 0
      ) {
        index = Math.floor(Math.random() * arrLength - 1);
      }
    }
    if (arrLength === 14) {
      while (
        newNames[index] !== undefined ||
        index === arrLength - 1 ||
        index === arrLength - 2 ||
        index === arrLength - 3 ||
        index === arrLength - 4 ||
        index === arrLength - 5 ||
        index === arrLength - 6 ||
        !newNames.indexOf(this.state.newName) < 0 ||
        index < 0
      ) {
        index = Math.floor(Math.random() * arrLength - 1);
      }
      console.log(index);
    }

    newNames.splice(index, 1, this.state.newName);
    this.setState({
      names: newNames
    });
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
