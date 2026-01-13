'use client';

import { useState } from 'react';

const UNITS = {
    length: {
        name: 'Length',
        icon: '📏',
        units: {
            meters: { name: 'Meters', symbol: 'm', toBase: 1 },
            kilometers: { name: 'Kilometers', symbol: 'km', toBase: 1000 },
            centimeters: { name: 'Centimeters', symbol: 'cm', toBase: 0.01 },
            millimeters: { name: 'Millimeters', symbol: 'mm', toBase: 0.001 },
            miles: { name: 'Miles', symbol: 'mi', toBase: 1609.344 },
            yards: { name: 'Yards', symbol: 'yd', toBase: 0.9144 },
            feet: { name: 'Feet', symbol: 'ft', toBase: 0.3048 },
            inches: { name: 'Inches', symbol: 'in', toBase: 0.0254 },
            nauticalMiles: { name: 'Nautical Miles', symbol: 'nmi', toBase: 1852 },
        }
    },
    weight: {
        name: 'Weight',
        icon: '⚖️',
        units: {
            kilograms: { name: 'Kilograms', symbol: 'kg', toBase: 1 },
            grams: { name: 'Grams', symbol: 'g', toBase: 0.001 },
            milligrams: { name: 'Milligrams', symbol: 'mg', toBase: 0.000001 },
            tons: { name: 'Metric Tons', symbol: 't', toBase: 1000 },
            pounds: { name: 'Pounds', symbol: 'lb', toBase: 0.453592 },
            ounces: { name: 'Ounces', symbol: 'oz', toBase: 0.0283495 },
        }
    },
    temperature: {
        name: 'Temperature',
        icon: '🌡️',
        special: true,
        convert: (value, from, to) => {
            // Convert to Celsius first
            let celsius = value;
            if (from === 'fahrenheit') celsius = (value - 32) * 5 / 9;
            if (from === 'kelvin') celsius = value - 273.15;

            // Convert from Celsius to target
            if (to === 'fahrenheit') return celsius * 9 / 5 + 32;
            if (to === 'kelvin') return celsius + 273.15;
            return celsius;
        },
        units: {
            celsius: { name: 'Celsius', symbol: '°C' },
            fahrenheit: { name: 'Fahrenheit', symbol: '°F' },
            kelvin: { name: 'Kelvin', symbol: 'K' },
        }
    },
    area: {
        name: 'Area',
        icon: '📐',
        units: {
            squareMeters: { name: 'Square Meters', symbol: 'm²', toBase: 1 },
            squareKilometers: { name: 'Square Kilometers', symbol: 'km²', toBase: 1000000 },
            squareFeet: { name: 'Square Feet', symbol: 'ft²', toBase: 0.092903 },
            squareYards: { name: 'Square Yards', symbol: 'yd²', toBase: 0.836127 },
            acres: { name: 'Acres', symbol: 'ac', toBase: 4046.86 },
            hectares: { name: 'Hectares', symbol: 'ha', toBase: 10000 },
        }
    },
    volume: {
        name: 'Volume',
        icon: '🧊',
        units: {
            liters: { name: 'Liters', symbol: 'L', toBase: 1 },
            milliliters: { name: 'Milliliters', symbol: 'mL', toBase: 0.001 },
            cubicMeters: { name: 'Cubic Meters', symbol: 'm³', toBase: 1000 },
            gallons: { name: 'Gallons (US)', symbol: 'gal', toBase: 3.78541 },
            quarts: { name: 'Quarts', symbol: 'qt', toBase: 0.946353 },
            pints: { name: 'Pints', symbol: 'pt', toBase: 0.473176 },
            cups: { name: 'Cups', symbol: 'cup', toBase: 0.236588 },
            fluidOunces: { name: 'Fluid Ounces', symbol: 'fl oz', toBase: 0.0295735 },
        }
    },
    speed: {
        name: 'Speed',
        icon: '🚗',
        units: {
            metersPerSecond: { name: 'Meters/Second', symbol: 'm/s', toBase: 1 },
            kilometersPerHour: { name: 'Kilometers/Hour', symbol: 'km/h', toBase: 0.277778 },
            milesPerHour: { name: 'Miles/Hour', symbol: 'mph', toBase: 0.44704 },
            knots: { name: 'Knots', symbol: 'kn', toBase: 0.514444 },
            feetPerSecond: { name: 'Feet/Second', symbol: 'ft/s', toBase: 0.3048 },
        }
    },
    time: {
        name: 'Time',
        icon: '⏱️',
        units: {
            seconds: { name: 'Seconds', symbol: 's', toBase: 1 },
            minutes: { name: 'Minutes', symbol: 'min', toBase: 60 },
            hours: { name: 'Hours', symbol: 'h', toBase: 3600 },
            days: { name: 'Days', symbol: 'd', toBase: 86400 },
            weeks: { name: 'Weeks', symbol: 'wk', toBase: 604800 },
            months: { name: 'Months (30d)', symbol: 'mo', toBase: 2592000 },
            years: { name: 'Years (365d)', symbol: 'yr', toBase: 31536000 },
        }
    },
    energy: {
        name: 'Energy',
        icon: '⚡',
        units: {
            joules: { name: 'Joules', symbol: 'J', toBase: 1 },
            kilojoules: { name: 'Kilojoules', symbol: 'kJ', toBase: 1000 },
            calories: { name: 'Calories', symbol: 'cal', toBase: 4.184 },
            kilocalories: { name: 'Kilocalories', symbol: 'kcal', toBase: 4184 },
            wattHours: { name: 'Watt-Hours', symbol: 'Wh', toBase: 3600 },
            kilowattHours: { name: 'Kilowatt-Hours', symbol: 'kWh', toBase: 3600000 },
        }
    },
    pressure: {
        name: 'Pressure',
        icon: '🌪️',
        units: {
            pascals: { name: 'Pascals', symbol: 'Pa', toBase: 1 },
            kilopascals: { name: 'Kilopascals', symbol: 'kPa', toBase: 1000 },
            bars: { name: 'Bars', symbol: 'bar', toBase: 100000 },
            psi: { name: 'PSI', symbol: 'psi', toBase: 6894.76 },
            atmospheres: { name: 'Atmospheres', symbol: 'atm', toBase: 101325 },
        }
    },
    data: {
        name: 'Data Storage',
        icon: '💾',
        units: {
            bytes: { name: 'Bytes', symbol: 'B', toBase: 1 },
            kilobytes: { name: 'Kilobytes', symbol: 'KB', toBase: 1024 },
            megabytes: { name: 'Megabytes', symbol: 'MB', toBase: 1048576 },
            gigabytes: { name: 'Gigabytes', symbol: 'GB', toBase: 1073741824 },
            terabytes: { name: 'Terabytes', symbol: 'TB', toBase: 1099511627776 },
        }
    },
};

export default function UnitConverter() {
    const [category, setCategory] = useState('length');
    const [fromUnit, setFromUnit] = useState('meters');
    const [toUnit, setToUnit] = useState('feet');
    const [fromValue, setFromValue] = useState('1');
    const [toValue, setToValue] = useState('');

    const convert = (value, from, to, cat) => {
        if (!value || isNaN(value)) return '';

        const categoryData = UNITS[cat];

        // Special handling for temperature
        if (categoryData.special) {
            return categoryData.convert(parseFloat(value), from, to).toFixed(6);
        }

        // Standard conversion: value -> base unit -> target unit
        const baseValue = parseFloat(value) * categoryData.units[from].toBase;
        const result = baseValue / categoryData.units[to].toBase;
        return result.toFixed(6);
    };

    const handleFromValueChange = (value) => {
        setFromValue(value);
        const result = convert(value, fromUnit, toUnit, category);
        setToValue(result);
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        const units = Object.keys(UNITS[newCategory].units);
        setFromUnit(units[0]);
        setToUnit(units[1] || units[0]);
        setFromValue('1');
        setToValue(convert('1', units[0], units[1] || units[0], newCategory));
    };

    const handleFromUnitChange = (unit) => {
        setFromUnit(unit);
        const result = convert(fromValue, unit, toUnit, category);
        setToValue(result);
    };

    const handleToUnitChange = (unit) => {
        setToUnit(unit);
        const result = convert(fromValue, fromUnit, unit, category);
        setToValue(result);
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
        setFromValue(toValue);
        setToValue(fromValue);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="glass rounded-3xl p-6 shadow-2xl animate-in">
                <h2 className="text-3xl font-bold gradient-text mb-6">Unit Converter</h2>

                {/* Category Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                    {Object.entries(UNITS).map(([key, cat]) => (
                        <button
                            key={key}
                            onClick={() => handleCategoryChange(key)}
                            className={`p-3 rounded-xl text-sm font-medium transition-all ${category === key
                                    ? 'bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-lg'
                                    : 'glass hover:bg-[var(--btn-number)]'
                                }`}
                        >
                            <div className="text-xl mb-1">{cat.icon}</div>
                            <div>{cat.name}</div>
                        </button>
                    ))}
                </div>

                {/* Conversion Interface */}
                <div className="space-y-4">
                    {/* From */}
                    <div className="glass rounded-2xl p-4">
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">From</label>
                        <select
                            value={fromUnit}
                            onChange={(e) => handleFromUnitChange(e.target.value)}
                            className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                        >
                            {Object.entries(UNITS[category].units).map(([key, unit]) => (
                                <option key={key} value={key}>
                                    {unit.name} ({unit.symbol})
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={fromValue}
                            onChange={(e) => handleFromValueChange(e.target.value)}
                            className="w-full bg-[var(--bg-tertiary)] text-white text-2xl px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                            placeholder="Enter value"
                        />
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={swapUnits}
                            className="p-3 rounded-xl glass hover:bg-[var(--btn-operator)] transition-all"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </button>
                    </div>

                    {/* To */}
                    <div className="glass rounded-2xl p-4">
                        <label className="block text-sm text-[var(--text-secondary)] mb-2">To</label>
                        <select
                            value={toUnit}
                            onChange={(e) => handleToUnitChange(e.target.value)}
                            className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                        >
                            {Object.entries(UNITS[category].units).map(([key, unit]) => (
                                <option key={key} value={key}>
                                    {unit.name} ({unit.symbol})
                                </option>
                            ))}
                        </select>
                        <div className="w-full bg-[var(--bg-tertiary)] text-white text-2xl px-4 py-3 rounded-lg font-semibold">
                            {toValue || '0'}
                        </div>
                    </div>

                    {/* Formula Display */}
                    <div className="glass rounded-xl p-4 text-sm text-[var(--text-secondary)]">
                        <p className="font-semibold mb-1">Conversion:</p>
                        <p>
                            {fromValue} {UNITS[category].units[fromUnit].symbol} = {toValue} {UNITS[category].units[toUnit].symbol}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
