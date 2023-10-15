import React, { useState, useEffect } from "react";

import Calendar from "@/components/Events/Calendar";
import EventCard from "@/components/Events/EventCard";
import EventCardLeft from "@/components/Events/EventCardLeft";
import styles from "@/styles/Events.module.css";
import FilterByType from "@/components/Filter/FilterByType";

const EventsPage = (user) => {
    const [inputValue, setInputValue] = useState("");
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [isLocationOpen, setLocationOpen] = useState(false);
    const [filteredTypes, setFilteredTypes] = useState([]);
    const [events, setEvents] = useState([]);

    const handleLocationClick = () => {
        setLocationOpen(!isLocationOpen);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleTestClick = () => {
        setCalendarOpen(!isCalendarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                setCalendarOpen(true);
                true;
                setLocationOpen(true);
            } else {
                setCalendarOpen(false);
                false;
                setLocationOpen(false);
            }
        };

        // Set initial state based on window size
        if (window.innerWidth > 640) {
            setCalendarOpen(true);
            true;
            setLocationOpen(true);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        // Simulating fetching events from an API
        const fetchEvents = async () => {
            // Simulating API response delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Generate random events
            const randomEvents = [
                { id: 1, type: "Reduced Inequalities" },
                { id: 2, type: "No Poverty" },
                { id: 3, type: "Gender Equality" },
                { id: 4, type: "Quality Education" },
                { id: 5, type: "No Poverty" },
                { id: 6, type: "Life on Land" },
                { id: 7, type: "Quality Education" },
            ];

            setEvents(randomEvents);
        };

        fetchEvents();
    }, []);
    return (
        <>
            <main className='flex flex-col justify-center sm:pb-[200px] mt-32 pb-[200px] items-center xl:mt-32 xl:pb-[200px]'>
                <div>
                    <h1>Welcome, {user.name}!</h1>
                    <p>This is the events page</p>
                </div>
                <div className='flex flex-col-reverse sm:flex sm:flex-row-reverse sm:items-center sm:justify-evenly sm:gap-8 sm:h-full sm:w-full'>
                    <ul className='flex flex-col items gap-2'>
                        {events
                            .filter((event) =>
                                filteredTypes.length === 0
                                    ? true
                                    : filteredTypes.includes(event.type)
                            )
                            .map((event, index) => {
                                if (index % 2 === 0) {
                                    return (
                                        <EventCard
                                            key={event.id}
                                            type={event.type}
                                        />
                                    );
                                } else {
                                    return (
                                        <EventCardLeft
                                            key={event.id}
                                            type={event.type}
                                        />
                                    );
                                }
                            })}
                    </ul>
                    <div className='flex flex-row items-center justify-between sm:flex sm:flex-col sm:items-center text-black sm:gap-7'>
                        <div className='sm:flex s:flex-col sm:items-center sm:justify-center'>
                            <button
                                className='sm:hidden'
                                onClick={handleTestClick}
                            >
                                Change Date
                            </button>
                            {isCalendarOpen && (
                                <div
                                    style={{
                                        animation: `${
                                            isCalendarOpen
                                                ? `${styles.fadeIn} 0.7s ease-in-out`
                                                : ""
                                        }`,
                                    }}
                                    className={`${
                                        isCalendarOpen ? "open" : ""
                                    } ${
                                        styles.calendarContainer
                                    } border border-black rounded-[8px] bg-white sm:bg-transparent`}
                                >
                                    <Calendar />
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col items-center gap-4 border border-x-0 border-b-0 border-t-black'>
                            <p
                                style={{
                                    color: "black",
                                    fontFamily: "Rubik",
                                    fontWeight: "400",
                                    textDecoration: "underline",
                                    lineHeight: "30px",
                                    letterSpacing: "0.10px",
                                    wordWrap: "break-word",
                                }}
                                className='sm:pt-10 sm:bg-transparent cursor-pointer sm:text-[20px] text-[16px]'
                                onClick={handleLocationClick}
                            >
                                Change Location
                            </p>
                            {isLocationOpen && (
                                <input
                                    className={`${styles.locationChange} border rounded-[5px] text-center`}
                                    type='text'
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    style={{
                                        backgroundColor: inputValue
                                            ? "#FBC495"
                                            : "white",
                                        border: `2px solid `,
                                    }}
                                />
                            )}
                        </div>

                        <FilterByType setFilteredTypes={setFilteredTypes} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default EventsPage;
