import React, { useState, useEffect } from "react";
import {evaluate} from "mathjs";
import "./Calculator.css";
import InterestCalculator from "./InterestCalculator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClockRotateLeft, faSquareRootVariable} from "@fortawesome/free-solid-svg-icons";
import CalculatorHistory from "./CalculatorHistory";

export default function Calculator() {
    const [expression, setExpression] = useState('');
    const [history, setHistory] = useState([]);
    const [isInterestCalculator, setIsInterestCalculator] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const maxLength = 14;

    useEffect(() => {
        document.querySelector('.main-container').focus();
    }, []);

    function toggleInterestCalculator() {
        setIsInterestCalculator(!isInterestCalculator);
    }
    function toggleHistory() {
        setShowHistory(!showHistory);
    }
    const percent = () => {
        const result = evaluate(expression) / 100;
        setExpression(result.toString());
    };
    const minusPlus = () => {
        const result = -evaluate(expression);
        setExpression(result.toString());
    };
    const click = (value) => {
        if (expression.length < maxLength) {
            setExpression(expression + value);
        }
    };
    const clear = () => {
        setExpression('');
    };
    const operation = (value) => {
        if (expression.length < maxLength) {
            setExpression(expression  + value);
        }
    };
    const equal = () => {
        const result = evaluate(expression);
        if (result.toString().length > maxLength) {
            alert('O resultado ultrapassou o limite de caracteres');
        } else {
            setExpression(result.toString());
            setHistory([...history, { expression: `${expression}`, result: result.toString() }]);
        }
    };
    const handleKeyDown = (event) => {
        console.log('handleKeyDown', event.key);
        const key = event.key;
        if (key >= '0' && key <= '9') {
            click(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            operation(key);
        } else if (key === 'Enter') {
            equal();
        } else if (key === 'Backspace') {
            clear();
        }
    };

    return (
        <div className="main">
            <div className="history">
                {showHistory && (
                    <div>
                        <CalculatorHistory history={history} setHistory={setHistory}/>
                    </div>
                )}
            </div>
            {isInterestCalculator ? (
                <InterestCalculator toggleInterestCalculator={toggleInterestCalculator} history={history} setHistory={setHistory}/>
            ) : (
                <div className="main-container" onKeyDown={handleKeyDown} tabIndex="0">
                    <div className="numbers-container">
                        <h1 className="result">{expression}</h1>
                        <button onClick={clear} className="clear">AC</button>
                        <button onClick={minusPlus} className='plus-minus'>+/-</button>
                        <button onClick={percent} className='percent'>%</button>
                        <button onClick={() => operation('/')} className="divide">/</button>
                        <button onClick={() => click('7')} className="numbers">7</button>
                        <button onClick={() => click('8')} className="numbers">8</button>
                        <button onClick={() => click('9')} className="numbers">9</button>
                        <button onClick={() => operation('*')} className="multiply">x</button>
                        <button onClick={() => click('4')} className="numbers">4</button>
                        <button onClick={() => click('5')} className="numbers">5</button>
                        <button onClick={() => click('6')} className="numbers">6</button>
                        <button onClick={() => operation('-')} className="minus">-</button>
                        <button onClick={() => click('1')} className="numbers">1</button>
                        <button onClick={() => click('2')} className="numbers">2</button>
                        <button onClick={() => click('3')} className="numbers">3</button>
                        <button onClick={() => operation('+')} className="plus">+</button>
                        <button onClick={() => click('0')} className='numbers zero'>0</button>
                        <button onClick={() => click('.')} className='numbers'>.</button>
                        <button className='hidden-btn'>.</button>
                        <button onClick={equal} className='equal'>=</button>
                        <button onClick={toggleInterestCalculator} className='equal'>
                            <FontAwesomeIcon icon={faSquareRootVariable} />
                        </button>
                        <button onClick={toggleHistory} className="plus">
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

