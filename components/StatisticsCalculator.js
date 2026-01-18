'use client';

import { useState } from 'react';

export default function StatisticsCalculator() {
    const [dataInput, setDataInput] = useState('');
    const [data, setData] = useState([]);
    const [results, setResults] = useState(null);
    const [regressionX, setRegressionX] = useState('');
    const [regressionY, setRegressionY] = useState('');

    const parseData = (input) => {
        return input
            .split(/[\s,;]+/)
            .map(x => parseFloat(x.trim()))
            .filter(x => !isNaN(x));
    };

    const calculateStatistics = () => {
        const numbers = parseData(dataInput);
        if (numbers.length === 0) return;

        setData(numbers);

        // Sort for median and quartiles
        const sorted = [...numbers].sort((a, b) => a - b);
        const n = numbers.length;

        // Mean
        const mean = numbers.reduce((a, b) => a + b, 0) / n;

        // Median
        const median = n % 2 === 0
            ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
            : sorted[Math.floor(n / 2)];

        // Mode
        const frequency = {};
        numbers.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
        const maxFreq = Math.max(...Object.values(frequency));
        const mode = Object.keys(frequency).filter(k => frequency[k] === maxFreq).map(Number);

        // Variance and Standard Deviation
        const variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / n;
        const stdDev = Math.sqrt(variance);
        const sampleStdDev = Math.sqrt(numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / (n - 1));

        // Range
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        const range = max - min;

        // Quartiles
        const q1 = sorted[Math.floor(n * 0.25)];
        const q3 = sorted[Math.floor(n * 0.75)];
        const iqr = q3 - q1;

        // Sum
        const sum = numbers.reduce((a, b) => a + b, 0);

        setResults({
            count: n,
            sum,
            mean,
            median,
            mode: mode.length < numbers.length ? mode : ['No mode'],
            min,
            max,
            range,
            variance,
            stdDev,
            sampleStdDev,
            q1,
            q3,
            iqr,
        });
    };

    const calculateRegression = () => {
        const xValues = parseData(regressionX);
        const yValues = parseData(regressionY);

        if (xValues.length === 0 || yValues.length === 0 || xValues.length !== yValues.length) {
            alert('Please enter equal numbers of X and Y values');
            return;
        }

        const n = xValues.length;
        const sumX = xValues.reduce((a, b) => a + b, 0);
        const sumY = yValues.reduce((a, b) => a + b, 0);
        const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
        const sumX2 = xValues.reduce((sum, x) => sum + x * x, 0);
        const sumY2 = yValues.reduce((sum, y) => sum + y * y, 0);

        // Linear regression: y = mx + b
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;

        // Correlation coefficient
        const r = (n * sumXY - sumX * sumY) /
            Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
        const r2 = r * r;

        setResults({
            ...results,
            regression: {
                slope,
                intercept,
                equation: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`,
                r,
                r2,
                interpretation: Math.abs(r) > 0.7 ? 'Strong correlation' :
                    Math.abs(r) > 0.3 ? 'Moderate correlation' : 'Weak correlation'
            }
        });
    };

    const StatCard = ({ label, value }) => (
        <div className="glass rounded-xl p-4">
            <div className="text-sm text-[var(--text-secondary)] mb-1">{label}</div>
            <div className="text-2xl font-semibold text-white">
                {typeof value === 'number' ? value.toFixed(4) : value}
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="glass rounded-3xl p-8 shadow-2xl animate-in">
                <h2 className="text-3xl font-bold gradient-text mb-8">📊 Statistics Calculator</h2>

                {/* Data Input */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Enter Data</h3>
                    <div className="glass rounded-2xl p-4">
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">
                            Numbers (separate with spaces, commas, or semicolons)
                        </label>
                        <textarea
                            value={dataInput}
                            onChange={(e) => setDataInput(e.target.value)}
                            className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] min-h-[100px]"
                            placeholder="Example: 1.5, 2.3, 4.7, 3.2, 5.1, 2.9, 4.1"
                        />
                        <button
                            onClick={calculateStatistics}
                            className="mt-3 w-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] hover:from-[#7c7ff5] hover:to-[#9d70f7] text-white py-3 rounded-xl font-semibold shadow-lg transition-all"
                        >
                            Calculate Statistics
                        </button>
                    </div>
                </div>

                {/* Results */}
                {results && (
                    <div className="space-y-6 mb-8">
                        <h3 className="text-xl font-semibold">Results</h3>

                        {/* Basic Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <StatCard label="Count" value={results.count} />
                            <StatCard label="Sum" value={results.sum} />
                            <StatCard label="Mean (Average)" value={results.mean} />
                            <StatCard label="Median" value={results.median} />
                        </div>

                        {/* Distribution */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <StatCard label="Mode" value={results.mode.join(', ')} />
                            <StatCard label="Minimum" value={results.min} />
                            <StatCard label="Maximum" value={results.max} />
                        </div>

                        {/* Spread */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <StatCard label="Range" value={results.range} />
                            <StatCard label="Variance" value={results.variance} />
                            <StatCard label="Std Dev (Pop)" value={results.stdDev} />
                            <StatCard label="Std Dev (Sample)" value={results.sampleStdDev} />
                        </div>

                        {/* Quartiles */}
                        <div className="grid grid-cols-3 gap-3">
                            <StatCard label="Q1 (25th %ile)" value={results.q1} />
                            <StatCard label="Q3 (75th %ile)" value={results.q3} />
                            <StatCard label="IQR" value={results.iqr} />
                        </div>

                        {/* Data Display */}
                        <div className="glass rounded-xl p-4">
                            <div className="text-sm text-[var(--text-secondary)] mb-2">Sorted Data</div>
                            <div className="text-white break-all">
                                {[...data].sort((a, b) => a - b).join(', ')}
                            </div>
                        </div>
                    </div>
                )}

                {/* Linear Regression */}
                <div className="border-t border-[var(--glass-border)] pt-6">
                    <h3 className="text-xl font-semibold mb-3">Linear Regression</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="glass rounded-2xl p-4">
                            <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                X Values
                            </label>
                            <textarea
                                value={regressionX}
                                onChange={(e) => setRegressionX(e.target.value)}
                                className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] min-h-[80px]"
                                placeholder="1, 2, 3, 4, 5"
                            />
                        </div>
                        <div className="glass rounded-2xl p-4">
                            <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                Y Values
                            </label>
                            <textarea
                                value={regressionY}
                                onChange={(e) => setRegressionY(e.target.value)}
                                className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] min-h-[80px]"
                                placeholder="2, 4, 5, 7, 9"
                            />
                        </div>
                    </div>
                    <button
                        onClick={calculateRegression}
                        className="w-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] hover:from-[#9d70f7] hover:to-[#f56db4] text-white py-3 rounded-xl font-semibold shadow-lg transition-all"
                    >
                        Calculate Regression
                    </button>

                    {results?.regression && (
                        <div className="mt-4 space-y-3">
                            <div className="glass rounded-xl p-4">
                                <div className="text-sm text-[var(--text-secondary)] mb-1">Equation</div>
                                <div className="text-2xl font-semibold text-white">{results.regression.equation}</div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <StatCard label="Slope (m)" value={results.regression.slope} />
                                <StatCard label="Intercept (b)" value={results.regression.intercept} />
                                <StatCard label="Correlation (r)" value={results.regression.r} />
                                <StatCard label="R² Value" value={results.regression.r2} />
                            </div>
                            <div className="glass rounded-xl p-4">
                                <div className="text-sm text-[var(--text-secondary)] mb-1">Interpretation</div>
                                <div className="text-lg text-white">{results.regression.interpretation}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Reference */}
                <div className="mt-6 pt-6 border-t border-[var(--glass-border)]">
                    <h3 className="text-lg font-semibold mb-3">📖 Quick Reference</h3>
                    <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                        <p><span className="text-white font-semibold">Mean:</span> Average of all values</p>
                        <p><span className="text-white font-semibold">Median:</span> Middle value when sorted</p>
                        <p><span className="text-white font-semibold">Mode:</span> Most frequently occurring value(s)</p>
                        <p><span className="text-white font-semibold">Std Dev:</span> Measure of data spread from mean</p>
                        <p><span className="text-white font-semibold">IQR:</span> Interquartile range (Q3 - Q1)</p>
                        <p><span className="text-white font-semibold">R²:</span> How well the line fits (0-1, higher is better)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
