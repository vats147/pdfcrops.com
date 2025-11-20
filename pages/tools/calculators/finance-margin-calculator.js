import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const FinanceMarginCalculator = () => {
    const [cost, setCost] = useState('');
    const [revenue, setRevenue] = useState('');
    const [margin, setMargin] = useState('');
    const [markup, setMarkup] = useState('');
    const [profit, setProfit] = useState('');

    // Mode: 'find-margin' (have cost & revenue), 'find-revenue' (have cost & target margin)
    const [mode, setMode] = useState('find-margin');

    useEffect(() => {
        calculate();
    }, [cost, revenue, margin, mode]);

    const calculate = () => {
        const c = parseFloat(cost);

        if (mode === 'find-margin') {
            const r = parseFloat(revenue);
            if (!isNaN(c) && !isNaN(r) && r !== 0) {
                const p = r - c;
                const m = (p / r) * 100;
                const mu = (p / c) * 100;

                setProfit(p.toFixed(2));
                setMargin(m.toFixed(2));
                setMarkup(isFinite(mu) ? mu.toFixed(2) : '0');
            } else {
                setProfit('');
                // Don't clear margin input if user is typing, but here margin is output
            }
        } else {
            // find-revenue
            const m = parseFloat(margin);
            if (!isNaN(c) && !isNaN(m) && m < 100) {
                // Revenue = Cost / (1 - Margin%)
                const r = c / (1 - (m / 100));
                const p = r - c;
                const mu = (p / c) * 100;

                setRevenue(r.toFixed(2));
                setProfit(p.toFixed(2));
                setMarkup(mu.toFixed(2));
            }
        }
    };

    return (
        <BaseOneLayout>
            <Head>
                <title>Finance Margin Calculator | Calculate Profit Margin & Markup</title>
                <meta name="description" content="Free Finance Margin Calculator. Calculate gross profit margin, markup percentage, and determine the selling price based on your desired margin." />
                <meta name="keywords" content="margin calculator, profit margin, markup calculator, gross margin, finance calculator" />
            </Head>

            <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Link href="/tools/calculators">
                            <a className="text-brandPrimaryColor hover:text-brandDarkColor flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Calculators
                            </a>
                        </Link>
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Finance Margin <span className="text-green-600">Calculator</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Analyze your product pricing, profit margins, and markup.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-6 sm:p-8 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">

                            {/* Mode Selection */}
                            <div className="flex justify-center mb-8">
                                <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex">
                                    <button
                                        onClick={() => { setMode('find-margin'); setRevenue(''); setMargin(''); }}
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'find-margin'
                                                ? 'bg-green-100 text-green-700'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        Find Margin
                                    </button>
                                    <button
                                        onClick={() => { setMode('find-revenue'); setRevenue(''); setMargin(''); }}
                                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'find-revenue'
                                                ? 'bg-green-100 text-green-700'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                    >
                                        Find Selling Price
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Input Section */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cost of Goods (₹)</label>
                                        <input
                                            type="number"
                                            value={cost}
                                            onChange={(e) => setCost(e.target.value)}
                                            className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                            placeholder="e.g. 100"
                                        />
                                    </div>

                                    {mode === 'find-margin' ? (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (Revenue) (₹)</label>
                                            <input
                                                type="number"
                                                value={revenue}
                                                onChange={(e) => setRevenue(e.target.value)}
                                                className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                                placeholder="e.g. 150"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Desired Margin (%)</label>
                                            <input
                                                type="number"
                                                value={margin}
                                                onChange={(e) => setMargin(e.target.value)}
                                                className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                                placeholder="e.g. 20"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Results Section */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
                                    <div className="space-y-6">
                                        {mode === 'find-margin' ? (
                                            <>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500 mb-1">Gross Margin</p>
                                                        <p className="text-2xl font-bold text-green-600">{margin || '0'}%</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 mb-1">Markup</p>
                                                        <p className="text-2xl font-bold text-blue-600">{markup || '0'}%</p>
                                                    </div>
                                                </div>
                                                <div className="pt-4 border-t border-gray-100">
                                                    <p className="text-sm text-gray-500 mb-1">Net Profit</p>
                                                    <p className="text-3xl font-extrabold text-gray-900">₹{profit || '0.00'}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Required Selling Price</p>
                                                    <p className="text-3xl font-extrabold text-green-600">₹{revenue || '0.00'}</p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                                    <div>
                                                        <p className="text-sm text-gray-500 mb-1">Profit</p>
                                                        <p className="text-xl font-bold text-gray-900">₹{profit || '0.00'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 mb-1">Markup</p>
                                                        <p className="text-xl font-bold text-blue-600">{markup || '0'}%</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-sm p-8 border border-gray-100 prose max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Margin vs. Markup: What's the difference?</h2>
                        <p className="text-gray-600 mb-6">
                            Many business owners confuse margin and markup. While they use the same inputs (cost and revenue), they represent different metrics.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-green-50 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-green-900 mb-2">Gross Margin</h3>
                                <p className="text-green-800 mb-4">
                                    Percentage of revenue that is profit.
                                </p>
                                <code className="block bg-white p-2 rounded text-sm text-green-900">
                                    Margin = ((Price - Cost) / Price) × 100
                                </code>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-blue-900 mb-2">Markup</h3>
                                <p className="text-blue-800 mb-4">
                                    Percentage added to the cost to get the selling price.
                                </p>
                                <code className="block bg-white p-2 rounded text-sm text-blue-900">
                                    Markup = ((Price - Cost) / Cost) × 100
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default FinanceMarginCalculator;
