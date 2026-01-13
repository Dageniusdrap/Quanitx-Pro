'use client';

import { useState, useEffect } from 'react';
import Calculator from './Calculator';
import UnitConverter from './UnitConverter';
import StatisticsCalculator from './StatisticsCalculator';
import FinancialCalculator from './FinancialCalculator';
import ProgrammerCalculator from './ProgrammerCalculator';

const MODES = {
    scientific: { name: 'Scientific', icon: '🔬', component: Calculator },
    programmer: { name: 'Programmer', icon: '💻', component: ProgrammerCalculator },
    financial: { name: 'Financial', icon: '💰', component: FinancialCalculator },
    statistics: { name: 'Statistics', icon: '📊', component: StatisticsCalculator },
    converter: { name: 'Unit Converter', icon: '📏', component: UnitConverter },
};

export default function MultiModeCalculator() {
    const [activeMode, setActiveMode] = useState('scientific');
    const [theme, setTheme] = useState('dark');

    // Load saved preferences
    useEffect(() => {
        const savedMode = localStorage.getItem('calculatorMode');
        const savedTheme = localStorage.getItem('calculatorTheme');
        if (savedMode && MODES[savedMode]) setActiveMode(savedMode);
        if (savedTheme) setTheme(savedTheme);
    }, []);

    // Save preferences
    useEffect(() => {
        localStorage.setItem('calculatorMode', activeMode);
        localStorage.setItem('calculatorTheme', theme);

        // Apply theme
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }
    }, [activeMode, theme]);

    const ActiveComponent = MODES[activeMode].component;

    return (
        <div className="min-h-screen relative">
            {/* Header */}
            <div className="sticky top-0 z-50 glass border-b border-[var(--glass-border)]">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                                Quantix Pro
                            </h1>
                            <p className="text-xs text-[var(--text-secondary)] hidden md:block">
                                Professional Calculator Suite
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => alert("Thank you for using the Early Access version! \n\nYour feedback is crucial. Please share this app with friends!")}
                                className="p-3 rounded-xl glass hover:bg-[var(--btn-function)] text-yellow-400 transition-all font-bold"
                                title="Rate this App"
                            >
                                ⭐
                            </button>

                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-3 rounded-xl glass hover:bg-[var(--btn-operator)] transition-all"
                                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                        </div>
                    </div>

                    {/* Mode Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                        {Object.entries(MODES).map(([key, mode]) => (
                            <button
                                key={key}
                                onClick={() => setActiveMode(key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${activeMode === key
                                    ? 'bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-lg scale-105'
                                    : 'glass hover:bg-[var(--btn-number)]'
                                    }`}
                            >
                                <span className="text-lg">{mode.icon}</span>
                                <span>{mode.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Calculator Content */}
            <div className="relative z-10">
                <ActiveComponent />
            </div>

            {/* Footer */}
            <div className="glass border-t border-[var(--glass-border)] mt-8">
                <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-[var(--text-secondary)]">
                    <p className="mb-2">
                        Quantix Pro • Scientific • Programmer • Financial • Statistics • Unit Converter
                    </p>
                    <p className="text-xs">
                        Developed by <a href="https://github.com/TalentedVillagers" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-primary)] transition-colors">Talented Villagers</a> • Early Access Premium • Free for a Limited Time
                    </p>
                </div>
            </div>
        </div>
    );
}
