import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const GSTCalculator = () => {
    const [amount, setAmount] = useState('');
    const [gstRate, setGstRate] = useState(18);
    const [type, setType] = useState('exclusive'); // exclusive (Add GST) or inclusive (Remove GST)
    const [results, setResults] = useState(null);

    useEffect(() => {
        calculateGST();
    }, [amount, gstRate, type]);

    const calculateGST = () => {
        const principal = parseFloat(amount);
        const rate = parseFloat(gstRate);

        if (isNaN(principal) || isNaN(rate)) {
            setResults(null);
            return;
        }

        let gstAmount = 0;
        let totalAmount = 0;
        let netAmount = 0;

        if (type === 'exclusive') {
            // Add GST
            gstAmount = (principal * rate) / 100;
            totalAmount = principal + gstAmount;
            netAmount = principal;
        } else {
            // Remove GST
            gstAmount = principal - (principal * (100 / (100 + rate)));
            netAmount = principal - gstAmount;
            totalAmount = principal;
        }

        setResults({
            netAmount: netAmount.toFixed(2),
            gstAmount: gstAmount.toFixed(2),
            totalAmount: totalAmount.toFixed(2)
        });
    };

    const gstRates = [3, 5, 12, 18, 28];

    return (
        <BaseOneLayout>
            <Head>
                <title>GST Calculator India 2025 | Calculate GST Inclusive & Exclusive</title>
                <meta name="description" content="Free Online GST Calculator for India. Easily calculate GST inclusive and exclusive amounts. Check tax rates for 5%, 12%, 18%, and 28% slabs." />
                <meta name="keywords" content="gst calculator, gst calculator india, calculate gst, gst inclusive calculator, gst exclusive calculator, goods and service tax" />
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
                            GST <span className="text-purple-600">Calculator India</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Calculate Goods and Services Tax (GST) inclusive and exclusive amounts instantly.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Input Section */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
                                        <div className="flex rounded-md shadow-sm" role="group">
                                            <button
                                                type="button"
                                                onClick={() => setType('exclusive')}
                                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-lg border ${type === 'exclusive'
                                                        ? 'bg-purple-600 text-white border-purple-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                Add GST (Exclusive)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setType('inclusive')}
                                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-lg border-t border-r border-b ${type === 'inclusive'
                                                        ? 'bg-purple-600 text-white border-purple-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                Remove GST (Inclusive)
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {type === 'exclusive' ? 'Initial Amount (₹)' : 'Final Amount (₹)'}
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">₹</span>
                                            </div>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-7 pr-12 sm:text-lg border-gray-300 rounded-md py-3"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">GST Rate (%)</label>
                                        <div className="grid grid-cols-5 gap-2">
                                            {gstRates.map((rate) => (
                                                <button
                                                    key={rate}
                                                    onClick={() => setGstRate(rate)}
                                                    className={`px-2 py-2 text-sm font-medium rounded-md border ${gstRate === rate
                                                            ? 'bg-purple-100 text-purple-700 border-purple-300 ring-2 ring-purple-500 ring-opacity-50'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {rate}%
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-2 relative rounded-md shadow-sm">
                                            <input
                                                type="number"
                                                value={gstRate}
                                                onChange={(e) => setGstRate(e.target.value)}
                                                className="focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Custom Rate"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Results Section */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
                                    {results ? (
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Net Amount (Pre-Tax)</p>
                                                <p className="text-2xl font-bold text-gray-900">₹{results.netAmount}</p>
                                            </div>
                                            <div className="pt-4 border-t border-gray-100">
                                                <p className="text-sm text-gray-500 mb-1">GST Amount ({gstRate}%)</p>
                                                <p className="text-2xl font-bold text-purple-600">+ ₹{results.gstAmount}</p>
                                            </div>
                                            <div className="pt-4 border-t border-gray-100 bg-purple-50 -mx-6 px-6 py-4 mt-2">
                                                <p className="text-sm text-purple-800 mb-1 font-medium">Total Amount</p>
                                                <p className="text-3xl font-extrabold text-purple-900">₹{results.totalAmount}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400 py-8">
                                            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <p className="mt-2">Enter an amount to see the breakdown</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-sm p-8 border border-gray-100 prose max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to use the GST Calculator?</h2>
                        <p className="text-gray-600 mb-6">
                            Our GST Calculator is designed to help you find either the net price (before tax) or the gross price (after tax) of a product or service.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Adding GST (Exclusive)</h3>
                                <p className="text-gray-600 text-sm">
                                    Use this when you have a net amount and want to add GST to it.
                                    <br />
                                    <strong>Formula:</strong> GST Amount = (Original Cost × GST Rate) / 100
                                    <br />
                                    <strong>Net Price:</strong> Original Cost + GST Amount
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Removing GST (Inclusive)</h3>
                                <p className="text-gray-600 text-sm">
                                    Use this when you have a total amount and want to find the pre-tax value.
                                    <br />
                                    <strong>Formula:</strong> GST Amount = Original Cost - [Original Cost × {`{100 / (100 + GST Rate)}`}]
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Current GST Rates in India (2025)</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicable Goods & Services</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">0%</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">Essential items like milk, bread, salt, newspapers, etc.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5%</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">Household necessities like sugar, spices, tea, coffee, etc.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">12%</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">Computers, processed food, mobile phones, etc.</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">18%</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">Most services, capital goods, toiletries, etc. (Standard Rate)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">28%</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">Luxury items, automobiles, consumer durables like AC, fridge.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default GSTCalculator;
