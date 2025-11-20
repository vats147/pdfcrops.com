import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const EtsySellerCalculator = () => {
    const [price, setPrice] = useState('');
    const [shippingCharge, setShippingCharge] = useState('');
    const [cost, setCost] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [advertising, setAdvertising] = useState('');
    const [results, setResults] = useState(null);

    // Etsy Fees Constants
    const LISTING_FEE = 0.20; // $0.20 per item
    const TRANSACTION_FEE_RATE = 0.065; // 6.5%
    const PAYMENT_PROCESSING_RATE = 0.03; // 3% + $0.25 (Standard US)
    const PAYMENT_PROCESSING_FIXED = 0.25;

    useEffect(() => {
        calculate();
    }, [price, shippingCharge, cost, shippingCost, advertising]);

    const calculate = () => {
        const p = parseFloat(price) || 0;
        const s_charge = parseFloat(shippingCharge) || 0;
        const c = parseFloat(cost) || 0;
        const s_cost = parseFloat(shippingCost) || 0;
        const ad = parseFloat(advertising) || 0;

        if (p === 0) {
            setResults(null);
            return;
        }

        const revenue = p + s_charge;

        // Fees
        const transactionFee = revenue * TRANSACTION_FEE_RATE;
        const paymentFee = (revenue * PAYMENT_PROCESSING_RATE) + PAYMENT_PROCESSING_FIXED;
        const listingFee = LISTING_FEE;

        const totalFees = transactionFee + paymentFee + listingFee + ad;
        const totalCosts = c + s_cost + totalFees;

        const profit = revenue - totalCosts;
        const margin = (profit / revenue) * 100;

        setResults({
            revenue: revenue.toFixed(2),
            listingFee: listingFee.toFixed(2),
            transactionFee: transactionFee.toFixed(2),
            paymentFee: paymentFee.toFixed(2),
            totalFees: totalFees.toFixed(2),
            profit: profit.toFixed(2),
            margin: margin.toFixed(2)
        });
    };

    return (
        <BaseOneLayout>
            <Head>
                <title>Etsy Seller Calculator | Fees & Profit Estimator</title>
                <meta name="description" content="Calculate your Etsy seller fees, including listing, transaction, and payment processing fees. Estimate your net profit accurately." />
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
                            Etsy Seller <span className="text-orange-600">Calculator</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Find out exactly how much you'll make on each Etsy sale.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-6 sm:p-8 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price ($)</label>
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Charge ($)</label>
                                        <input
                                            type="number"
                                            value={shippingCharge}
                                            onChange={(e) => setShippingCharge(e.target.value)}
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Item Cost ($)</label>
                                        <input
                                            type="number"
                                            value={cost}
                                            onChange={(e) => setCost(e.target.value)}
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Cost ($)</label>
                                        <input
                                            type="number"
                                            value={shippingCost}
                                            onChange={(e) => setShippingCost(e.target.value)}
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Advertising / Offsite Ads ($)</label>
                                        <input
                                            type="number"
                                            value={advertising}
                                            onChange={(e) => setAdvertising(e.target.value)}
                                            className="focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-lg border-gray-300 rounded-md py-3"
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
                                            <div className="pt-2 border-t border-gray-50">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-500">Listing Fee</span>
                                                    <span className="text-red-600">-${results.listingFee}</span>
                                                </div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-500">Transaction Fee (6.5%)</span>
                                                    <span className="text-red-600">-${results.transactionFee}</span>
                                                </div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-500">Payment Proc. (3% + $0.25)</span>
                                                    <span className="text-red-600">-${results.paymentFee}</span>
                                                </div>
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

export default EtsySellerCalculator;
