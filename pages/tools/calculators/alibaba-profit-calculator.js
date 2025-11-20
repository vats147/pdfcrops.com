import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const AlibabaImportCalculator = () => {
    const [productPrice, setProductPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shippingMethod, setShippingMethod] = useState('sea');
    const [weight, setWeight] = useState('');
    const [productCategory, setProductCategory] = useState('general');
    const [results, setResults] = useState(null);

    const calculateLandedCost = () => {
        const price = parseFloat(productPrice) || 0;
        const qty = parseFloat(quantity) || 1;
        const productWeight = parseFloat(weight) || 1; // in kg

        const totalProductCost = price * qty;

        // Shipping costs (approximate rates from China to India)
        let shippingCostPerKg = 0;
        if (shippingMethod === 'sea') {
            shippingCostPerKg = 50; // ₹50/kg - slowest but cheapest
        } else if (shippingMethod === 'air') {
            shippingCostPerKg = 350; // ₹350/kg - fast but expensive
        } else { // express
            shippingCostPerKg = 500; // ₹500/kg - fastest, most expensive
        }

        const totalWeight = productWeight * qty;
        const shippingCost = totalWeight * shippingCostPerKg;

        // Customs duty rates in India (varies by category)
        const dutyRates = {
            general: 0.10, // 10%
            electronics: 0.20, // 20%
            textiles: 0.15, // 15%
            toys: 0.60, // 60%
            machinery: 0.075, // 7.5%
            chemicals: 0.10 // 10%
        };

        const customsDuty = totalProductCost * (dutyRates[productCategory] || 0.10);

        // GST (18% on product cost + shipping + duty)
        const gstBase = totalProductCost + shippingCost + customsDuty;
        const gst = gstBase * 0.18;

        // Clearance and handling charges
        const clearanceCharges = 2000; // Fixed clearance fee
        const handlingCharges = totalProductCost * 0.01; // 1% handling

        // Alibaba transaction fee (if applicable)
        const alibabaFee = totalProductCost * 0.03; // 3% platform fee

        const totalLandedCost = totalProductCost + shippingCost + customsDuty + gst + clearanceCharges + handlingCharges + alibabaFee;
        const costPerUnit = qty > 0 ? (totalLandedCost / qty).toFixed(2) : 0;

        // Calculate markup suggestions
        const suggestedRetailPrice30 = (parseFloat(costPerUnit) * 1.3).toFixed(2); // 30% markup
        const suggestedRetailPrice50 = (parseFloat(costPerUnit) * 1.5).toFixed(2); // 50% markup
        const suggestedRetailPrice100 = (parseFloat(costPerUnit) * 2.0).toFixed(2); // 100% markup

        setResults({
            totalProductCost: totalProductCost.toFixed(2),
            shippingCost: shippingCost.toFixed(2),
            customsDuty: customsDuty.toFixed(2),
            gst: gst.toFixed(2),
            clearanceCharges: clearanceCharges.toFixed(2),
            handlingCharges: handlingCharges.toFixed(2),
            alibabaFee: alibabaFee.toFixed(2),
            totalLandedCost: totalLandedCost.toFixed(2),
            costPerUnit,
            suggestedRetailPrice30,
            suggestedRetailPrice50,
            suggestedRetailPrice100,
            totalWeight: totalWeight.toFixed(2)
        });
    };

    useEffect(() => {
        if (productPrice || quantity) {
            calculateLandedCost();
        }
    }, [productPrice, quantity, shippingMethod, weight, productCategory]);

    return (
        <BaseOneLayout>
            <Head>
                <title>Alibaba Import Calculator 2025 | Landed Cost Calculator India</title>
                <meta name="description" content="Calculate total landed cost for importing from Alibaba to India. Includes customs duty, GST, shipping, and clearance charges. Free import calculator." />
                <meta name="keywords" content="alibaba import calculator, alibaba landed cost, import cost calculator india, customs duty calculator, china import calculator" />
                <link rel="canonical" href="https://pdfcrops.com/tools/calculators/alibaba-profit-calculator" />
            </Head>

            <div className="bg-gradient-to-br from-orange-50 via-white to-red-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-4">
                            <span className="text-4xl">🌏</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
                            Alibaba Import <span className="text-orange-600">Cost Calculator</span>
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Calculate total landed cost for importing products from Alibaba to India, including customs, shipping, and all fees.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Import Details</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Category
                                    </label>
                                    <select
                                        value={productCategory}
                                        onChange={(e) => setProductCategory(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    >
                                        <option value="general">General Products (10% duty)</option>
                                        <option value="machinery">Machinery (7.5% duty)</option>
                                        <option value="chemicals">Chemicals (10% duty)</option>
                                        <option value="textiles">Textiles & Apparel (15% duty)</option>
                                        <option value="electronics">Electronics (20% duty)</option>
                                        <option value="toys">Toys (60% duty)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Shipping Method
                                    </label>
                                    <select
                                        value={shippingMethod}
                                        onChange={(e) => setShippingMethod(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    >
                                        <option value="sea">Sea Freight (₹50/kg - 30-45 days)</option>
                                        <option value="air">Air Freight (₹350/kg - 7-10 days)</option>
                                        <option value="express">Express Courier (₹500/kg - 3-5 days)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        placeholder="Price per unit in ₹"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Alibaba product price (already in INR)</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Order Quantity *
                                    </label>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder="Number of units"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Minimum order quantity (MOQ)</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Weight Per Unit (kg) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        placeholder="1.0"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Including packaging weight</p>
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl shadow-lg p-8 text-white">
                            <h2 className="text-2xl font-bold mb-6">Landed Cost Breakdown</h2>

                            {results ? (
                                <div className="space-y-4">
                                    <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-sm opacity-90">Total Product Cost</p>
                                        <p className="text-3xl font-bold">₹{results.totalProductCost}</p>
                                        <p className="text-xs opacity-75 mt-1">{quantity} units × ₹{productPrice}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Shipping ({results.totalWeight} kg)</span>
                                            <span className="font-semibold">+ ₹{results.shippingCost}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Customs Duty ({productCategory})</span>
                                            <span className="font-semibold">+ ₹{results.customsDuty}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">GST (18%)</span>
                                            <span className="font-semibold">+ ₹{results.gst}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Clearance Charges</span>
                                            <span className="font-semibold">+ ₹{results.clearanceCharges}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Handling (1%)</span>
                                            <span className="font-semibold">+ ₹{results.handlingCharges}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm opacity-90">Alibaba Fee (3%)</span>
                                            <span className="font-semibold">+ ₹{results.alibabaFee}</span>
                                        </div>
                                    </div>

                                    <div className="bg-white bg-opacity-30 rounded-lg p-6 backdrop-blur-sm border-2 border-white border-opacity-50 mt-4">
                                        <p className="text-sm opacity-90 mb-1">Total Landed Cost</p>
                                        <p className="text-4xl font-bold text-yellow-300">₹{results.totalLandedCost}</p>
                                        <div className="mt-4 pt-4 border-t border-white border-opacity-30">
                                            <p className="text-xs opacity-75">Cost Per Unit</p>
                                            <p className="text-2xl font-bold">₹{results.costPerUnit}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white bg-opacity-20 rounded-lg p-5 backdrop-blur-sm">
                                        <h3 className="text-sm font-semibold mb-3 opacity-90">Suggested Selling Prices:</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm">30% Markup</span>
                                                <span className="font-bold text-green-300">₹{results.suggestedRetailPrice30}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm">50% Markup</span>
                                                <span className="font-bold text-green-300">₹{results.suggestedRetailPrice50}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm">100% Markup</span>
                                                <span className="font-bold text-green-300">₹{results.suggestedRetailPrice100}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4 opacity-50">📦</div>
                                    <p className="text-lg opacity-90">Enter import details to calculate costs</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Import Costs from Alibaba</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-orange-600 mb-3">🚢 Shipping Options</h3>
                                <p className="text-gray-600 mb-3">Choose based on urgency and budget:</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Sea Freight:</strong> ₹50/kg, 30-45 days - Best for bulk orders</li>
                                    <li>• <strong>Air Freight:</strong> ₹350/kg, 7-10 days - Balanced option</li>
                                    <li>• <strong>Express:</strong> ₹500/kg, 3-5 days - For urgent/sample orders</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-red-600 mb-3">🏛️ Customs Duty in India</h3>
                                <p className="text-gray-600 mb-3">Varies by product category (Basic Customs Duty):</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Machinery:</strong> 7.5%</li>
                                    <li>• <strong>General:</strong> 10%</li>
                                    <li>• <strong>Textiles:</strong> 15%</li>
                                    <li>• <strong>Electronics:</strong> 20%</li>
                                    <li>• <strong>Toys:</strong> 60%</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-yellow-600 mb-3">🧾 GST & Other Taxes</h3>
                                <p className="text-gray-600 mb-3">Additional charges on imported goods:</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>GST:</strong> 18% on (Product + Shipping + Duty)</li>
                                    <li>• <strong>IGST:</strong> Integrated GST for imports</li>
                                    <li>• <strong>Cess:</strong> Additional cess on some categories</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">📋 Clearance Process</h3>
                                <p className="text-gray-600 mb-3">Additional costs for import clearance:</p>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• <strong>Clearance Fee:</strong> ₹2,000-5,000 (customs broker)</li>
                                    <li>• <strong>Handling:</strong> ~1% of product value</li>
                                    <li>• <strong>Documentation:</strong> Included in clearance</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Smart Importing Tips</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">🔍</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Verify Suppliers</h4>
                                <p className="text-sm text-gray-600">Always use Trade Assurance and verify supplier credentials before ordering.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">📦</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Optimize Weight</h4>
                                <p className="text-sm text-gray-600">Reduce packaging weight to save on shipping. Negotiate with supplier for lighter packaging.</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="text-3xl mb-3">🤝</div>
                                <h4 className="font-semibold text-gray-900 mb-2">Use Freight Forwarders</h4>
                                <p className="text-sm text-gray-600">Hire a good customs broker/freight forwarder to navigate clearance smoothly.</p>
                            </div>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="mt-8 bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="text-2xl mr-2">⚠️</span>
                            Important Notes for Importers
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-orange-600 mr-2 font-bold">•</span>
                                <span><strong>Hidden Costs:</strong> Account for port charges, demurrage, and local transportation which can add 5-10% to total cost.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-600 mr-2 font-bold">•</span>
                                <span><strong>Minimum Order:</strong> Suppliers usually have MOQ (Minimum Order Quantity). Factor this into your calculations.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-600 mr-2 font-bold">•</span>
                                <span><strong>Quality Control:</strong> Consider ordering samples first. Budget 2-3x normal shipping cost for sample orders.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-orange-600 mr-2 font-bold">•</span>
                                <span><strong>Documentation:</strong> Ensure proper invoices, packing lists, and certificates to avoid customs delays.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default AlibabaImportCalculator;
