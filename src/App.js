import React, { Component } from 'react';
import { useState } from 'react'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      currentValue: null,
      display: '0',
      operandPending: false,
      operator: null

    };
  }

  displayNum(num)
  {
    if (this.state.operandPending)
    {
      this.setState({
        display: String(num),
        operandPending: false
      });
    }else 
    {
      this.setState({
        display: this.state.display === '0' ? String(num) : this.state.display + num
      })
    }
  }

  displayOperator(nextOperator)
  {
    const display = this.state.display;
    const operator = this.state.operator;
    const value = this.state.currentValue;
    const input = parseFloat(display);

    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue
    }

    if (value === null)
    {
      this.setState({
        currentValue: input
      });
      console.log(input)
    } else if (operator) 
    {
      const currentValue = value || 0;
      const result = operations[operator](currentValue, input);

      this.setState({
        currentValue: result,
        display: String(result)
      });
    }

    this.setState({
      operandPending: true,
      operator: nextOperator
    })
  }

  displayDecimal()
  {
    const display = this.state.display;
    if (this.state.operandPending)
    {
      this.setState({
        display: '.',
        operandPending: false
      });
    } else if (display.indexOf('.') === -1)
    {
      this.setState({
        display: this.state.display + '.',
        operandPending: false
      });
    }
  }

  displayDelete()
  {
    this.setState({
      currentValue: null,
      display: '0',
      operandPending: false,
      operator: null
    });
  }

  render() {
    return (
      <div className="App" id="App">
        <div id="calculator">
          <div className="row" id="display">
            <h3 id="pastNums">{}</h3>
            <h2 id="recentNum">{parseFloat(this.state.display).toLocaleString()}</h2>
          </div>
          <button id="clear" onClick={() => this.displayDelete()}>AC</button>
          <button className="ops" id="multiply" onClick={() => this.displayOperator('*')}>X</button>
          <button className="ops" id="divide" onClick={() => this.displayOperator('/')}>/</button>
          <button className="nums" id="seven"onClick={() => this.displayNum(7)}>7</button>
          <button className="nums" id="eight"onClick={() => this.displayNum(8)}>8</button>
          <button className="nums" id="nine"onClick={() => this.displayNum(9)}>9</button>
          <button className="ops" id="subtract" onClick={() => this.displayOperator('-')}>-</button>
          <button className="nums" id="four"onClick={() => this.displayNum(4)}>4</button>
          <button className="nums" id="five"onClick={() => this.displayNum(5)}>5</button>
          <button className="nums" id="six"onClick={() => this.displayNum(6)}>6</button>
          <button className="nums" id="zero"onClick={() => this.displayNum(0)}>0</button>
          <button className="ops" id="add" onClick={() => this.displayOperator('+')}>+</button>
          <button className="nums" id="one" onClick={() => this.displayNum(1)}>1</button>
          <button className="nums" id="two" onClick={() => this.displayNum(2)}>2</button>
          <button className="nums" id="three" onClick={() => this.displayNum(3)}>3</button>
          <button id="equals" onClick={() => this.displayOperator('=')}>=</button>
          <button id="decimal" onClick={() => this.displayDecimal()}>.</button>
        </div>
        
      </div>
    );
  }
}

