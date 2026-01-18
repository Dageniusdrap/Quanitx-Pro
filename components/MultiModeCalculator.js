'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
    const [activeMode, setActiveMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('calculatorMode');
            return (saved && MODES[saved]) ? saved : 'scientific';
        }
        return 'scientific';
    });

    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('calculatorTheme') || 'dark';
        }
        return 'dark';
    });

    // Save preferences and apply theme
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('calculatorMode', activeMode);
            localStorage.setItem('calculatorTheme', theme);
        }

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
            {/* Header Area */}
            <div className="sticky top-0 z-50 glass border-b border-[var(--glass-border)]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
                    <div className="flex items-center justify-between">
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
                </div>
            </div>

            {/* Mode Switcher Area - Centered for Profesional look */}
            <div className="sticky top-[73px] z-40 glass border-b border-[var(--glass-border)] py-3">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide justify-center">
                        {Object.entries(MODES).map(([key, mode]) => (
                            <button
                                key={key}
                                onClick={() => setActiveMode(key)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${activeMode === key
                                    ? 'bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white shadow-lg shadow-[#6366f1]/20 scale-105'
                                    : 'glass hover:bg-[var(--btn-number)] border border-transparent hover:border-[var(--glass-border)]'
                                    }`}
                            >
                                <span className="text-lg">{mode.icon}</span>
                                <span>{mode.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area - Away from left edge and centered */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 min-h-[60vh]">
                <div className="flex flex-col items-center w-full">
                    <ActiveComponent />
                </div>
            </div>

            {/* Footer Area */}
            <div className="glass border-t border-[var(--glass-border)] mt-8">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 text-center text-sm text-[var(--text-secondary)]">
                    <p className="mb-4">
                        Quantix Pro • Scientific • Programmer • Financial • Statistics • Unit Converter
                    </p>
                    <p className="text-xs">
                        Developed by <a href="https://github.com/TalentedVillagers" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-primary)] transition-colors">Talented Villagers</a> • Early Access Premium • <Link href="/privacy-policy" className="hover:text-[var(--accent-primary)] transition-colors">Privacy Policy</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
