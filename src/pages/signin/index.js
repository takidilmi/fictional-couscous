import {
    signInWithEmailAndPassword,
    getAuth,
    linkWithPopup,
    GoogleAuthProvider,
    signInWithPopup,
    TwitterAuthProvider,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { sendPasswordResetEmail } from "firebase/auth";
import BtnGoogle from "@/components/BtnTwitter&Google/ButtonGoogle";
import ButtonTwitter from "@/components/BtnTwitter&Google/ButtonTwitter";
import Modal from "@/components/Popup/Modal";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../util/firebase";

import { auth } from "../../util/firebase";
const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [RestEmail, setRestEmail] = useState("");

    const [password, setPassword] = useState("");
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalClassName, setModalClassName] = useState("");
    const [resetMode, setResetMode] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                router.push("/profile");
            }
        });

        return () => unsubscribe();
    }, []);
    const handleSuccess = () => {
        setShowPopup(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShowPopup(true);
            setModalContent("Congrats! You signed in/up successfully.");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
            setTimeout(() => {
                router.push("/events");
            }, 3000);
        } catch (error) {
            setShowPopup(true);
            setModalContent(
                "Error: Login failed. Invalid credentials or password requirements not met"
            );
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
        }
    };
    const handelGoogle = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();

            const provider = new GoogleAuthProvider();

            const userCredential = await signInWithPopup(auth, provider);

            const displayName = userCredential.user.displayName;
            const [firstName, lastName] = displayName.split(" ");

            // Create user object with name, surename, and email
            const user = {
                Name: firstName,
                Surename: lastName,
                email: userCredential.user.email,
                interests: [],
                eventsCreated: [],
                eventsJoined: [],
            };

            // Get the user UID
            const userUID = userCredential.user.uid;

            // Get a reference to the "users" collection
            const usersCollectionRef = collection(db, "users");

            // Add the user object to the "users" collection with the user UID as the document ID
            await setDoc(doc(usersCollectionRef, userUID), user);

            const email = userCredential.user.email;

            if (email) {
                await linkWithPopup(userCredential.user, provider);
                await signInWithPopup(auth, provider);
                setShowPopup(true);
                setModalContent("Congrats! You signed in/up successfully.");
                setModalClassName(
                    "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
                );
                setTimeout(() => {
                    router.push("/events");
                }, 3000);
            } else {
                // The user has no email associated with the account
                // Display an error message
                setShowPopup(true);
                setModalContent(
                    "Gmail account doesn't exist. Please sign up or use an existing account."
                );
                setModalClassName(
                    "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
                );
            }
        } catch (error) {
            setShowPopup(true);
            setModalContent("Sign in/up failed.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
        }
    };
    const handelTwitter = async (e) => {
        e.preventDefault();
        try {
            const provider = new TwitterAuthProvider();
            await signInWithPopup(auth, provider);
            setShowPopup(true);
            setModalContent("Congrats! You signed in/up successfully.");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px] mb-4  "
            );
            setTimeout(() => {
                router.push("/editprofile");
            }, 3000);
        } catch (error) {
            setShowPopup(true);
            setModalContent("Sign in/up failed.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
        }
    };
    const handleResetPassword = async (event) => {
        event.preventDefault();

        if (!resetMode) {
            return;
        }
        try {
            await sendPasswordResetEmail(auth, RestEmail);
            setShowPopup(true);
            setModalContent("Reset Email sent successfully .");
            setModalClassName(
                "alert alert-success fixed bottom-0 left-0 right-0 p-4 text-center w-[400px] mb-4  "
            );

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            setShowPopup(true);
            setModalContent("Reset failed.");
            setModalClassName(
                "alert alert-error fixed bottom-0 left-0 right-0 p-4 text-center w-[400px]"
            );
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    const toggleResetMode = () => {
        setResetMode(!resetMode);
    };
    return (
        <>
            <div className='flex justify-center items-center  '>
                <div className='flex flex-col items-center sm:flex-row sm:w-1/ h-fit'>
                    <div className='mb-4 sm:mb-0'>
                        <Image
                            src='/images/Sitting.png'
                            alt='Sitting'
                            width={1920}
                            height={1081}
                            layout='responsive'
                            objectFit='cover'
                            className='sm:w-auto w-full'
                            // style={{ width: '100%' }}
                        />
                    </div>
                    <div className='sm:ml-10'>
                        <h2 className="text-zinc-800 text-[32px] font-medium font-['Rubik'] mb-4">
                            Sign In
                        </h2>
                        <div className='mb-4'>
                            <ButtonTwitter onClick={handelTwitter} />
                            <BtnGoogle onClick={handelGoogle} />

                            <div className='flex items-center mb-4 mt-4'>
                                <div className='   shrink basis-0 h-0.5 bg-stone-500 bg-opacity-25 border-t flex-grow'></div>
                                <div className="text-stone-500 text-lg font-normal font-['Rubik'] px-4">
                                    OR
                                </div>
                                <div className='shrink basis-0 h-0.5 bg-stone-500 bg-opacity-25  border-t flex-grow'></div>
                            </div>
                        </div>
                        <form onSubmit={handleLogin} onKeyDown={handleKeyDown}>
                            {resetMode ? (
                                <div className='mb-4'>
                                    <label
                                        className="block mb-2 text-stone-500 text-base font-normal font-['Rubik']"
                                        htmlFor='email'
                                    >
                                        Email address
                                    </label>
                                    <input
                                        className='w-full px-3 py-2 border rounded'
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={RestEmail}
                                        onChange={(e) =>
                                            setRestEmail(e.target.value)
                                        }
                                        required
                                        style={{
                                            height: "40px",
                                            width: "300px",
                                        }}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label
                                        className="block mb-2 text-stone-500 text-base font-normal font-['Rubik']"
                                        htmlFor='email'
                                    >
                                        Email address
                                    </label>
                                    <input
                                        className='w-full px-3 py-2 border rounded'
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        style={{
                                            height: "40px",
                                            width: "300px",
                                        }}
                                    />
                                </div>
                            )}

                            <div className='mb-4 relative'>
                                <label
                                    className="block mb-2 text-stone-500 text-base font-normal font-['Rubik']"
                                    htmlFor='password'
                                >
                                    Your password
                                </label>
                                <input
                                    className='w-full px-3 py-2 border rounded'
                                    type={showPassword ? "text" : "password"}
                                    id='password'
                                    name='password'
                                    value={password}
                                    disabled={resetMode}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    style={{ height: "40px", width: "300px" }}
                                />

                                <div
                                    className='absolute top-0 right-0 m-3 cursor-pointer'
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                                </div>
                            </div>

                            <div>
                                <div className="text-stone-500 text-sm font-normal font-['Rubik'] mt-4">
                                    <button onClick={toggleResetMode}>
                                        Forgot your password?
                                    </button>
                                    {resetMode ? (
                                        <div className='text-orange-400 ml-1 cursor-pointer'></div>
                                    ) : (
                                        <div className="text-stone-500 text-sm font-normal font-['Rubik'] mt-4">
                                            Dont have an account?
                                            <Link
                                                href='/signup'
                                                className='text-orange-400 ml-1'
                                            >
                                                Sign up
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row sm:space-x-4 mt-4'>
                                {resetMode ? (
                                    <div className='flex justify-start'>
                                        <button
                                            className=' px-4 py-2 bg-orange-400 text-white rounded  transform hover:scale-110 transition-transform duration-300 '
                                            type='button'
                                            onClick={handleResetPassword}
                                        >
                                            Reset Password
                                        </button>
                                    </div>
                                ) : (
                                    <div className='flex justify-start '>
                                        <button
                                            className=' w-full px-4 py-2 bg-orange-400 text-white rounded  transform hover:scale-110 transition-transform duration-300 mt-4 mb-2 '
                                            type='submit'
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {showPopup && (
                    <Modal
                        message={modalContent}
                        onClose={handleSuccess}
                        className={modalClassName}
                    />
                )}
            </div>
        </>
    );
};

export default SignInPage;
