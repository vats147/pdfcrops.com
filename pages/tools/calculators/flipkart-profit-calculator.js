import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const FlipkartProfitCalculator = () => {
    const [sellingPrice, setSellingPrice] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [productCategory, setProductCategory] = useState('fashion');
    const [shippingZone, setShippingZone] = useState('local');
    const [weight, setWeight] = useState('');
    const [results, setResults] = useState(null);

    const calculateProfit = () => {
        const selling = parseFloat(sellingPrice) || 0;
        const cost = parseFloat(costPrice) || 0;
        const productWeight = parseFloat(weight) || 0.5;

        // Flipkart commission rates (2024-2025)
        const commissionRates = {
            fashion: 0.18, // 18%
            electronics: 0.06, // 6%
            home: 0.14, // 14%
            books: 0.12, // 12%
            beauty: 0.16, // 16%
            mobile: 0.04 // 4%
        };

        const commission = selling * (commissionRates[productCategory] || 0.14);

        // Collection fee (fixed per order)
        const collectionFee = 20;

        // Shipping fee based on zone and weight
        let shippingFee = 0;
        if (shippingZone === 'local') {
            shippingFee = productWeight <= 0.5 ? 42 : productWeight <= 1 ? 55 : 70;
        } else if (shippingZone === 'regional') {
            shippingFee = productWeight <= 0.5 ? 58 : productWeight <= 1 ? 75 : 95;
        } else { // national
            shippingFee = productWeight <= 0.5 ? 68 : productWeight <= 1 ? 90 : 115;
        }

        // Pickup & packaging fee
        const pickupFee = 25;

        // Fixed fee (based on selling price)
        const fixedFee = selling < 500 ? 20 : selling < 1000 ? 30 : 40;

        // Payment gateway fee
        const paymentFee = selling * 0.02; // 2%

        // GST on commission and fees (18%)
        const gstOnFees = (commission + collectionFee + fixedFee) * 0.18;

        const totalFees = commission + collectionFee + shippingFee + pickupFee + fixedFee + paymentFee + gstOnFees;
        const totalCost = cost + totalFees;
        const netProfit = selling - totalCost;
        const profitMargin = selling > 0 ? ((netProfit / selling) * 100).toFixed(2) : 0;
        const roi = cost > 0 ? ((netProfit / cost) * 100).toFixed(2) : 0;

        setResults({
            sellingPrice: selling.toFixed(2),
            commission: commission.toFixed(2),
            collectionFee: collectionFee.toFixed(2),
            shippingFee: shippingFee.toFixed(2),
            pickupFee: pickupFee.toFixed(2),
            fixedFee: fixedFee.toFixed(2),
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
    }, [sellingPrice, costPrice, productCategory, shippingZone, weight]);

    return (
        <BaseOneLayout>
            <Head>
                <title>Flipkart Seller Profit Calculator 2025 | Commission & Fee Calculator</title>
                <meta name="description" content="Calculate Flipkart seller fees, commission, shipping charges, and net profit. Free Flipkart profit calculator for Indian sellers updated for 2025." />
                <meta name="keywords" content="flipkart profit calculator, flipkart seller calculator, flipkart commission calculator, flipkart fee calculator, flipkart margin calculator" />
                <link rel="canonical" href="https://pdfcrops.com/tools/calculators/flipkart-profit-calculator" />
            </Head>

            <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                            <span className="text-4xl">🛍️</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
                            Flipkart Seller <span className="text-blue-600">Profit Calculator</span>
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Calculate Flipkart commission, shipping fees, and actual profit margins for your products.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Category
                                    </label>
                                    <select
                                        value={productCategory}
                                        onChange={(e) => setProductCategory(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="fashion">Fashion & Lifestyle (18%)</option>
                                        <option value="mobile">Mobiles (4%)</option>
                                        <option value="electronics">Electronics (6%)</option>
                                        <option value="books">Books (12%)</option>
                                        <option value="home">Home & Furniture (14%)</option>
                                        <option value="beauty">Beauty & Personal Care (16%)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shipping Zone
                                    </label>
                                    <select
                                        value={shippingZone}
                                        onChange={(e) => setShippingZone(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="local">Local (Same City)</option>
                                        <option value="regional">Regional (Same State/Zone)</option>
                                        <option value="national">National (Pan India)</option>
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
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Cost (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        value={costPrice}
                                        onChange={(e) => setCostPrice(e.target.value)}
                                        placeholder="Enter cost price"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Affects shipping charges</p>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6">Expense & Profit Details</h2>

                            {results ? (
                                <div className="space-y-4">
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-sm opacity-90">Selling Price</p>
                                        <p className="text-3xl font-bold">₹{results.sellingPrice}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Commission ({productCategory})</span>
                                            <span className="font-semibold">- ₹{results.commission}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Collection Fee</span>
                                            <span className="font-semibold">- ₹{results.collectionFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Shipping ({shippingZone})</span>
                                            <span className="font-semibold">- ₹{results.shippingFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Pickup & Packaging</span>
                                            <span className="font-semibold">- ₹{results.pickupFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Fixed Fee</span>
                                            <span className="font-semibold">- ₹{results.fixedFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Payment Gateway (2%)</span>
                                            <span className="font-semibold">- ₹{results.paymentFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">GST on Fees (18%)</span>
                                            <span className="font-semibold">- ₹{results.gstOnFees}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-white border-opacity-30 pt-3">
                                            <span className="font-medium">Total Flipkart Fees</span>
                                            <span className="font-bold">- ₹{results.totalFees}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Product Cost</span>
                                            <span className="font-semibold">- ₹{costPrice || '0'}</span>
                                        </div>
                                    </div>

                                    <div className="bg-white bg-opacity-30 rounded-lg p-6 backdrop-blur-sm border-2 border-white border-opacity-50 mt-4">
                                        <p className="text-sm opacity-90 mb-1">Net Profit Per Unit</p>
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
                                    <div className="text-6xl mb-4 opacity-50">💰</div>
                                    <p className="text-lg opacity-90">Fill in product details to see results</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Flipkart Fee Structure Explained</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">💼 Commission Rates</h3>
                                <p className="text-gray-600 mb-3">Flipkart charges commission based on product category:</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Mobiles:</strong> 4% (lowest)</li>
                                    <li>• <strong>Electronics:</strong> 6%</li>
                                    <li>• <strong>Books:</strong> 12%</li>
                                    <li>• <strong>Home & Furniture:</strong> 14%</li>
                                    <li>• <strong>Beauty:</strong> 16%</li>
                                    <li>• <strong>Fashion:</strong> 18% (highest)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-indigo-600 mb-3">📦 Shipping Charges</h3>
                                <p className="text-gray-600 mb-3">Shipping fees vary by zone and weight:</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Local:</strong> ₹42-70 (within city)</li>
                                    <li>• <strong>Regional:</strong> ₹58-95 (within state)</li>
                                    <li>• <strong>National:</strong> ₹68-115 (pan-India)</li>
                                </ul>
                                <p className="text-sm text-gray-500 mt-2">Heavier items ({'>'}1kg) attract additional charges</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">💳 Payment & Collection</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Collection Fee:</strong> ₹20 per order (COD/Prepaid)</li>
                                    <li>• <strong>Payment Gateway:</strong> ~2% on online payments</li>
                                    <li>• <strong>Fixed Fee:</strong> ₹20-40 based on price</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-green-600 mb-3">🏷️ Additional Fees</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Pickup Fee:</strong> ₹25 for product collection</li>
                                    <li>• <strong>GST:</strong> 18% on commission and most fees</li>
                                    <li>• <strong>Return Shipping:</strong> Shared based on fault</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Tips to Maximize Flipkart Profit</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">🎁</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Optimize Packaging</h4>
                                <p className="text-sm text-gray-600">Use lightweight packaging to reduce shipping costs without compromising safety.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">🚀</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Join Flipkart Plus</h4>
                                <p className="text-sm text-gray-600">Get Flipkart Assured badge for better visibility and higher sales conversion.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">📈</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Regional Focus</h4>
                                <p className="text-sm text-gray-600">Target local/regional markets first to minimize shipping costs and maximize profit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default FlipkartProfitCalculator;
