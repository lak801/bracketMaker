/* To Do: 
    add the css first off
    then connect the changing of the option dropdown to css
    once the css changes and the buttons are rendered with no text then attach the
      on input function to randomly push the array pieces one by one into the predetermined buttons
    after that, you're done! ... easier commented than done I guess... */

import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Seed(props) {
  return (
    <button className=" " onClick={props.onClick}>
      {props.value}
    </button>
  );
}

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

function Competitor(props) {
  return (
    <div className={props.className}>
      <button>{props.name}</button>
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
    const bracketList = this.state.names.map((text, key) => (
      <Competitor
        name={text}
        key={key}
        className={this.state.class + " competitor" + key}
      />
    ));
    const arr = this.state.names;
    //you might have to make this a for loop ALSO IT CRASHES
    return <div className="main">{bracketList}</div>;
  }
  constructor(props) {
    super(props);
    this.state = {
      numOfSeeds: 0,
      seedNum: [],
      newName: "",
      names: [],
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
    const index = Math.random() * arrLength;
    console.log(index);
    if (
      newNames[index] === undefined &&
      Math.floor(index) !== 5 &&
      Math.floor(index) !== 4
    ) {
      if (newNames.indexOf(this.state.newName) <= 0) {
        console.log("inside");
        newNames.splice(index, 1, this.state.newName);
        this.setState({
          names: newNames
        });
      }
    } else if (Math.floor(index) !== 5) {
      const newIndex = 0;
      for (var i = 0; i < this.state.names.length - 1; i++) {
        if (newNames[i] === undefined && i !== 4 && i !== 5) {
          newIndex = i;
        }
      }
      newNames.splice(newIndex, 1, this.state.newName);
      this.setState({
        names: newNames
      });
    }
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
