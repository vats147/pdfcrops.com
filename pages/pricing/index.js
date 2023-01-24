import React from 'react'

const Index = () => {
    return (
        <main className='w-full py-20 flex flex-col justify-center items-center'>

            <div class="bg-white h-full py-6 sm:py-8 lg:py-12">
                <div class="max-w-screen-xl px-4 md:px-8 mx-auto">
                    <h2 class="text-gray-800 text-3xl lg:text-4xl font-bold text-center mb-4 md:mb-8 xl:mb-12">Pricing</h2>

                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 md:mb-8">
                        {/* <!-- plan - start --> */}
                        <div class="flex flex-col border rounded-lg overflow-hidden sm:mt-8">
                            <div class="h-2 bg-pink-500"></div>

                            <div class="flex flex-col flex-1 p-6 pt-8">
                                <div class="mb-12">
                                    <div class="text-gray-800 text-2xl font-bold text-center mb-2">Free Trial</div>

                                    <p class="text-gray-500 text-center px-8 mb-8">For individuals and organizations who want to try our system</p>

                                    <div class="space-y-4">
                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">1.000 MB file storage</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">2.000 MB bandwidth per month</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">200 tasks per month</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">Comunity support</span>
                                        </div>
                                        {/* <!-- check - end --> */}
                                    </div>
                                </div>

                                <div class="mt-auto">
                                    <a href="#" class="block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">$0 / Free</a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- plan - end --> */}

                        {/* <!-- plan - start --> */}
                        <div class="flex flex-col border-2 border-indigo-500 rounded-lg overflow-hidden">
                            <div class="bg-indigo-500 text-white text-sm font-semibold tracking-widest text-center uppercase py-2">Popular choise</div>

                            <div class="flex flex-col flex-1 p-6 pt-8">
                                <div class="mb-12">
                                    <div class="text-gray-800 text-2xl font-bold text-center mb-2">Team</div>

                                    <p class="text-gray-500 text-center mx-auto px-8 mb-8">Avanced feaures for Individuals and organizations</p>

                                    <div class="space-y-4">
                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">Unlimited file storage</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">10 GB bandwidth per month</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">10.000 tasks per month</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">Email support</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">100 Webhooks</span>
                                        </div>
                                        {/* <!-- check - end --> */}
                                    </div>
                                </div>

                                <div class="mt-auto">
                                    <a href="#" class="block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">$19</a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- plan - end --> */}

                        {/* <!-- plan - start --> */}
                        <div class="flex flex-col border rounded-lg overflow-hidden lg:mt-8">
                            <div class="h-2 bg-gray-800"></div>

                            <div class="flex flex-col flex-1 p-6 pt-8">
                                <div class="mb-12">
                                    <div class="text-gray-800 text-2xl font-bold text-center mb-2">Enterprise</div>

                                    <p class="text-gray-500 text-center mx-auto px-8 mb-8">Maximum performace for organisations</p>

                                    <div class="space-y-4">
                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">Unlimited file storage</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">Unlimited bandwidth per month</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">1.000.000 tasks per month</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">Email and phone support</span>
                                        </div>
                                        {/* <!-- check - end --> */}

                                        {/* <!-- check - start --> */}
                                        <div class="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 16 16">
                                                <circle cx="8" cy="8" r="8" fill="currentColor" class="text-gray-300" />
                                                <circle cx="8" cy="8" r="3" fill="currentColor" class="text-gray-500" />
                                            </svg>

                                            <span class="text-gray-600">Unlimited Webhooks</span>
                                        </div>
                                        {/* <!-- check - end --> */}
                                    </div>
                                </div>

                                <div class="mt-auto">
                                    <a href="#" class="block bg-gray-800 hover:bg-gray-700 active:bg-gray-600 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">$49</a>
                                </div>
                            </div>
                        </div>
                        {/* <!-- plan - end --> */}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Index