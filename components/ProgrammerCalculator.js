'use client';

import { useState, useCallback } from 'react';

const Button = ({ children, onClick, className = '', variant = 'default' }) => {
    const baseClasses = "h-12 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm";

    const variants = {
        default: "bg-[var(--btn-number)] hover:bg-[rgba(99,102,241,0.2)] text-white border border-[var(--glass-border)]",
        operator: "bg-[var(--btn-operator)] hover:bg-[rgba(139,92,246,0.25)] text-white border border-[var(--glass-border)]",
        function: "bg-[var(--btn-function)] hover:bg-[rgba(236,72,153,0.2)] text-white border border-[var(--glass-border)]",
        equals: "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] hover:from-[#7c7ff5] hover:to-[#9d70f7] text-white shadow-lg",
        clear: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
    };

    return (
        <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export default function ProgrammerCalculator() {
    const [display, setDisplay] = useState('0');
    const [mode, setMode] = useState('DEC'); // DEC, HEX, BIN, OCT
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [newNumber, setNewNumber] = useState(true);

    const convertToDecimal = (value, fromMode) => {
        if (fromMode === 'DEC') return parseInt(value) || 0;
        if (fromMode === 'HEX') return parseInt(value, 16) || 0;
        if (fromMode === 'BIN') return parseInt(value, 2) || 0;
        if (fromMode === 'OCT') return parseInt(value, 8) || 0;
        return 0;
    };

    const convertFromDecimal = (value, toMode) => {
        const num = parseInt(value) || 0;
        if (toMode === 'DEC') return num.toString();
        if (toMode === 'HEX') return num.toString(16).toUpperCase();
        if (toMode === 'BIN') return num.toString(2);
        if (toMode === 'OCT') return num.toString(8);
        return '0';
    };

    const handleNumber = useCallback((num) => {
        if (newNumber) {
            setDisplay(num);
            setNewNumber(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    }, [display, newNumber]);

    const handleOperation = useCallback((op) => {
        const current = convertToDecimal(display, mode);

        if (previousValue === null) {
            setPreviousValue(current);
        } else if (operation) {
            const result = calculate(previousValue, current, operation);
            setDisplay(convertFromDecimal(result, mode));
            setPreviousValue(result);
        }

        setOperation(op);
        setNewNumber(true);
    }, [display, previousValue, operation, mode]);

    const calculate = (a, b, op) => {
        switch (op) {
            case 'ADD': return a + b;
            case 'SUB': return a - b;
            case 'MUL': return a * b;
            case 'DIV': return Math.floor(a / b);
            case 'MOD': return a % b;
            case 'AND': return a & b;
            case 'OR': return a | b;
            case 'XOR': return a ^ b;
            case 'NAND': return ~(a & b);
            case 'NOR': return ~(a | b);
            case 'LSHIFT': return a << b;
            case 'RSHIFT': return a >> b;
            default: return b;
        }
    };

    const handleEquals = () => {
        if (operation && previousValue !== null) {
            const current = convertToDecimal(display, mode);
            const result = calculate(previousValue, current, operation);
            setDisplay(convertFromDecimal(result, mode));
            setPreviousValue(null);
            setOperation(null);
            setNewNumber(true);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setNewNumber(true);
    };

    const handleNOT = () => {
        const current = convertToDecimal(display, mode);
        const result = ~current;
        setDisplay(convertFromDecimal(result, mode));
    };

    const handleModeChange = (newMode) => {
        const decimal = convertToDecimal(display, mode);
        setMode(newMode);
        setDisplay(convertFromDecimal(decimal, newMode));
    };

    const getMultiBaseDisplay = () => {
        const decimal = convertToDecimal(display, mode);
        return {
            dec: convertFromDecimal(decimal, 'DEC'),
            hex: convertFromDecimal(decimal, 'HEX'),
            bin: convertFromDecimal(decimal, 'BIN'),
            oct: convertFromDecimal(decimal, 'OCT'),
        };
    };

    const multiBase = getMultiBaseDisplay();

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="glass rounded-3xl p-8 shadow-2xl animate-in">
                <h2 className="text-3xl font-bold gradient-text mb-6">💻 Programmer Calculator</h2>

                {/* Mode Selector */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                    {['DEC', 'HEX', 'BIN', 'OCT'].map(m => (
                        <button
                            key={m}
                            onClick={() => handleModeChange(m)}
                            className={`py-3 rounded-xl font-semibold transition-all ${mode === m
                                ? 'bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-lg'
                                : 'glass hover:bg-[var(--btn-number)]'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                {/* Multi-Base Display */}
                <div className="glass rounded-2xl p-6 mb-8 space-y-3">
                    <div className="text-right">
                        <div className="text-sm text-[var(--text-secondary)]">
                            {previousValue !== null && operation && `${previousValue} ${operation}`}
                        </div>
                        <div className="text-4xl font-bold text-white break-all mb-4">
                            {display}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm border-t border-[var(--glass-border)] pt-4">
                        <div className={`p-2 rounded-lg ${mode === 'DEC' ? 'bg-[var(--btn-operator)]' : 'bg-[var(--bg-tertiary)]'}`}>
                            <div className="text-[var(--text-secondary)]">DEC</div>
                            <div className="text-white font-mono">{multiBase.dec}</div>
                        </div>
                        <div className={`p-2 rounded-lg ${mode === 'HEX' ? 'bg-[var(--btn-operator)]' : 'bg-[var(--bg-tertiary)]'}`}>
                            <div className="text-[var(--text-secondary)]">HEX</div>
                            <div className="text-white font-mono">0x{multiBase.hex}</div>
                        </div>
                        <div className={`p-2 rounded-lg ${mode === 'BIN' ? 'bg-[var(--btn-operator)]' : 'bg-[var(--bg-tertiary)]'}`}>
                            <div className="text-[var(--text-secondary)]">BIN</div>
                            <div className="text-white font-mono text-xs break-all">0b{multiBase.bin}</div>
                        </div>
                        <div className={`p-2 rounded-lg ${mode === 'OCT' ? 'bg-[var(--btn-operator)]' : 'bg-[var(--bg-tertiary)]'}`}>
                            <div className="text-[var(--text-secondary)]">OCT</div>
                            <div className="text-white font-mono">0o{multiBase.oct}</div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-5 gap-3">
                    {/* Row 1: Bitwise Operations */}
                    <Button variant="function" onClick={() => handleOperation('AND')}>AND</Button>
                    <Button variant="function" onClick={() => handleOperation('OR')}>OR</Button>
                    <Button variant="function" onClick={() => handleOperation('XOR')}>XOR</Button>
                    <Button variant="function" onClick={handleNOT}>NOT</Button>
                    <Button variant="function" onClick={() => handleOperation('NAND')}>NAND</Button>

                    {/* Row 2: Shifts and More */}
                    <Button variant="function" onClick={() => handleOperation('LSHIFT')}>{'<<'}</Button>
                    <Button variant="function" onClick={() => handleOperation('RSHIFT')}>{'>>'}</Button>
                    <Button variant="function" onClick={() => handleOperation('MOD')}>MOD</Button>
                    <Button variant="clear" onClick={handleClear} className="col-span-2">CLR</Button>

                    {/* Row 3-5: Hex Digits and Numbers */}
                    {mode === 'HEX' && (
                        <>
                            <Button onClick={() => handleNumber('A')}>A</Button>
                            <Button onClick={() => handleNumber('B')}>B</Button>
                            <Button onClick={() => handleNumber('C')}>C</Button>
                            <Button onClick={() => handleNumber('D')}>D</Button>
                            <Button onClick={() => handleNumber('E')}>E</Button>
                            <Button onClick={() => handleNumber('F')}>F</Button>
                        </>
                    )}

                    {mode !== 'HEX' && (
                        <>
                            <Button disabled className="opacity-30">A</Button>
                            <Button disabled className="opacity-30">B</Button>
                            <Button disabled className="opacity-30">C</Button>
                            <Button disabled className="opacity-30">D</Button>
                            <Button disabled className="opacity-30">E</Button>
                            <Button disabled className="opacity-30">F</Button>
                        </>
                    )}

                    <Button onClick={() => handleNumber('7')} disabled={mode === 'BIN'}
                        className={mode === 'BIN' ? 'opacity-30' : ''}>7</Button>
                    <Button onClick={() => handleNumber('8')} disabled={mode === 'BIN' || mode === 'OCT'}
                        className={mode === 'BIN' || mode === 'OCT' ? 'opacity-30' : ''}>8</Button>
                    <Button onClick={() => handleNumber('9')} disabled={mode === 'BIN' || mode === 'OCT'}
                        className={mode === 'BIN' || mode === 'OCT' ? 'opacity-30' : ''}>9</Button>
                    <Button variant="operator" onClick={() => handleOperation('DIV')}>÷</Button>

                    <Button onClick={() => handleNumber('4')} disabled={mode === 'BIN'}
                        className={mode === 'BIN' ? 'opacity-30' : ''}>4</Button>
                    <Button onClick={() => handleNumber('5')} disabled={mode === 'BIN'}
                        className={mode === 'BIN' ? 'opacity-30' : ''}>5</Button>
                    <Button onClick={() => handleNumber('6')} disabled={mode === 'BIN'}
                        className={mode === 'BIN' ? 'opacity-30' : ''}>6</Button>
                    <Button variant="operator" onClick={() => handleOperation('MUL')}>×</Button>

                    <Button onClick={() => handleNumber('3')} disabled={mode === 'BIN'}
                        className={mode === 'BIN' ? 'opacity-30' : ''}>3</Button>
                    <Button onClick={() => handleNumber('2')} disabled={mode === 'BIN'}
                        className={mode === 'BIN' ? 'opacity-30' : ''}>2</Button>
                    <Button onClick={() => handleNumber('1')}>1</Button>
                    <Button variant="operator" onClick={() => handleOperation('SUB')}>−</Button>

                    <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
                    <Button variant="operator" onClick={() => handleOperation('ADD')}>+</Button>

                    <Button variant="equals" onClick={handleEquals} className="col-span-2">=</Button>
                </div>

                {/* Quick Reference */}
                <div className="mt-6 pt-6 border-t border-[var(--glass-border)]">
                    <h3 className="text-lg font-semibold mb-3">📖 Quick Reference</h3>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
                        <div><span className="text-white font-semibold">AND:</span> Both bits must be 1</div>
                        <div><span className="text-white font-semibold">OR:</span> Either bit is 1</div>
                        <div><span className="text-white font-semibold">XOR:</span> Bits are different</div>
                        <div><span className="text-white font-semibold">NOT:</span> Flip all bits</div>
                        <div><span className="text-white font-semibold">{'<<'}:</span> Shift bits left (multiply by 2)</div>
                        <div><span className="text-white font-semibold">{'>>'}:</span> Shift bits right (divide by 2)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
