'use client';

import { useState } from 'react';

export default function FinancialCalculator() {
    const [loanAmount, setLoanAmount] = useState('10000');
    const [interestRate, setInterestRate] = useState('5');
    const [loanTerm, setLoanTerm] = useState('5');
    const [loanResult, setLoanResult] = useState(null);

    const [investmentPrincipal, setInvestmentPrincipal] = useState('1000');
    const [investmentRate, setInvestmentRate] = useState('7');
    const [investmentYears, setInvestmentYears] = useState('10');
    const [monthlyContribution, setMonthlyContribution] = useState('100');
    const [investmentResult, setInvestmentResult] = useState(null);

    const calculateLoan = () => {
        const P = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 100 / 12; // Monthly rate
        const n = parseFloat(loanTerm) * 12; // Total months

        // Monthly payment formula: M = P * [r(1 + r)^n] / [(1 + r)^n - 1]
        const monthlyPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPaid = monthlyPayment * n;
        const totalInterest = totalPaid - P;

        // Amortization schedule (first 12 months)
        const schedule = [];
        let balance = P;
        for (let i = 1; i <= Math.min(n, 12); i++) {
            const interestPayment = balance * r;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;

            schedule.push({
                month: i,
                payment: monthlyPayment,
                principal: principalPayment,
                interest: interestPayment,
                balance: Math.max(0, balance)
            });
        }

        setLoanResult({
            monthlyPayment,
            totalPaid,
            totalInterest,
            totalMonths: n,
            schedule
        });
    };

    const calculateInvestment = () => {
        const P = parseFloat(investmentPrincipal);
        const r = parseFloat(investmentRate) / 100;
        const t = parseFloat(investmentYears);
        const PMT = parseFloat(monthlyContribution);

        // Compound interest with monthly contributions
        const n = 12; // Monthly compounding
        const monthlyRate = r / n;
        const periods = n * t;

        // Future value of initial principal
        const futureValuePrincipal = P * Math.pow(1 + monthlyRate, periods);

        // Future value of monthly contributions (annuity)
        const futureValueContributions = PMT * ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate);

        const totalValue = futureValuePrincipal + futureValueContributions;
        const totalContributions = P + (PMT * periods);
        const totalEarnings = totalValue - totalContributions;

        // Year-by-year breakdown
        const yearByYear = [];
        for (let year = 1; year <= t; year++) {
            const periodsThisYear = n * year;
            const valuePrincipal = P * Math.pow(1 + monthlyRate, periodsThisYear);
            const valueContributions = PMT * ((Math.pow(1 + monthlyRate, periodsThisYear) - 1) / monthlyRate);
            const totalThisYear = valuePrincipal + valueContributions;
            const contributionsThisYear = P + (PMT * periodsThisYear);
            const earningsThisYear = totalThisYear - contributionsThisYear;

            yearByYear.push({
                year,
                totalValue: totalThisYear,
                contributions: contributionsThisYear,
                earnings: earningsThisYear
            });
        }

        setInvestmentResult({
            totalValue,
            totalContributions,
            totalEarnings,
            returnRate: (totalEarnings / totalContributions) * 100,
            yearByYear
        });
    };

    const calculateRetirementSavings = (monthlyIncome, currentAge, retirementAge, replacementRate = 70) => {
        const yearsToRetirement = retirementAge - currentAge;
        const annualIncome = monthlyIncome * 12;
        const neededRetirementIncome = (annualIncome * replacementRate) / 100;
        const savingsNeeded = neededRetirementIncome * 25; // 4% withdrawal rule

        return {
            yearsToRetirement,
            neededRetirementIncome,
            savingsNeeded,
            monthlySavingsNeeded: savingsNeeded / (yearsToRetirement * 12)
        };
    };

    return (
        <div className="w-full max-w-5xl mx-auto animate-in">
            <div className="glass rounded-3xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold gradient-text mb-8">💰 Financial Calculator</h2>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Loan Calculator */}
                    <div className="glass rounded-2xl p-8">
                        <h3 className="text-2xl font-semibold mb-4">🏠 Loan Calculator</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                    Loan Amount ($)
                                </label>
                                <input
                                    type="number"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                    Annual Interest Rate (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(e.target.value)}
                                    className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                    Loan Term (years)
                                </label>
                                <input
                                    type="number"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(e.target.value)}
                                    className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                                />
                            </div>

                            <button
                                onClick={calculateLoan}
                                className="w-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] hover:from-[#7c7ff5] hover:to-[#9d70f7] text-white py-3 rounded-xl font-semibold shadow-lg transition-all"
                            >
                                Calculate Loan
                            </button>
                        </div>

                        {loanResult && (
                            <div className="mt-6 space-y-3">
                                <div className="glass rounded-xl p-4">
                                    <div className="text-sm text-[var(--text-secondary)] mb-1">Monthly Payment</div>
                                    <div className="text-3xl font-bold text-white">
                                        ${loanResult.monthlyPayment.toFixed(2)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="glass rounded-xl p-3">
                                        <div className="text-xs text-[var(--text-secondary)] mb-1">Total Paid</div>
                                        <div className="text-lg font-semibold text-white">
                                            ${loanResult.totalPaid.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="glass rounded-xl p-3">
                                        <div className="text-xs text-[var(--text-secondary)] mb-1">Total Interest</div>
                                        <div className="text-lg font-semibold text-white">
                                            ${loanResult.totalInterest.toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-4">
                                    <div className="text-sm text-[var(--text-secondary)] mb-2">First 12 Months</div>
                                    <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
                                        {loanResult.schedule.map(month => (
                                            <div key={month.month} className="flex justify-between text-[var(--text-secondary)]">
                                                <span>Month {month.month}</span>
                                                <span>Balance: ${month.balance.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Investment Calculator */}
                    <div className="glass rounded-2xl p-8">
                        <h3 className="text-2xl font-semibold mb-4">📈 Investment Calculator</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                    Initial Investment ($)
                                </label>
                                <input
                                    type="number"
                                    value={investmentPrincipal}
                                    onChange={(e) => setInvestmentPrincipal(e.target.value)}
                                    className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                    Monthly Contribution ($)
                                </label>
                                <input
                                    type="number"
                                    value={monthlyContribution}
                                    onChange={(e) => setMonthlyContribution(e.target.value)}
                                    className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                    Annual Return Rate (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={investmentRate}
                                    onChange={(e) => setInvestmentRate(e.target.value)}
                                    className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[var(--text-secondary)] mb-2">
                                    Investment Period (years)
                                </label>
                                <input
                                    type="number"
                                    value={investmentYears}
                                    onChange={(e) => setInvestmentYears(e.target.value)}
                                    className="w-full bg-[var(--bg-tertiary)] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                                />
                            </div>

                            <button
                                onClick={calculateInvestment}
                                className="w-full bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] hover:from-[#9d70f7] hover:to-[#f56db4] text-white py-3 rounded-xl font-semibold shadow-lg transition-all"
                            >
                                Calculate Investment
                            </button>
                        </div>

                        {investmentResult && (
                            <div className="mt-6 space-y-3">
                                <div className="glass rounded-xl p-4">
                                    <div className="text-sm text-[var(--text-secondary)] mb-1">Future Value</div>
                                    <div className="text-3xl font-bold text-white">
                                        ${investmentResult.totalValue.toFixed(2)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="glass rounded-xl p-3">
                                        <div className="text-xs text-[var(--text-secondary)] mb-1">Contributions</div>
                                        <div className="text-lg font-semibold text-white">
                                            ${investmentResult.totalContributions.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="glass rounded-xl p-3">
                                        <div className="text-xs text-[var(--text-secondary)] mb-1">Earnings</div>
                                        <div className="text-lg font-semibold text-green-400">
                                            +${investmentResult.totalEarnings.toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-3">
                                    <div className="text-xs text-[var(--text-secondary)] mb-1">Total Return</div>
                                    <div className="text-xl font-semibold text-green-400">
                                        {investmentResult.returnRate.toFixed(2)}%
                                    </div>
                                </div>

                                <div className="glass rounded-xl p-4">
                                    <div className="text-sm text-[var(--text-secondary)] mb-2">Year-by-Year Breakdown</div>
                                    <div className="space-y-1 text-xs max-h-48 overflow-y-auto">
                                        {investmentResult.yearByYear.map(year => (
                                            <div key={year.year} className="flex justify-between text-[var(--text-secondary)]">
                                                <span>Year {year.year}</span>
                                                <span className="text-white">${year.totalValue.toFixed(0)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Financial Tools */}
                <div className="mt-6 pt-6 border-t border-[var(--glass-border)]">
                    <h3 className="text-xl font-semibold mb-4">🧮 Quick Calculations</h3>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="glass rounded-xl p-4">
                            <div className="text-[var(--text-secondary)] mb-1">Rule of 72</div>
                            <div className="text-white">Doubling time = 72 / interest rate</div>
                            <div className="text-[var(--text-tertiary)] mt-1">At 7%: ~10.3 years to double</div>
                        </div>
                        <div className="glass rounded-xl p-4">
                            <div className="text-[var(--text-secondary)] mb-1">4% Rule</div>
                            <div className="text-white">Retirement savings = Annual income × 25</div>
                            <div className="text-[var(--text-tertiary)] mt-1">For $40k/yr: need $1M</div>
                        </div>
                        <div className="glass rounded-xl p-4">
                            <div className="text-[var(--text-secondary)] mb-1">Savings Rate</div>
                            <div className="text-white">Save 20% of gross income</div>
                            <div className="text-[var(--text-tertiary)] mt-1">On $5k/mo: save $1k/mo</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
