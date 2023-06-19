import React from 'react';
import { useState } from 'react';
import '../css/tick.css'

export default function Square({value,onSquareClick}) {
   
    return (
        <button 
            className="square"
            onClick={onSquareClick}
        >{value}
        </button>
    );
}