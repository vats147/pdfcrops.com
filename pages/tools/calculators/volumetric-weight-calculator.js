import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const VolumetricWeightCalculator = () => {
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    const [unit, setUnit] = useState('cm'); // cm or inches
    const [divisor, setDivisor] = useState(5000); // Standard divisor
    const [results, setResults] = useState(null);

    useEffect(() => {
        calculateWeight();
    }, [dimensions, unit, divisor]);

    const calculateWeight = () => {
        const l = parseFloat(dimensions.length);
        const w = parseFloat(dimensions.width);
        const h = parseFloat(dimensions.height);

        if (isNaN(l) || isNaN(w) || isNaN(h)) {
            setResults(null);
            return;
        }

        let volWeight = 0;
        let volume = l * w * h;

        if (unit === 'cm') {
            volWeight = (l * w * h) / divisor;
        } else {
            // Convert inches to cm for standard calculation or use inch divisor
            // Standard formula for inches is (L x W x H) / 139 (for international) or 166 (domestic US)
            // But often converted to cm first: 1 inch = 2.54 cm
            // Let's stick to the divisor logic provided by user or standard
            // If user selects inches, we usually assume the divisor is meant for the resulting volume unit
            // However, standard courier formula in India is usually in CM / 5000
            // Let's convert inches to cm first for consistency if the divisor is 5000

            if (divisor === 5000 || divisor === 4000) {
                const l_cm = l * 2.54;
                const w_cm = w * 2.54;
                const h_cm = h * 2.54;
                volWeight = (l_cm * w_cm * h_cm) / divisor;
                volume = l_cm * w_cm * h_cm; // Volume in cm3
            } else {
                // Custom divisor for inches
                volWeight = (l * w * h) / divisor;
            }
        }

        setResults({
            weight: volWeight.toFixed(2),
            volume: volume.toFixed(2),
            unit: unit
        });
    };

    const couriers = [
        { name: 'Standard / Domestic Air', divisor: 5000 },
        { name: 'FedEx / DHL / UPS (Intl)', divisor: 5000 },
        { name: 'Surface Transport', divisor: 4000 }, // Sometimes 4500 or 4000
        { name: 'Blue Dart / Delhivery', divisor: 5000 },
    ];

    return (
        <BaseOneLayout>
            <Head>
                <title>Volumetric Weight Calculator | Calculate Dimensional Weight</title>
                <meta name="description" content="Calculate the volumetric (dimensional) weight of your shipments. Essential for ecommerce sellers using FedEx, DHL, Blue Dart, and Delhivery." />
                <meta name="keywords" content="volumetric weight calculator, dimensional weight, dim weight, courier weight calculator, shipping calculator" />
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
                            Volumetric Weight <span className="text-blue-600">Calculator</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Determine the chargeable weight of your package based on its dimensions.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Input Section */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Measurement Unit</label>
                                        <div className="flex rounded-md shadow-sm" role="group">
                                            <button
                                                type="button"
                                                onClick={() => setUnit('cm')}
                                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-lg border ${unit === 'cm'
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                Centimeters (cm)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setUnit('in')}
                                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-lg border-t border-r border-b ${unit === 'in'
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                Inches (in)
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                                            <input
                                                type="number"
                                                value={dimensions.length}
                                                onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                                                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                                            <input
                                                type="number"
                                                value={dimensions.width}
                                                onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                                                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                                            <input
                                                type="number"
                                                value={dimensions.height}
                                                onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                                                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Courier / Divisor</label>
                                        <select
                                            value={divisor}
                                            onChange={(e) => setDivisor(Number(e.target.value))}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            {couriers.map((c) => (
                                                <option key={c.name} value={c.divisor}>
                                                    {c.name} (Divisor: {c.divisor})
                                                </option>
                                            ))}
                                            <option value={139}>UPS/FedEx Domestic US (Divisor: 139)</option>
                                        </select>
                                        <p className="mt-1 text-xs text-gray-500">Most Indian couriers use 5000.</p>
                                    </div>
                                </div>

                                {/* Results Section */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center">
                                    {results ? (
                                        <div className="space-y-6 text-center">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Volumetric Weight</p>
                                                <div className="flex items-baseline justify-center">
                                                    <span className="text-4xl font-extrabold text-blue-600">{results.weight}</span>
                                                    <span className="ml-2 text-xl text-gray-500">kg</span>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100">
                                                <div className="bg-yellow-50 rounded-lg p-4 text-left">
                                                    <p className="text-sm text-yellow-800 font-medium flex items-start">
                                                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Note: Couriers will charge based on the higher of the Actual Weight or Volumetric Weight.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400 py-8">
                                            <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <p className="mt-2">Enter dimensions to calculate</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="mt-12 bg-white rounded-2xl shadow-sm p-8 border border-gray-100 prose max-w-none">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Volumetric Weight?</h2>
                        <p className="text-gray-600 mb-6">
                            Volumetric weight (also known as dimensional weight) is a pricing technique used by courier companies. It reflects the package's density, which is the amount of space a package occupies in relation to its actual weight.
                        </p>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">The Formula</h3>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 font-mono text-sm">
                            (Length × Width × Height) / Divisor
                        </div>
                        <p className="text-gray-600 mb-4">
                            The most common divisor is <strong>5000</strong> for domestic shipments in India (Blue Dart, Delhivery, DTDC) and international air freight. Surface transport sometimes uses 4000 or 4500.
                        </p>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Why is it important?</h3>
                        <p className="text-gray-600">
                            If you ship a large box with light items (like pillows or bubble wrap), the courier loses money if they charge only by weight because the box takes up a lot of space in the truck or plane. Therefore, they charge you for the "Volumetric Weight" if it is higher than the "Actual Weight".
                        </p>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default VolumetricWeightCalculator;
