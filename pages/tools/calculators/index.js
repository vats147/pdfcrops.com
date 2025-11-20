import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BaseOneLayout from '../../../layouts/BaseOneLayout/BaseOneLayout';

const calculators = [
    {
        id: 'meesho',
        name: 'Meesho Profit Calculator',
        description: 'Calculate your net profit, margin, and ROI for selling on Meesho. Includes commission, shipping, and GST calculations.',
        link: '/tools/calculators/meesho-profit-calculator',
        icon: '📊',
        color: 'bg-pink-50 text-pink-600'
    },
    {
        id: 'amazon',
        name: 'Amazon Profit Calculator',
        description: 'Estimate your Amazon FBA/FBM fees, referral fees, and closing fees to determine your actual profit.',
        link: '/tools/calculators/amazon-profit-calculator',
        icon: '📦',
        color: 'bg-yellow-50 text-yellow-600'
    },
    {
        id: 'flipkart',
        name: 'Flipkart Profit Calculator',
        description: 'Accurate profit calculation for Flipkart sellers. Accounts for marketplace fees, shipping, and taxes.',
        link: '/tools/calculators/flipkart-profit-calculator',
        icon: '🛍️',
        color: 'bg-blue-50 text-blue-600'
    },
    {
        id: 'jiomart',
        name: 'JioMart Seller Calculator',
        description: 'Streamline your business with the JioMart Seller Calculator. Accurately calculate fees and profits.',
        link: '/tools/calculators/jiomart-seller-calculator',
        icon: '🏪',
        color: 'bg-red-50 text-red-600'
    },
    {
        id: 'gst',
        name: 'GST Calculator India',
        description: 'Calculate GST effortlessly. Quickly determine tax liabilities and stay compliant with Indian tax regulations.',
        link: '/tools/calculators/gst-calculator-india',
        icon: '🇮🇳',
        color: 'bg-purple-50 text-purple-600'
    },
    {
        id: 'volumetric',
        name: 'Volumetric Weight Calculator',
        description: 'Determine the shipping cost of a package based on its dimensions rather than its actual weight.',
        link: '/tools/calculators/volumetric-weight-calculator',
        icon: '⚖️',
        color: 'bg-cyan-50 text-cyan-600'
    },
    {
        id: 'finance',
        name: 'Finance Margin Calculator',
        description: 'Maximize profits with our Finance Margin Calculator. Effortlessly calculate margins and ensure financial health.',
        link: '/tools/calculators/finance-margin-calculator',
        icon: '📈',
        color: 'bg-green-50 text-green-600'
    },
    {
        id: 'ebay',
        name: 'eBay Seller Calculator',
        description: 'Optimize your earnings with the eBay Seller Calculator. Effortlessly estimate fees and profits.',
        link: '/tools/calculators/ebay-profit-calculator',
        icon: '🏷️',
        color: 'bg-emerald-50 text-emerald-600'
    },
    {
        id: 'walmart',
        name: 'Walmart Seller Calculator',
        description: 'Maximize your profits with the Walmart Seller Calculator. Easily calculate fees and pricing to scale.',
        link: '/tools/calculators/walmart-seller-calculator',
        icon: '🛒',
        color: 'bg-indigo-50 text-indigo-600'
    },
    {
        id: 'etsy',
        name: 'Etsy Seller Calculator',
        description: 'Boost your earnings with the Etsy Seller Calculator. Accurately estimate fees and profits to enhance success.',
        link: '/tools/calculators/etsy-seller-calculator',
        icon: '🎨',
        color: 'bg-orange-50 text-orange-600'
    },
    {
        id: 'alibaba',
        name: 'Alibaba Seller Calculator',
        description: 'Optimize your profits with the Alibaba Seller Calculator. Effortlessly calculate fees and margins.',
        link: '/tools/calculators/alibaba-profit-calculator',
        icon: '🌏',
        color: 'bg-orange-100 text-orange-700'
    }
];

const CalculatorsIndex = () => {
    return (
        <BaseOneLayout>
            <Head>
                <title>Ecommerce Profit Calculators | Meesho, Amazon, Flipkart, eBay, Alibaba</title>
                <meta name="description" content="Free ecommerce profit calculators for sellers on Meesho, Amazon, Flipkart, eBay, and Alibaba. Calculate fees, margins, and ROI accurately." />
                <meta name="keywords" content="ecommerce calculator, profit calculator, meesho calculator, amazon fba calculator, flipkart fee calculator, ebay fee calculator" />
            </Head>

            <div className="bg-brandLightColor min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-brandDarkColor sm:text-5xl sm:tracking-tight lg:text-6xl">
                            Ecommerce Profit <span className="text-brandPrimaryColor">Calculators</span>
                        </h1>
                        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                            Maximize your earnings with our suite of free fee and profit calculators for major ecommerce platforms.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {calculators.map((calc) => (
                            <Link href={calc.link} key={calc.id}>
                                <a className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brandPrimaryColor rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col">
                                    <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full ${calc.color} mb-6 text-3xl`}>
                                        {calc.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-brandPrimaryColor transition-colors">
                                            {calc.name}
                                        </h3>
                                        <p className="mt-3 text-base text-gray-500">
                                            {calc.description}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex items-center text-brandPrimaryColor font-medium">
                                        <span>Calculate Now</span>
                                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                        <h2 className="text-3xl font-bold text-brandDarkColor mb-6">Why Use Our Calculators?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Accurate Fee Structures</h3>
                                <p className="text-gray-600">We keep our calculators updated with the latest commission rates, closing fees, and shipping charges for each platform.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Profit & Margin Analysis</h3>
                                <p className="text-gray-600">Instantly see your net profit and profit margin percentage to make informed pricing decisions.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Tax Calculations</h3>
                                <p className="text-gray-600">Don't forget GST/VAT. Our tools help you account for taxes so you know your real earnings.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Free & Unlimited</h3>
                                <p className="text-gray-600">Use these tools as many times as you need. No sign-up required, completely free for all sellers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseOneLayout>
    );
};

export default CalculatorsIndex;
