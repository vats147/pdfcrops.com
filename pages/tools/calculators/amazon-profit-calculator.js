import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const AmazonProfitCalculator = () => {
    const [sellingPrice, setSellingPrice] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [fulfillmentType, setFulfillmentType] = useState('FBA'); // FBA or FBM
    const [productCategory, setProductCategory] = useState('general');
    const [weight, setWeight] = useState('');
    const [results, setResults] = useState(null);

    const calculateProfit = () => {
        const selling = parseFloat(sellingPrice) || 0;
        const cost = parseFloat(costPrice) || 0;
        const productWeight = parseFloat(weight) || 0.5; // default 500g

        // Amazon referral fee rates (2024-2025)
        const referralRates = {
            general: 0.15, // 15%
            electronics: 0.08, // 8%
            fashion: 0.12, // 12%
            books: 0.15, // 15%
            jewelry: 0.05, // 5%
            beauty: 0.15 // 15%
        };

        const referralFee = selling * (referralRates[productCategory] || 0.15);

        // Closing fee (₹25-50 depending on selling price)
        const closingFee = selling < 500 ? 25 : selling < 1000 ? 30 : 50;

        // FBA fees (if applicable) - weight-based
        let fbaFee = 0;
        if (fulfillmentType === 'FBA') {
            if (productWeight <= 0.5) {
                fbaFee = 39;
            } else if (productWeight <= 1) {
                fbaFee = 55;
            } else if (productWeight <= 2) {
                fbaFee = 85;
            } else {
                fbaFee = 85 + ((productWeight - 2) * 20); // ₹20 per additional kg
            }
        }

        // FBM shipping (if seller fulfills)
        const fbmShipping = fulfillmentType === 'FBM' ? 50 : 0; // Average shipping cost

        // Payment processing fee
        const paymentFee = selling * 0.02; // 2%

        // GST calculation (on referral + closing fee)
        const gstOnFees = (referralFee + closingFee) * 0.18;

        const totalFees = referralFee + closingFee + fbaFee + fbmShipping + paymentFee + gstOnFees;
        const totalCost = cost + totalFees;
        const netProfit = selling - totalCost;
        const profitMargin = selling > 0 ? ((netProfit / selling) * 100).toFixed(2) : 0;
        const roi = cost > 0 ? ((netProfit / cost) * 100).toFixed(2) : 0;

        setResults({
            sellingPrice: selling.toFixed(2),
            referralFee: referralFee.toFixed(2),
            closingFee: closingFee.toFixed(2),
            fbaFee: fbaFee.toFixed(2),
            fbmShipping: fbmShipping.toFixed(2),
            paymentFee: paymentFee.toFixed(2),
            gstOnFees: gstOnFees.toFixed(2),
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
    }, [sellingPrice, costPrice, fulfillmentType, productCategory, weight]);

    return (
        <BaseOneLayout>
            <Head>
                <title>Amazon FBA & FBM Profit Calculator 2025 | Fee Calculator India</title>
                <meta name="description" content="Free Amazon India profit calculator. Calculate FBA fees, referral fees, closing fees, and net profit for Amazon sellers. Updated for 2025." />
                <meta name="keywords" content="amazon profit calculator, amazon fba calculator, amazon fee calculator india, amazon seller calculator, fba fee calculator" />
                <link rel="canonical" href="https://pdfcrops.com/tools/calculators/amazon-profit-calculator" />
            </Head>

            <div className="bg-gradient-to-br from-yellow-50 via-white to-orange-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-yellow-100 rounded-full mb-4">
                            <span className="text-4xl">📦</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
                            Amazon FBA & FBM <span className="text-yellow-600">Profit Calculator</span>
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Calculate Amazon referral fees, FBA fees, closing fees, and your actual profit margin.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product & Pricing Details</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fulfillment Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setFulfillmentType('FBA')}
                                            className={`py-3 px-4 rounded-lg font-medium transition-all ${fulfillmentType === 'FBA'
                                                    ? 'bg-yellow-600 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            FBA (Fulfilled by Amazon)
                                        </button>
                                        <button
                                            onClick={() => setFulfillmentType('FBM')}
                                            className={`py-3 px-4 rounded-lg font-medium transition-all ${fulfillmentType === 'FBM'
                                                    ? 'bg-yellow-600 text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            FBM (Self Ship)
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
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                                    >
                                        <option value="general">General Products (15%)</option>
                                        <option value="electronics">Electronics (8%)</option>
                                        <option value="fashion">Fashion & Apparel (12%)</option>
                                        <option value="books">Books (15%)</option>
                                        <option value="jewelry">Jewelry (5%)</option>
                                        <option value="beauty">Beauty & Personal Care (15%)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Selling Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        value={sellingPrice}
                                        onChange={(e) => setSellingPrice(e.target.value)}
                                        placeholder="Enter selling price"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Cost Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        value={costPrice}
                                        onChange={(e) => setCostPrice(e.target.value)}
                                        placeholder="Enter cost price"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        placeholder="0.5"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Used to calculate FBA fees</p>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl shadow-lg p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6">Fee Breakdown & Profit</h2>

                            {results ? (
                                <div className="space-y-4">
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-sm opacity-90">Selling Price</p>
                                        <p className="text-3xl font-bold">₹{results.sellingPrice}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Referral Fee ({productCategory})</span>
                                            <span className="font-semibold">- ₹{results.referralFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Closing Fee</span>
                                            <span className="font-semibold">- ₹{results.closingFee}</span>
                                        </div>
                                        {fulfillmentType === 'FBA' && parseFloat(results.fbaFee) > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm opacity-90">FBA Fee ({weight || 0.5} kg)</span>
                                                <span className="font-semibold">- ₹{results.fbaFee}</span>
                                            </div>
                                        )}
                                        {fulfillmentType === 'FBM' && parseFloat(results.fbmShipping) > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm opacity-90">Shipping Cost (Est.)</span>
                                                <span className="font-semibold">- ₹{results.fbmShipping}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Payment Processing (2%)</span>
                                            <span className="font-semibold">- ₹{results.paymentFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">GST on Fees (18%)</span>
                                            <span className="font-semibold">- ₹{results.gstOnFees}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-white border-opacity-30 pt-3">
                                            <span className="font-medium">Total Amazon Fees</span>
                                            <span className="font-bold">- ₹{results.totalFees}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Product Cost</span>
                                            <span className="font-semibold">- ₹{costPrice || '0'}</span>
                                        </div>
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
                                    <div className="text-6xl mb-4 opacity-50">📊</div>
                                    <p className="text-lg opacity-90">Enter product details to calculate profit</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Amazon Fee Structure 2025</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-yellow-600 mb-3">📋 Referral Fees</h3>
                                <p className="text-gray-600 mb-3">Amazon charges a percentage-based referral fee on each sale:</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Electronics:</strong> 8%</li>
                                    <li>• <strong>Jewelry:</strong> 5%</li>
                                    <li>• <strong>Fashion:</strong> 12%</li>
                                    <li>• <strong>General Products:</strong> 15%</li>
                                    <li>• <strong>Beauty & Books:</strong> 15%</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-orange-600 mb-3">📦 FBA vs FBM</h3>
                                <p className="text-gray-600 mb-3"><strong>FBA (Fulfilled by Amazon):</strong></p>
                                <ul className="space-y-1 text-gray-600 mb-3">
                                    <li>• Amazon handles storage, packing, shipping</li>
                                    <li>• Weight-based fees: ₹39-₹200+</li>
                                    <li>• Higher customer trust & Prime eligibility</li>
                                </ul>
                                <p className="text-gray-600 mb-2"><strong>FBM (Fulfilled by Merchant):</strong></p>
                                <ul className="space-y-1 text-gray-600">
                                    <li>• You handle shipping yourself</li>
                                    <li>• Lower fees but more operational work</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">💳 Closing Fee</h3>
                                <p className="text-gray-600">
                                    A fixed fee charged on each order:
                                </p>
                                <ul className="space-y-2 text-gray-600 mt-2">
                                    <li>• Below ₹500: ₹25</li>
                                    <li>• ₹500-₹1000: ₹30</li>
                                    <li>• Above ₹1000: ₹50</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-green-600 mb-3">🧾 GST & Other Charges</h3>
                                <p className="text-gray-600">
                                    <strong>18% GST</strong> is applicable on referral fee and closing fee. Payment processing fees (~2%) are charged on the total selling price for digital transactions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Amazon Selling Tips</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">⚖️</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Optimize Weight</h4>
                                <p className="text-sm text-gray-600">Reduce packaging weight to lower FBA fees. Every 100g saved impacts profit.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">⭐</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Get Reviews</h4>
                                <p className="text-sm text-gray-600">More reviews = better ranking = more sales. Use Amazon's Request a Review button.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">📊</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Track Inventory</h4>
                                <p className="text-sm text-gray-600">Monitor FBA storage fees. Long-term storage adds to costs significantly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default AmazonProfitCalculator;
