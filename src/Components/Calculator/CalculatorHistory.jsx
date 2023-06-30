import React from 'react';
import './Calculator.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export default function CalculatorHistory({ history, setHistory }) {

    const deleteHistory = () => {
        setHistory([]);
    }

    return (
        <div className="history-main">
            <div className="history-container">
                <h2>Histórico</h2>
                <button onClick={deleteHistory} className="delete-button">
                    <FontAwesomeIcon icon={faTrash} style={{color: "#9d0101",}} />
                </button>
            </div>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                            {entry.expression} = {entry.result}
                    </li>
                ))}
            </ul>
        </div>
    );
}