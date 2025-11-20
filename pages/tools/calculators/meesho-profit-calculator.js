import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const MeeshoProfitCalculator = () => {
    const [sellingPrice, setSellingPrice] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [packagingCost, setPackagingCost] = useState('');
    const [results, setResults] = useState(null);

    const calculateProfit = () => {
        const selling = parseFloat(sellingPrice) || 0;
        const cost = parseFloat(costPrice) || 0;
        const shipping = parseFloat(shippingCost) || 0;
        const packaging = parseFloat(packagingCost) || 0;

        // Meesho commission rates (as of 2024-2025)
        const commissionRate = 0.15; // 15% average commission
        const paymentGatewayFee = 0.02; // 2% payment processing
        const gstRate = 0.18; // 18% GST on commission

        const commission = selling * commissionRate;
        const commissionGst = commission * gstRate;
        const paymentFee = selling * paymentGatewayFee;
        const totalFees = commission + commissionGst + paymentFee;

        const totalCost = cost + shipping + packaging + totalFees;
        const netProfit = selling - totalCost;
        const profitMargin = selling > 0 ? ((netProfit / selling) * 100).toFixed(2) : 0;
        const roi = cost > 0 ? ((netProfit / cost) * 100).toFixed(2) : 0;

        setResults({
            sellingPrice: selling.toFixed(2),
            commission: commission.toFixed(2),
            commissionGst: commissionGst.toFixed(2),
            paymentFee: paymentFee.toFixed(2),
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
    }, [sellingPrice, costPrice, shippingCost, packagingCost]);

    return (
        <BaseOneLayout>
            <Head>
                <title>Meesho Profit Calculator 2025 | Calculate Commission, Fees & Net Profit</title>
                <meta name="description" content="Free Meesho profit calculator. Calculate Meesho commission, payment gateway fees, GST, and net profit margin. Essential tool for Meesho sellers in 2025." />
                <meta name="keywords" content="meesho profit calculator, meesho commission calculator, meesho fee calculator, meesho seller calculator, calculate meesho profit" />
                <link rel="canonical" href="https://pdfcrops.com/tools/calculators/meesho-profit-calculator" />
            </Head>

            <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4">
                            <span className="text-4xl">📊</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
                            Meesho Profit <span className="text-pink-600">Calculator</span>
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Calculate your net profit, margin, and ROI for selling on Meesho. Includes commission, payment fees, and GST.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Product Details</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Selling Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        value={sellingPrice}
                                        onChange={(e) => setSellingPrice(e.target.value)}
                                        placeholder="Enter selling price"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Price customer pays</p>
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
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Your purchase/manufacturing cost</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shipping Cost (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={shippingCost}
                                        onChange={(e) => setShippingCost(e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">If you handle shipping (otherwise leave 0)</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Packaging Cost (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={packagingCost}
                                        onChange={(e) => setPackagingCost(e.target.value)}
                                        placeholder="0"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Box, bubble wrap, labels, etc.</p>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6">Profit Breakdown</h2>

                            {results ? (
                                <div className="space-y-4">
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-sm opacity-90">Selling Price</p>
                                        <p className="text-3xl font-bold">₹{results.sellingPrice}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Meesho Commission (15%)</span>
                                            <span className="font-semibold">- ₹{results.commission}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">GST on Commission (18%)</span>
                                            <span className="font-semibold">- ₹{results.commissionGst}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Payment Gateway Fee (2%)</span>
                                            <span className="font-semibold">- ₹{results.paymentFee}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-white border-opacity-30 pt-3">
                                            <span className="font-medium">Total Fees</span>
                                            <span className="font-bold">- ₹{results.totalFees}</span>
                                        </div>
                                    </div>

                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm opacity-90">Product Cost</span>
                                            <span>₹{costPrice || '0'}</span>
                                        </div>
                                        {parseFloat(shippingCost) > 0 && (
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm opacity-90">Shipping</span>
                                                <span>₹{shippingCost}</span>
                                            </div>
                                        )}
                                        {parseFloat(packagingCost) > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm opacity-90">Packaging</span>
                                                <span>₹{packagingCost}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-white bg-opacity-30 rounded-lg p-6 backdrop-blur-sm border-2 border-white border-opacity-50">
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
                                    <div className="text-6xl mb-4 opacity-50">🧮</div>
                                    <p className="text-lg opacity-90">Enter product details to see profit breakdown</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Meesho Fees in 2025</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-pink-600 mb-3">💰 Commission Structure</h3>
                                <p className="text-gray-600 mb-4">
                                    Meesho charges an average commission of <strong>15%</strong> on most product categories. This varies:
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Fashion & Accessories: 12-18%</li>
                                    <li>• Home & Kitchen: 10-15%</li>
                                    <li>• Electronics: 8-12%</li>
                                    <li>• Beauty & Health: 15-20%</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-purple-600 mb-3">📱 Payment Gateway Fees</h3>
                                <p className="text-gray-600 mb-4">
                                    Meesho deducts approximately <strong>2%</strong> as payment processing fees when customers pay via:
                                </p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Credit/Debit Cards</li>
                                    <li>• UPI Payments</li>
                                    <li>• Net Banking</li>
                                    <li>• Wallets (Paytm, PhonePe, etc.)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">🧾 GST on Commission</h3>
                                <p className="text-gray-600">
                                    GST at <strong>18%</strong> is applicable on the commission charged by Meesho. This is in addition to the base commission and is automatically deducted from your payment.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-green-600 mb-3">📦 Shipping & Returns</h3>
                                <p className="text-gray-600">
                                    Most Meesho sellers use Meesho's fulfillment service where shipping is managed by Meesho. Returns are also handled by the platform, with costs shared based on fault.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Tips to Maximize Meesho Profits</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">🎯</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Optimize Pricing</h4>
                                <p className="text-sm text-gray-600">Keep 30-40% profit margin to account for returns and discounts during sales.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">📸</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Quality Images</h4>
                                <p className="text-sm text-gray-600">High-quality product photos reduce return rates and increase sales.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">⚡</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Fast Dispatch</h4>
                                <p className="text-sm text-gray-600">Quick dispatch times improve your seller rating and boost visibility.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default MeeshoProfitCalculator;
