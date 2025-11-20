import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const EbayProfitCalculator = () => {
    const [sellingPrice, setSellingPrice] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [productCategory, setProductCategory] = useState('general');
    const [isAuction, setIsAuction] = useState(false);
    const [shippingCost, setShippingCost] = useState('');
    const [results, setResults] = useState(null);

    const calculateProfit = () => {
        const selling = parseFloat(sellingPrice) || 0;
        const cost = parseFloat(costPrice) || 0;
        const shipping = parseFloat(shippingCost) || 0;

        // eBay final value fee rates (2024-2025) - varies by category
        const fvfRates = {
            general: 0.125, // 12.5%
            electronics: 0.08, // 8%
            fashion: 0.125, // 12.5%
            collectibles: 0.15, // 15%
            motors: 0.10, // 10%
            business: 0.12 // 12%
        };

        const finalValueFee = selling * (fvfRates[productCategory] || 0.125);

        // Insertion fee (for auction-style listings)
        const insertionFee = isAuction ? 35 : 0; // ₹35 for auctions

        // PayPal or managed payments fee (approx 3%)
        const paymentProcessingFee = selling * 0.03;

        // International transaction fee (if applicable) - 1%
        const internationalFee = selling * 0.01;

        // Advertising fee (optional but common - 2%)
        const adFee = selling * 0.02;

        const totalFees = finalValueFee + insertionFee + paymentProcessingFee + internationalFee + adFee;
        const totalCost = cost + shipping + totalFees;
        const netProfit = selling - totalCost;
        const profitMargin = selling > 0 ? ((netProfit / selling) * 100).toFixed(2) : 0;
        const roi = cost > 0 ? ((netProfit / cost) * 100).toFixed(2) : 0;

        setResults({
            sellingPrice: selling.toFixed(2),
            finalValueFee: finalValueFee.toFixed(2),
            insertionFee: insertionFee.toFixed(2),
            paymentProcessingFee: paymentProcessingFee.toFixed(2),
            internationalFee: internationalFee.toFixed(2),
            adFee: adFee.toFixed(2),
            totalFees: totalFees.toFixed(2),
            totalCost: totalCost.toFixed(2),
            netProfit: netProfit.toFixed(2),
            profitMargin,
            roi
        });
    };

    useEffect(() => {
        if (sellingPrice || costPrice) {
            calculateProfit();
        }
    }, [sellingPrice, costPrice, productCategory, isAuction, shippingCost]);

    return (
        <BaseOneLayout>
            <Head>
                <title>eBay Fee Calculator 2025 | Final Value Fee & Profit Calculator</title>
                <meta name="description" content="Calculate eBay seller fees including final value fees, insertion fees, PayPal charges, and net profit. Free eBay profit calculator for 2025." />
                <meta name="keywords" content="ebay fee calculator, ebay profit calculator, ebay final value fee, ebay seller calculator, ebay commission calculator" />
                <link rel="canonical" href="https://pdfcrops.com/tools/calculators/ebay-profit-calculator" />
            </Head>

            <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                            <span className="text-4xl">🏷️</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
                            eBay Fee & <span className="text-green-600">Profit Calculator</span>
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Calculate eBay final value fees, insertion fees, PayPal charges, and your actual profit margin.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Listing Details</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Listing Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setIsAuction(false)}
                                            className={`py-3 px-4 rounded-lg font-medium transition-all ${!isAuction
                                                    ? 'bg-green-600 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Buy It Now
                                        </button>
                                        <button
                                            onClick={() => setIsAuction(true)}
                                            className={`py-3 px-4 rounded-lg font-medium transition-all ${isAuction
                                                    ? 'bg-green-600 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            Auction
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Category
                                    </label>
                                    <select
                                        value={productCategory}
                                        onChange={(e) => setProductCategory(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    >
                                        <option value="general">General Items (12.5%)</option>
                                        <option value="electronics">Electronics (8%)</option>
                                        <option value="fashion">Fashion & Accessories (12.5%)</option>
                                        <option value="collectibles">Collectibles (15%)</option>
                                        <option value="motors">Motors & Vehicles (10%)</option>
                                        <option value="business">Business & Industrial (12%)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Selling Price (₹/$) *
                                    </label>
                                    <input
                                        type="number"
                                        value={sellingPrice}
                                        onChange={(e) => setSellingPrice(e.target.value)}
                                        placeholder="Enter selling price"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Cost (₹/$) *
                                    </label>
                                    <input
                                        type="number"
                                        value={costPrice}
                                        onChange={(e) => setCostPrice(e.target.value)}
                                        placeholder="Enter cost price"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shipping Cost (₹/$)
                                    </label>
                                    <input
                                        type="number"
                                        value={shippingCost}
                                        onChange={(e) => setShippingCost(e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Your cost to ship the item</p>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-lg p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6">Fee Breakdown</h2>

                            {results ? (
                                <div className="space-y-4">
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-sm opacity-90">Selling Price</p>
                                        <p className="text-3xl font-bold">₹{results.sellingPrice}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Final Value Fee ({productCategory})</span>
                                            <span className="font-semibold">- ₹{results.finalValueFee}</span>
                                        </div>
                                        {isAuction && parseFloat(results.insertionFee) > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm opacity-90">Insertion Fee (Auction)</span>
                                                <span className="font-semibold">- ₹{results.insertionFee}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Payment Processing (3%)</span>
                                            <span className="font-semibold">- ₹{results.paymentProcessingFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">International Fee (1%)</span>
                                            <span className="font-semibold">- ₹{results.internationalFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Promoted Listings (2%)</span>
                                            <span className="font-semibold">- ₹{results.adFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-white border-opacity-30 pt-3">
                                            <span className="font-medium">Total eBay Fees</span>
                                            <span className="font-bold">- ₹{results.totalFees}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Product Cost</span>
                                            <span className="font-semibold">- ₹{costPrice || '0'}</span>
                                        </div>
                                        {parseFloat(shippingCost) > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm opacity-90">Shipping Cost</span>
                                                <span className="font-semibold">- ₹{shippingCost}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-white bg-opacity-30 rounded-lg p-6 backdrop-blur-sm border-2 border-white border-opacity-50 mt-4">
                                        <p className="text-sm opacity-90 mb-1">Net Profit Per Sale</p>
                                        <p className={`text-4xl font-bold ${parseFloat(results.netProfit) >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                                            ₹{results.netProfit}
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white border-opacity-30">
                                            <div>
                                                <p className="text-xs opacity-75">Profit Margin</p>
                                                <p className="text-xl font-bold">{results.profitMargin}%</p>
                                            </div>
                                            <div>
                                                <p className="text-xs opacity-75">ROI</p>
                                                <p className="text-xl font-bold">{results.roi}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4 opacity-50">🔢</div>
                                    <p className="text-lg opacity-90">Enter listing details to calculate fees</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding eBay Fees</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-green-600 mb-3">💰 Final Value Fee (FVF)</h3>
                                <p className="text-gray-600 mb-3">This is eBay's main commission, charged when an item sells:</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Electronics:</strong> 8%</li>
                                    <li>• <strong>Motors:</strong> 10%</li>
                                    <li>• <strong>Business Items:</strong> 12%</li>
                                    <li>• <strong>General/Fashion:</strong> 12.5%</li>
                                    <li>• <strong>Collectibles:</strong> 15%</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-emerald-600 mb-3">📝 Insertion Fees</h3>
                                <p className="text-gray-600 mb-3">Charged for listing items:</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Buy It Now:</strong> Usually free (first 250 listings/month)</li>
                                    <li>• <strong>Auction-style:</strong> ₹35 per listing</li>
                                    <li>• <strong>Additional Listings:</strong> Small fee after free allocation</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-teal-600 mb-3">💳 Payment Processing</h3>
                                <p className="text-gray-600 mb-3">Fees for handling customer payments:</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Credit/Debit Card:</strong> ~3%</li>
                                    <li>• <strong>PayPal:</strong> 2.9% + fixed fee</li>
                                    <li>• <strong>Managed Payments:</strong> Included in overall fee structure</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">📢 Optional Fees</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Promoted Listings:</strong> 2-20% ad fee (optional)</li>
                                    <li>• <strong>International Sales:</strong> ~1% extra fee</li>
                                    <li>• <strong>Subtitle:</strong> ₹50 per listing</li>
                                    <li>• <strong>Bold Title:</strong> ₹80 per listing</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 eBay Selling Tips</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">📸</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Quality Photos</h4>
                                <p className="text-sm text-gray-600">Use high-quality images from multiple angles to increase conversion rates.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">⭐</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Build Reputation</h4>
                                <p className="text-sm text-gray-600">Maintain high feedback scores and fast shipping for better visibility.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">🎯</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Smart Pricing</h4>
                                <p className="text-sm text-gray-600">Research competitors and use promoted listings strategically for high-value items.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default EbayProfitCalculator;
