
import { auth } from '@/firebaseConfig'
import { Menu, Transition } from '@headlessui/react'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth"
import { Fragment } from 'react'


// ICONS
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai"
import { HiChevronDown } from "react-icons/hi"


export default function Example() {

    const [user, loading, error] = useAuthState(auth)

    const signInWithGoogle = async () => {
        try {
            const googleProvider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, googleProvider)


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-[90%] text-right">
            <Menu as="div" className="w-full relative inline-block text-left">
                <div className='w-full flex justify-center items-center'>
                    <Menu.Button onClick={() => {
                        if (!user && !loading) {
                            signInWithGoogle()
                        }
                    }} className="w-full px-10 py-3 rounded-md bg-brandPrimaryColor text-white text-sm font-medium hover:cursor-pointer hover:bg-[#156BA9]">
                        {/* {session?.user?.name} */}

                        {!user && !loading ? (
                            <div className='w-full flex justify-center items-center space-x-1'>
                                <p> Sign in </p>
                            </div>
                        ) : null}

                        {user && (
                            <div className='w-full  flex justify-center items-center space-x-5'>
                                <p> {user?.displayName} </p>
                                <AiOutlineLogout onClick={() => signOut(auth)} className='w-5 h-5 hover:cursor-pointer text-white' />
                            </div>
                        )}

                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user && !loading ? (
                            <div className="px-1 py-1 ">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => signOut(auth)}
                                            className={`${active ? 'bg-red-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium`}
                                        >
                                            Log out
                                        </button>
                                    )}
                                </Menu.Item>

                            </div>

                        ) : null}

                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}


