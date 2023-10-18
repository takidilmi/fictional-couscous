import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Events.module.css";

const FilterByType = ({ setFilteredTypes }) => {
    // removing the interest event listener
    const dropdownRef = useRef(null);

    // handle clicking out of the type list
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setInterestOpen(false);
        }
    };
    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);
    // controlling the open/close state of the interest filter
    const [isInterestOpen, setInterestOpen] = useState(false);
    // storing the selected types
    const [selectedTypes, setSelectedTypes] = useState([]);

    // setting the initial open/close state of the interest filter and adding a resize event listener
    useEffect(() => {
        // handle the screen resize
        const handleResize = () => {
            setInterestOpen(window.innerWidth > 640);
        };

        // initial open/close state of the interest filter
        setInterestOpen(window.innerWidth > 640);

        // resize event listener
        window.addEventListener("resize", handleResize);

        // Clean up by removing the resize event listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // handle the click event of the interest filter
    const handleInterestClick = () => {
        setInterestOpen(!isInterestOpen);
    };

    // handle the click event of a type
    const handleTypeClick = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    // updating the filtered types when the selected types change
    useEffect(() => {
        setFilteredTypes(selectedTypes);
    }, [selectedTypes]);

    return (
        <>
            {/* <div ref={dropdownRef}> */} {/*to close the types menu */}
            <div>
                {" "}
                <button className='sm:hidden' onClick={handleInterestClick}>
                    Change Interest
                </button>
                {isInterestOpen && (
                    <ul
                        style={{
                            animation: `${
                                isInterestOpen
                                    ? `${styles.fadeIn} 0.7s ease-in-out`
                                    : ""
                            }`,
                        }}
                        className={`${styles.information} flex sm:relative sm:bg-transparent sm:h-[700px]  fixed bottom-0 left-0 h-64 w-full bg-gray-900 text-white z-[999] flex-col gap-4 sm:border-x-0 sm:border-b-0 sm:pt-4 items-center sm:border sm:border-t-black overflow-y-scroll`}
                    >
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.length === 0 ? "bg-blue-700" : ""
                            }`}
                            onClick={() => setSelectedTypes([])}
                        >
                            All
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes("No Poverty")
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() => handleTypeClick("No Poverty")}
                        >
                            No Poverty
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes("Zero Hunger")
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() => handleTypeClick("Zero Hunger")}
                        >
                            Zero Hunger
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes(
                                    "Good Health and Well Being"
                                )
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() =>
                                handleTypeClick("Good Health and Well Being")
                            }
                        >
                            Good Health and Well Being
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes("Quality Education")
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() => handleTypeClick("Quality Education")}
                        >
                            Quality Education
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes("Gender Equality")
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() => handleTypeClick("Gender Equality")}
                        >
                            Gender Equality
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes(
                                    "Clean Water and Sanitation"
                                )
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() =>
                                handleTypeClick("Clean Water and Sanitation")
                            }
                        >
                            Clean Water and Sanitation
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes(
                                    "Affordable and Clean Energy"
                                )
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() =>
                                handleTypeClick("Affordable and Clean Energy")
                            }
                        >
                            Affordable and Clean Energy
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes(
                                    "Decent Work and Economic Growth"
                                )
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() =>
                                handleTypeClick(
                                    "Decent Work and Economic Growth"
                                )
                            }
                        >
                            Decent Work and Economic Growth
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes(
                                    "Industry, Innovation and Infrastructure"
                                )
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() =>
                                handleTypeClick(
                                    "Industry, Innovation and Infrastructure"
                                )
                            }
                        >
                            Industry, Innovation and Infrastructure
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes("Reduced Inequalities")
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() =>
                                handleTypeClick("Reduced Inequalities")
                            }
                        >
                            Reduced Inequalities
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes(
                                    "Sustainable Cities and Communities"
                                )
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() =>
                                handleTypeClick(
                                    "Sustainable Cities and Communities"
                                )
                            }
                        >
                            Sustainable Cities and Communities
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes(
                                    "Responsible Consumption/Production"
                                )
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() =>
                                handleTypeClick(
                                    "Responsible Consumption/Production"
                                )
                            }
                        >
                            Responsible Consumption/Production
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes("Life Below Water")
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() => handleTypeClick("Life Below Water")}
                        >
                            Life Below Water
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes("Life on Land")
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() => handleTypeClick("Life on Land")}
                        >
                            Life on Land
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes(
                                    "Peace, Justice and Strong Institutions"
                                )
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() =>
                                handleTypeClick(
                                    "Peace, Justice and Strong Institutions"
                                )
                            }
                        >
                            Peace, Justice and Strong Institutions
                        </button>
                        <button
                            className={`bg-blue-500 text-center xl:w-[281px] xl:h-[52px] text-white font-medium px-4 py-2 rounded-lg ${
                                selectedTypes.includes("Climate Action")
                                    ? "bg-red-700"
                                    : ""
                            }`}
                            onClick={() => handleTypeClick("Climate Action")}
                        >
                            Climate Action
                        </button>
                    </ul>
                )}
            </div>
        </>
    );
};

export default FilterByType;
