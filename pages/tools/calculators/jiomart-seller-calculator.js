import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const JioMartProfitCalculator = () => {
    const [sellingPrice, setSellingPrice] = useState('');
    const [category, setCategory] = useState('Apparel');
    const [results, setResults] = useState(null);

    // Simplified commission structure for demo purposes
    // In a real app, this would be a comprehensive object
    const categories = {
        'Apparel': 15,
        'Electronics': 10,
        'Home & Kitchen': 12,
        'Beauty': 8,
        'Grocery': 5,
        'Footwear': 12
    };

    useEffect(() => {
        calculateProfit();
    }, [sellingPrice, category]);

    const calculateProfit = () => {
        const price = parseFloat(sellingPrice);
        if (isNaN(price)) {
            setResults(null);
            return;
        }

        const commissionRate = categories[category];
        const commission = (price * commissionRate) / 100;
        const gst = (commission * 18) / 100; // 18% GST on commission
        const fixedFee = 10; // Hypothetical fixed fee
        const totalFees = commission + gst + fixedFee;
        const netProfit = price - totalFees;

        setResults({
            commission: commission.toFixed(2),
            gst: gst.toFixed(2),
            fixedFee: fixedFee.toFixed(2),
            totalFees: totalFees.toFixed(2),
            netProfit: netProfit.toFixed(2),
            margin: ((netProfit / price) * 100).toFixed(2)
        });
    };

    return (
        <BaseOneLayout>
            <Head>
                <title>JioMart Seller Calculator 2025 | Calculate Fees & Profit</title>
                <meta name="description" content="Calculate your JioMart seller fees, commissions, and net profit. Optimize your pricing for JioMart marketplace." />
                <meta name="keywords" content="jiomart calculator, jiomart seller fees, jiomart commission, jiomart profit calculator" />
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
                            JioMart Seller <span className="text-red-600">Calculator</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Estimate your earnings on India's fastest growing marketplace.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-6 sm:p-8 bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                                        >
                                            {Object.keys(categories).map((cat) => (
                                                <option key={cat} value={cat}>{cat} ({categories[cat]}% Comm.)</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (₹)</label>
                                        <input
                                            type="number"
                                            value={sellingPrice}
                                            onChange={(e) => setSellingPrice(e.target.value)}
                                            className="focus:ring-red-500 focus:border-red-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    {results ? (
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Commission ({categories[category]}%)</span>
                                                <span className="font-medium text-gray-900">- ₹{results.commission}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">GST (18%)</span>
                                                <span className="font-medium text-gray-900">- ₹{results.gst}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Fixed Fee</span>
                                                <span className="font-medium text-gray-900">- ₹{results.fixedFee}</span>
                                            </div>
                                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">Net Profit</span>
                                                <span className="text-2xl font-extrabold text-green-600">₹{results.netProfit}</span>
                                            </div>
                                            <div className="text-right text-sm text-gray-500">
                                                Margin: {results.margin}%
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400 py-8">
                                            <p>Enter details to see breakdown</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default JioMartProfitCalculator;
