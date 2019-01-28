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
        <option value="16">16</option>
      </select>
      <input
        type="text"
        id="number"
        placeholder="    Input Your Competitors"
        onChange={props.onChangeOfInput}
        onKeyPress={props.onEnter}
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
        onEnter={e => this.handleEnter(e)}
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
    if (this.state.numOfSeeds === "16") {
      bracketType = this.state.bracket16;
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
          {key}
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
      },
      bracket16: {
        mainColumn: "12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%",
        column: [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          8,
          8,
          8,
          8,
          8,
          8,
          8,
          8,
          2,
          2,
          2,
          2,
          7,
          7,
          7,
          7,
          3,
          3,
          6,
          6,
          4,
          5
        ],
        row: [
          1,
          2,
          4,
          5,
          7,
          8,
          10,
          11,
          1,
          2,
          4,
          5,
          7,
          8,
          10,
          11,
          2,
          4,
          8,
          10,
          2,
          4,
          8,
          10,
          3,
          9,
          3,
          9,
          6,
          6
        ],
        mainRow: "9% 9% 9% 9% 9% 9% 9% 9% 9% 9% 9%"
      }
    };
  }

  handleEnter(e) {
    if (e.key === "Enter") {
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
      }

      newNames.splice(index, 1, this.state.newName);
      this.setState({
        names: newNames
      });
    }
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
    if (newNum === "16") {
      this.setState({
        names: Array(30).fill(),
        isClicked: Array(30).fill("blue")
      });
    }
  }
  //maybe rule sets or uses key plus one and minus one only
  handleClickOfSeed(e, key, text) {
    let arr = this.state.names;
    let newArr = this.state.names;
    let numBracket = this.state.numOfSeeds;
    let clickedArr = this.state.isClicked;
    if (text !== undefined) {
      if (key === 0 && clickedArr[key + 1] !== "gold") {
        newArr[parseInt(numBracket, 10)] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (key === 1 && clickedArr[key - 1] !== "gold") {
        newArr[parseInt(numBracket, 10)] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
      if (key === 2 && clickedArr[key + 1] !== "gold") {
        newArr[parseInt(numBracket, 10) + 1] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (key === 3 && clickedArr[key - 1] !== "gold") {
        newArr[parseInt(numBracket, 10) + 1] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
      if (
        key === 4 &&
        clickedArr[key + 1] !== "gold" &&
        newArr[key + 1] !== undefined &&
        this.state.numOfSeeds === "4"
      ) {
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === 4 &&
        clickedArr[key + 1] !== "gold" &&
        newArr[key + 1] !== undefined &&
        this.state.numOfSeeds === "8"
      ) {
        newArr[key + 6] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === 5 &&
        clickedArr[key - 1] !== "gold" &&
        newArr[key - 1] !== undefined &&
        numBracket === "4"
      ) {
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
      if (
        key === 5 &&
        clickedArr[key - 1] !== "gold" &&
        newArr[key - 1] !== undefined &&
        numBracket === "8"
      ) {
        newArr[key + 5] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
      if (
        key === 6 &&
        clickedArr[key + 1] !== "gold" &&
        newArr[key + 1] !== undefined &&
        numBracket === "8"
      ) {
        newArr[key + 5] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === 7 &&
        clickedArr[key - 1] !== "gold" &&
        newArr[key - 1] !== undefined &&
        numBracket === "8"
      ) {
        newArr[key + 4] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
      if (
        key === 8 &&
        clickedArr[key + 1] !== "gold" &&
        newArr[key + 1] !== undefined
      ) {
        newArr[12] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === 9 &&
        clickedArr[key - 1] !== "gold" &&
        newArr[key - 1] !== undefined
      ) {
        newArr[12] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
      if (
        key === 10 &&
        clickedArr[key + 1] !== "gold" &&
        newArr[key + 1] !== undefined
      ) {
        newArr[13] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === 11 &&
        clickedArr[key - 1] !== "gold" &&
        newArr[key - 1] !== undefined
      ) {
        newArr[13] = arr[key];
        newArr[key] = undefined;
        clickedArr[key] = "gold";
        clickedArr[key - 1] = "red";
      }
      if (
        key === 12 &&
        clickedArr[key + 1] !== "gold" &&
        newArr[key + 1] !== undefined &&
        numBracket === "8"
      ) {
        clickedArr[key] = "gold";
        clickedArr[key + 1] = "red";
      }
      if (
        key === 13 &&
        clickedArr[key - 1] !== "gold" &&
        newArr[key - 1] !== undefined &&
        numBracket === "8"
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
