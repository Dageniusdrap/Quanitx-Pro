'use client';

import { useState, useEffect, useCallback } from 'react';

// Button Component - Moved outside to avoid recreation on each render
const Button = ({ children, onClick, className = '', variant = 'default' }) => {
    const baseClasses = "h-14 rounded-xl font-medium text-lg transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm";

    const variants = {
        default: "bg-[var(--btn-number)] hover:bg-[rgba(99,102,241,0.2)] text-white border border-[var(--glass-border)]",
        operator: "bg-[var(--btn-operator)] hover:bg-[rgba(139,92,246,0.25)] text-white border border-[var(--glass-border)]",
        function: "bg-[var(--btn-function)] hover:bg-[rgba(236,72,153,0.2)] text-white border border-[var(--glass-border)]",
        equals: "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] hover:from-[#7c7ff5] hover:to-[#9d70f7] text-white shadow-lg shadow-[rgba(99,102,241,0.3)]",
        clear: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default function Calculator() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [newNumber, setNewNumber] = useState(true);
    const [memory, setMemory] = useState(0);
    const [history, setHistory] = useState([]);
    const [isRadians, setIsRadians] = useState(true);
    const [showHistory, setShowHistory] = useState(false);

    const addToHistory = (calculation) => {
        setHistory(prev => [calculation, ...prev].slice(0, 10));
    };

    const handleNumber = useCallback((num) => {
        if (newNumber) {
            setDisplay(num);
            setNewNumber(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    }, [display, newNumber]);

    const handleDecimal = useCallback(() => {
        if (newNumber) {
            setDisplay('0.');
            setNewNumber(false);
        } else if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    }, [display, newNumber]);

    const calculate = (a, b, op) => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '×': return a * b;
            case '÷': return a / b;
            case '^': return Math.pow(a, b);
            case 'mod': return a % b;
            default: return b;
        }
    };

    const handleOperation = useCallback((op) => {
        const current = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(current);
        } else if (operation) {
            const result = calculate(previousValue, current, operation);
            setDisplay(String(result));
            setPreviousValue(result);
            addToHistory(`${previousValue} ${operation} ${current} = ${result}`);
        }

        setOperation(op);
        setNewNumber(true);
    }, [display, previousValue, operation]);

    const handleEquals = useCallback(() => {
        if (operation && previousValue !== null) {
            const current = parseFloat(display);
            const result = calculate(previousValue, current, operation);
            addToHistory(`${previousValue} ${operation} ${current} = ${result}`);
            setDisplay(String(result));
            setPreviousValue(null);
            setOperation(null);
            setNewNumber(true);
        }
    }, [display, previousValue, operation]);

    const handleClear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setNewNumber(true);
    };

    const handleClearEntry = () => {
        setDisplay('0');
        setNewNumber(true);
    };

    const handleBackspace = useCallback(() => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
            setNewNumber(true);
        }
    }, [display]);

    const handlePercent = useCallback(() => {
        const current = parseFloat(display);
        setDisplay(String(current / 100));
    }, [display]);

    const handleSign = () => {
        const current = parseFloat(display);
        setDisplay(String(-current));
    };

    // Scientific Functions
    const handleScientific = (func) => {
        const current = parseFloat(display);
        let result;

        switch (func) {
            case 'sin':
                result = isRadians ? Math.sin(current) : Math.sin(current * Math.PI / 180);
                break;
            case 'cos':
                result = isRadians ? Math.cos(current) : Math.cos(current * Math.PI / 180);
                break;
            case 'tan':
                result = isRadians ? Math.tan(current) : Math.tan(current * Math.PI / 180);
                break;
            case 'asin':
                result = isRadians ? Math.asin(current) : Math.asin(current) * 180 / Math.PI;
                break;
            case 'acos':
                result = isRadians ? Math.acos(current) : Math.acos(current) * 180 / Math.PI;
                break;
            case 'atan':
                result = isRadians ? Math.atan(current) : Math.atan(current) * 180 / Math.PI;
                break;
            case 'sinh':
                result = Math.sinh(current);
                break;
            case 'cosh':
                result = Math.cosh(current);
                break;
            case 'tanh':
                result = Math.tanh(current);
                break;
            case 'sqrt':
                result = Math.sqrt(current);
                break;
            case 'cbrt':
                result = Math.cbrt(current);
                break;
            case 'square':
                result = current * current;
                break;
            case 'cube':
                result = current * current * current;
                break;
            case 'reciprocal':
                result = 1 / current;
                break;
            case 'ln':
                result = Math.log(current);
                break;
            case 'log':
                result = Math.log10(current);
                break;
            case 'log2':
                result = Math.log2(current);
                break;
            case 'exp':
                result = Math.exp(current);
                break;
            case 'abs':
                result = Math.abs(current);
                break;
            case 'factorial':
                result = factorial(current);
                break;
            case 'floor':
                result = Math.floor(current);
                break;
            case 'ceil':
                result = Math.ceil(current);
                break;
            case 'round':
                result = Math.round(current);
                break;
            default:
                result = current;
        }

        addToHistory(`${func}(${current}) = ${result}`);
        setDisplay(String(result));
        setNewNumber(true);
    };

    const factorial = (n) => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    const handleConstant = (constant) => {
        let value;
        switch (constant) {
            case 'pi':
                value = Math.PI;
                break;
            case 'e':
                value = Math.E;
                break;
            case 'phi':
                value = (1 + Math.sqrt(5)) / 2; // Golden ratio
                break;
            default:
                value = 0;
        }
        setDisplay(String(value));
        setNewNumber(true);
    };

    // Memory Functions
    const handleMemoryClear = () => setMemory(0);
    const handleMemoryRecall = () => {
        setDisplay(String(memory));
        setNewNumber(true);
    };
    const handleMemoryAdd = () => setMemory(memory + parseFloat(display));
    const handleMemorySubtract = () => setMemory(memory - parseFloat(display));
    const handleMemoryStore = () => setMemory(parseFloat(display));

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
            else if (e.key === '.') handleDecimal();
            else if (e.key === '+') handleOperation('+');
            else if (e.key === '-') handleOperation('-');
            else if (e.key === '*') handleOperation('×');
            else if (e.key === '/') { e.preventDefault(); handleOperation('÷'); }
            else if (e.key === 'Enter' || e.key === '=') handleEquals();
            else if (e.key === 'Escape') handleClear();
            else if (e.key === 'Backspace') handleBackspace();
            else if (e.key === '%') handlePercent();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNumber, handleDecimal, handleOperation, handleEquals, handleBackspace, handlePercent]);

    return (
        <div className="w-full animate-in">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
                {/* Main Calculator */}
                <div className="lg:col-span-2 glass rounded-3xl p-8 shadow-2xl animate-in">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold gradient-text">Scientific Calculator</h1>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsRadians(!isRadians)}
                                className="px-4 py-2 rounded-lg glass text-sm font-medium hover:bg-[var(--btn-operator)] transition-all"
                            >
                                {isRadians ? 'RAD' : 'DEG'}
                            </button>
                            <button
                                onClick={() => setShowHistory(!showHistory)}
                                className="px-4 py-2 rounded-lg glass text-sm font-medium hover:bg-[var(--btn-operator)] transition-all"
                            >
                                📜 History
                            </button>
                        </div>
                    </div>

                    {/* Display */}
                    <div className="glass rounded-2xl p-6 mb-6">
                        <div className="text-right">
                            <div className="text-sm text-[var(--text-secondary)] h-6 mb-2">
                                {previousValue !== null && operation && `${previousValue} ${operation}`}
                            </div>
                            <div className="text-5xl font-semibold text-white break-all">
                                {display}
                            </div>
                        </div>
                    </div>

                    {/* Memory Indicators */}
                    {memory !== 0 && (
                        <div className="mb-4 text-sm text-[var(--text-secondary)] flex items-center gap-2">
                            <span className="px-3 py-1 rounded-lg bg-[var(--btn-operator)] text-white">
                                M: {memory}
                            </span>
                        </div>
                    )}

                    {/* Main Buttons Grid */}
                    <div className="grid grid-cols-5 gap-4">
                        {/* Row 1: Memory & Clear */}
                        <Button variant="function" onClick={handleMemoryClear}>MC</Button>
                        <Button variant="function" onClick={handleMemoryRecall}>MR</Button>
                        <Button variant="function" onClick={handleMemoryAdd}>M+</Button>
                        <Button variant="function" onClick={handleMemorySubtract}>M-</Button>
                        <Button variant="function" onClick={handleMemoryStore}>MS</Button>

                        {/* Row 2: Scientific Functions */}
                        <Button variant="function" onClick={() => handleScientific('sin')}>sin</Button>
                        <Button variant="function" onClick={() => handleScientific('cos')}>cos</Button>
                        <Button variant="function" onClick={() => handleScientific('tan')}>tan</Button>
                        <Button variant="function" onClick={() => handleScientific('ln')}>ln</Button>
                        <Button variant="function" onClick={() => handleScientific('log')}>log</Button>

                        {/* Row 3: More Scientific Functions */}
                        <Button variant="function" onClick={() => handleScientific('asin')}>asin</Button>
                        <Button variant="function" onClick={() => handleScientific('acos')}>acos</Button>
                        <Button variant="function" onClick={() => handleScientific('atan')}>atan</Button>
                        <Button variant="function" onClick={() => handleScientific('sqrt')}>√</Button>
                        <Button variant="function" onClick={() => handleScientific('cbrt')}>∛</Button>

                        {/* Row 4: Powers & Constants */}
                        <Button variant="function" onClick={() => handleScientific('square')}>x²</Button>
                        <Button variant="function" onClick={() => handleScientific('cube')}>x³</Button>
                        <Button variant="function" onClick={() => handleOperation('^')}>xʸ</Button>
                        <Button variant="function" onClick={() => handleConstant('pi')}>π</Button>
                        <Button variant="function" onClick={() => handleConstant('e')}>e</Button>

                        {/* Row 5: Additional Functions */}
                        <Button variant="function" onClick={() => handleScientific('exp')}>eˣ</Button>
                        <Button variant="function" onClick={() => handleScientific('factorial')}>n!</Button>
                        <Button variant="function" onClick={() => handleScientific('abs')}>|x|</Button>
                        <Button variant="function" onClick={() => handleOperation('mod')}>mod</Button>
                        <Button variant="function" onClick={() => handleScientific('reciprocal')}>1/x</Button>

                        {/* Row 6: Clear & Backspace */}
                        <Button variant="clear" onClick={handleClear} className="col-span-2">AC</Button>
                        <Button variant="clear" onClick={handleClearEntry}>CE</Button>
                        <Button variant="operator" onClick={handleBackspace}>⌫</Button>
                        <Button variant="operator" onClick={handlePercent}>%</Button>

                        {/* Row 7-9: Number Pad & Operations */}
                        <Button onClick={() => handleNumber('7')}>7</Button>
                        <Button onClick={() => handleNumber('8')}>8</Button>
                        <Button onClick={() => handleNumber('9')}>9</Button>
                        <Button variant="operator" onClick={() => handleOperation('÷')}>÷</Button>
                        <Button variant="function" onClick={() => handleScientific('sinh')}>sinh</Button>

                        <Button onClick={() => handleNumber('4')}>4</Button>
                        <Button onClick={() => handleNumber('5')}>5</Button>
                        <Button onClick={() => handleNumber('6')}>6</Button>
                        <Button variant="operator" onClick={() => handleOperation('×')}>×</Button>
                        <Button variant="function" onClick={() => handleScientific('cosh')}>cosh</Button>

                        <Button onClick={() => handleNumber('1')}>1</Button>
                        <Button onClick={() => handleNumber('2')}>2</Button>
                        <Button onClick={() => handleNumber('3')}>3</Button>
                        <Button variant="operator" onClick={() => handleOperation('-')}>−</Button>
                        <Button variant="function" onClick={() => handleScientific('tanh')}>tanh</Button>

                        <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
                        <Button onClick={handleDecimal}>.</Button>
                        <Button variant="operator" onClick={() => handleOperation('+')}>+</Button>
                        <Button variant="function" onClick={handleSign}>±</Button>

                        <Button variant="equals" onClick={handleEquals} className="col-span-5 h-16 text-xl font-bold">=</Button>
                    </div>
                </div>

                {/* History Panel */}
                <div className="glass rounded-3xl p-8 shadow-2xl animate-in lg:block" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-2xl font-bold gradient-text mb-4">History</h2>
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                        {history.length === 0 ? (
                            <div className="text-center text-[var(--text-tertiary)] py-8">
                                <p className="text-4xl mb-2">📊</p>
                                <p>No calculations yet</p>
                            </div>
                        ) : (
                            history.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg glass hover:bg-[var(--btn-number)] transition-all cursor-pointer text-sm"
                                    onClick={() => {
                                        const result = item.split('=')[1]?.trim();
                                        if (result) {
                                            setDisplay(result);
                                            setNewNumber(true);
                                        }
                                    }}
                                    style={{ animation: `slideIn 0.3s ease-out ${index * 0.05}s backwards` }}
                                >
                                    {item}
                                </div>
                            ))
                        )}
                    </div>
                    {history.length > 0 && (
                        <button
                            onClick={() => setHistory([])}
                            className="w-full mt-4 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-all"
                        >
                            Clear History
                        </button>
                    )}

                    {/* Quick Reference */}
                    <div className="mt-6 pt-6 border-t border-[var(--glass-border)]">
                        <h3 className="text-lg font-semibold mb-3">Keyboard Shortcuts</h3>
                        <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                            <div className="flex justify-between">
                                <span>Numbers</span>
                                <span className="text-white">0-9</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Operations</span>
                                <span className="text-white">+ - * /</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Calculate</span>
                                <span className="text-white">Enter / =</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Clear</span>
                                <span className="text-white">Esc</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delete</span>
                                <span className="text-white">Backspace</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
