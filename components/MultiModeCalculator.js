'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Calculator from './Calculator';
import UnitConverter from './UnitConverter';
import StatisticsCalculator from './StatisticsCalculator';
import FinancialCalculator from './FinancialCalculator';
import ProgrammerCalculator from './ProgrammerCalculator';

const MODES = {
    scientific: { name: 'Scientific', description: 'Advanced mathematical operations', icon: '🔬', component: Calculator },
    programmer: { name: 'Programmer', description: 'Binary, Hex, Octal logic', icon: '💻', component: ProgrammerCalculator },
    financial: { name: 'Financial', description: 'Loans, investments, and more', icon: '💰', component: FinancialCalculator },
    statistics: { name: 'Statistics', description: 'Data analysis and regression', icon: '📊', component: StatisticsCalculator },
    converter: { name: 'Converter', description: 'Unit conversions', icon: '📏', component: UnitConverter },
};

export default function MultiModeCalculator() {
    const [activeMode, setActiveMode] = useState(null); // Null means distinct 'Dashboard' view
    const [theme, setTheme] = useState('dark');

    // Load saved preferences
    useEffect(() => {
        const savedMode = localStorage.getItem('calculatorMode');
        const savedTheme = localStorage.getItem('calculatorTheme');
        // If a specific mode was saved, we *could* auto-open it, but for this fresh UI let's default to Dashboard
        // unless they explicitly want it. Let's start on Dashboard for the 'Wow' effect.
        if (savedTheme) setTheme(savedTheme);
    }, []);

    // Save preferences
    useEffect(() => {
        if (activeMode) localStorage.setItem('calculatorMode', activeMode);
        localStorage.setItem('calculatorTheme', theme);

        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }
    }, [activeMode, theme]);

    const ActiveComponent = activeMode ? MODES[activeMode].component : null;

    return (
        <div className="min-h-screen relative flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent-highlight)] selection:text-white">

            {/* Minimal Header */}
            <header className="sticky top-0 z-50 border-b border-[var(--border-primary)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {/* Logo / Brand */}
                        <div
                            className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer"
                            onClick={() => setActiveMode(null)}
                        >
                            <div className="w-8 h-8 bg-[var(--text-primary)] rounded-full flex items-center justify-center text-[var(--bg-primary)]">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span>Quantix Next</span>
                        </div>

                        {/* Breadcrumbs / Navigation */}
                        {activeMode && (
                            <div className="flex items-center text-sm text-[var(--text-secondary)]">
                                <span className="mx-2">/</span>
                                <span className="text-[var(--text-primary)]">{MODES[activeMode].name}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/Dageniusdrap/Quanitx-Pro"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm"
                        >
                            GitHub
                        </a>
                        <Link href="/privacy-policy" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">
                            Privacy
                        </Link>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-md hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors"
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
                {!activeMode ? (
                    /* DASHBOARD GRID VIEW */
                    <div className="animate-in">
                        <div className="mb-8">
                            <h1 className="text-3xl font-semibold mb-2">My Calculators</h1>
                            <p className="text-[var(--text-secondary)]">Select a tool to begin computing.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(MODES).map(([key, mode]) => (
                                <div
                                    key={key}
                                    onClick={() => setActiveMode(key)}
                                    className="group relative border border-[var(--border-primary)] bg-[var(--card-bg)] rounded-lg p-6 hover:border-[var(--text-primary)] transition-all cursor-pointer shadow-sm hover:shadow-lg"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-xl border border-[var(--border-subtle)] group-hover:scale-110 transition-transform">
                                            {mode.icon}
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-medium mb-1">{mode.name}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                                        {mode.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* ACTIVE CALCULATOR VIEW */
                    <div className="animate-in">
                        {/* Sub-navigation Tabs */}
                        <div className="flex border-b border-[var(--border-primary)] mb-8 overflow-x-auto no-scrollbar">
                            <button
                                onClick={() => setActiveMode(null)}
                                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors border-b-2 border-transparent"
                            >
                                ← Dashboard
                            </button>
                            {Object.entries(MODES).map(([key, mode]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveMode(key)}
                                    className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeMode === key
                                            ? 'border-[var(--text-primary)] text-[var(--text-primary)]'
                                            : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-primary)]'
                                        }`}
                                >
                                    {mode.name}
                                </button>
                            ))}
                        </div>

                        {/* Component Container */}
                        <div className="w-full">
                            <ActiveComponent />
                        </div>
                    </div>
                )}
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-[var(--border-primary)] py-8 mt-auto bg-[var(--bg-primary)]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-[var(--text-secondary)]">
                    <p>© 2026 Quantix Next. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="/privacy-policy" className="hover:text-[var(--text-primary)] transition-colors">Privacy</Link>
                        <a href="https://github.com/Dageniusdrap/Quanitx-Pro" className="hover:text-[var(--text-primary)] transition-colors">Source</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
