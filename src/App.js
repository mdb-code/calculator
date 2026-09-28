import React from 'react';

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '0',
      output: '',
      displayedOutput: ''
    }   
  }

  handleClickNumber = (value) => {
    this.setState({
        input: isNaN(Number(this.state.input)) ? value : this.state.input === '0' ? value : this.state.input + value,
        output: this.state.output === '0' ? value : this.state.output + value,
        displayedOutput: this.state.output === '0' ? value : this.state.output + value,
    })
  }

  handleClickZero = (value) => {
    if (
      (this.state.input.length === 1 && this.state.input[0] === 0) ||
      ['+', '-', '*', '/'].includes(this.state.input[ this.state.input.length - 2 ]) ) {
        return;
      } else {
        this.setState({
          input: isNaN(Number(this.state.input)) ? value : this.state.input === '0' ? value : this.state.input + value,
          output: ((['+', '-', '*', '/'].includes(this.state.output[ this.state.output.length - 2 ]) && this.state.output[ this.state.output.length - 1 ] === '0') || this.state.output === '0' ) ? this.state.output : this.state.output + value,
          displayedOutput: ((['+', '-', '*', '/'].includes(this.state.output[ this.state.output.length - 2 ]) && this.state.output[ this.state.output.length - 1 ] === '0') || this.state.output === '0' ) ? this.state.output : this.state.output + value
        })
      }
  }

  handleClickDecimal = (value) => {
    if (
      this.state.input.lastIndexOf('.') > this.state.input.lastIndexOf('+') ||
      this.state.input.lastIndexOf('.') > this.state.input.lastIndexOf('-') ||
      this.state.input.lastIndexOf('.') > this.state.input.lastIndexOf('*') ||
      this.state.input.lastIndexOf('.') > this.state.input.lastIndexOf('/') ) { 
        return;
      } else {
        this.setState({
          input: this.state.input + value,
          output: this.state.output + value,
          displayedOutput: this.state.output + value,
        })
      }       
  }
  
  handleClickMinus = () => {
    
  }

  handleClickOperator = (value) => {
    const lastOutput = this.state.output[this.state.output.length - 1];

    // Check if the last character is an operator, if so, replace it with the new operator
    if (['+', '-', '*', '/'].includes(lastOutput)) {
        this.setState({
          input: value,
          output: this.state.output.slice(0, -1) + value, // Remove the last operator and append the new one
          displayedOutput: this.state.output.slice(0, -1) + value
        });  
    } else {
        // If the last character is not an operator, just append the new operator
        this.setState({
          input: value,
          output: this.state.output + value,
          displayedOutput: this.state.output + value
        });
    }
}

  handleClickClear = () => {
    this.setState({
      input: '0',
      output: '',
      displayedOutput: ''
    })
  }

  calculate = () => {
    const expression = this.state.output;
    const tokens = this.state.output.split(/([+\-*/])/);

    const preResult = [];
    for (let i = 0; i < tokens.length; i++) {
      preResult.push(tokens[i]);
      if (tokens[i] === '/' || tokens[i] === '*') {
        preResult.pop();
        const prev = preResult.pop();
        if (tokens[i] === '*') {
          preResult.push(Number(prev) * Number(tokens[i+1]));
          i++;
        } else if (tokens[i] === '/') {
          preResult.push(Number(prev) / Number(tokens[i+1]));
          i++;
        } 
      }
    }
    
    const result = [];
    for (let i = 0; i < preResult.length; i++) {
      result.push(preResult[i]);
      if (preResult[i] === '+' || preResult[i] === '-') {
        result.pop();
        let prev = result.pop();
        if (preResult[i] === '+') {
          result.push(Number(prev) + Number(preResult[i+1]));
          i++;
        } else if (preResult[i] === '-') {
          result.push(Number(prev) - Number(preResult[i+1]));
          i++;
        }
      }
    }
    this.setState({
      input: '',
      output: Number(result),
      displayedOutput: expression + '=' + Number(result)
    })
  }

  render() {
    const { input, displayedOutput } = this.state

    return(
      <div id = "calulator" >
        <div id = "screen" >
          <div id = "output" >{displayedOutput}</div>
          <div id = "display" >{input}</div>
        </div>
        <button id = "zero" onClick = { () => this.handleClickZero('0') } >0</button>
        <button id = "one" onClick = { () => this.handleClickNumber('1') } >1</button>
        <button id = "two" onClick = { () => this.handleClickNumber('2') } >2</button>
        <button id = "three" onClick = { () => this.handleClickNumber('3') } >3</button>
        <button id = "four" onClick = { () => this.handleClickNumber('4') } >4</button>
        <button id = "five" onClick = { () => this.handleClickNumber('5') } >5</button>
        <button id = "six" onClick = { () => this.handleClickNumber('6') } >6</button>
        <button id = "seven" onClick = { () => this.handleClickNumber('7') } >7</button>
        <button id = "eight" onClick = { () => this.handleClickNumber('8') } >8</button>
        <button id = "nine" onClick = { () => this.handleClickNumber('9') } >9</button>
        <button id = "decimal" onClick = { () => this.handleClickDecimal('.') } >.</button>
        <button id = "add" onClick = { () => this.handleClickOperator('+') } >+</button>
        <button id = "subtract" onClick = { () => this.handleClickMinus('-') } >-</button>
        <button id = "multiply" onClick = { () => this.handleClickOperator('*') } >*</button>
        <button id = "divide" onClick = { () => this.handleClickOperator('/') } >/</button>
        <button id = "clear" onClick = { this.handleClickClear } >AC</button>
        <button id = "equals" onClick = { this.calculate } >=</button>
      </div>
    )
  }

}

export default Presentational