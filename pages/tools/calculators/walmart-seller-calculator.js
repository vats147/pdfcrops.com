import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const WalmartSellerCalculator = () => {
    const [price, setPrice] = useState('');
    const [shipping, setShipping] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('Apparel & Accessories');
    const [results, setResults] = useState(null);

    // Walmart Referral Fees (Simplified)
    const referralFees = {
        'Apparel & Accessories': 15,
        'Electronics': 8,
        'Home & Garden': 15,
        'Toys': 15,
        'Video Games': 15,
        'Beauty': 15,
        'Jewelry': 20
    };

    useEffect(() => {
        calculate();
    }, [price, shipping, cost, category]);

    const calculate = () => {
        const p = parseFloat(price) || 0;
        const s = parseFloat(shipping) || 0;
        const c = parseFloat(cost) || 0;

        if (p === 0) {
            setResults(null);
            return;
        }

        const totalRevenue = p + s;
        const feePercent = referralFees[category];
        const referralFeeAmount = (totalRevenue * feePercent) / 100;
        const totalCost = c + referralFeeAmount;
        const profit = totalRevenue - totalCost;
        const margin = (profit / totalRevenue) * 100;

        setResults({
            revenue: totalRevenue.toFixed(2),
            referralFee: referralFeeAmount.toFixed(2),
            totalCost: totalCost.toFixed(2),
            profit: profit.toFixed(2),
            margin: margin.toFixed(2)
        });
    };

    return (
        <BaseOneLayout>
            <Head>
                <title>Walmart Seller Calculator | Marketplace Fees & Profit</title>
                <meta name="description" content="Calculate Walmart Marketplace referral fees and your net profit. Essential tool for Walmart sellers." />
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
                            Walmart Seller <span className="text-blue-800">Calculator</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Estimate your potential earnings on Walmart Marketplace.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            {Object.keys(referralFees).map((cat) => (
                                                <option key={cat} value={cat}>{cat} ({referralFees[cat]}%)</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Item Price ($)</label>
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Charge ($)</label>
                                        <input
                                            type="number"
                                            value={shipping}
                                            onChange={(e) => setShipping(e.target.value)}
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Item Cost ($)</label>
                                        <input
                                            type="number"
                                            value={cost}
                                            onChange={(e) => setCost(e.target.value)}
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    {results ? (
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Total Revenue</span>
                                                <span className="font-medium text-gray-900">${results.revenue}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Referral Fee ({referralFees[category]}%)</span>
                                                <span className="font-medium text-red-600">-${results.referralFee}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Item Cost</span>
                                                <span className="font-medium text-gray-900">-${cost || 0}</span>
                                            </div>
                                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">Net Profit</span>
                                                <span className={`text-2xl font-extrabold ${parseFloat(results.profit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    ${results.profit}
                                                </span>
                                            </div>
                                            <div className="text-right text-sm text-gray-500">
                                                Margin: {results.margin}%
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400 py-8">
                                            <p>Enter details to calculate</p>
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

export default WalmartSellerCalculator;
