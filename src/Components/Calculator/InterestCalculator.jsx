import React, {useEffect, useState} from "react";
import "./Calculator.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalculator} from "@fortawesome/free-solid-svg-icons";

export default function InterestCalculator({ toggleInterestCalculator, history, setHistory }) {
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [time, setTime] = useState('');
    const [n, setN] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        document.querySelector('.main-container').focus();
    }, []);
    const calculateInterest = () => {
        const interest = principal * Math.pow(1 + rate / 100 / n, n * time);
        const formattedInterest = interest.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        });
        setResult(formattedInterest);
        setHistory([...history, { expression: `${principal} * (1 + ${rate} / 100 / ${n}) ^ (${n} * ${time})`, result: formattedInterest }]);
    };

    const clearInputs = () => {
        setPrincipal('');
        setRate('');
        setTime('');
        setN('');
        setResult('');
    };

    return (
        <div className="main">
            <div className="main-container">
                <div className="numbers-container">
                    <h1 className="result">{result}</h1>
                    <div className="inputs-container">
                        <div className="inputs">
                            <label htmlFor="principal">P</label>
                            <input
                                id="principal"
                                onChange={(e) => setPrincipal(e.target.value)}
                                value={principal}
                                placeholder="Principal"
                            />
                        </div>
                        <div className="inputs">
                            <label htmlFor="rate">R</label>
                            <input
                                id="rate"
                                onChange={(e) => setRate(e.target.value)}
                                value={rate}
                                placeholder="Taxa de juros"
                            />
                        </div>
                        <div className="inputs">
                            <label htmlFor="time">T</label>
                            <input
                                id="time"
                                onChange={(e) => setTime(e.target.value)}
                                value={time}
                                placeholder="Tempo (ano)"
                            />
                        </div>
                        <div className="inputs">
                            <label htmlFor="n">N</label>
                            <input
                                id="n"
                                onChange={(e) => setN(e.target.value)}
                                value={n}
                                placeholder="Capitalizações por unidade de tempo"
                            />
                        </div>
                    </div>
                    <div>
                        <button className="divide" onClick={toggleInterestCalculator}>
                            <FontAwesomeIcon icon={faCalculator} />
                        </button>
                        <button className="plus" onClick={calculateInterest}>=</button>
                        <button className="multiply" onClick={clearInputs}>C</button>
                    </div>
                </div>
            </div>
        </div>
    );
}