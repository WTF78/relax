'use client';
import Image from "next/image";
import React, {useState,  useRef, useEffect, useLayoutEffect} from "react";
import config from "../../postcss.config.mjs";
import nextConfig from "../../next.config";

export default function Home() {
    const path = nextConfig.basePath;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        setIsMobile(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const handleClick = (index: number) => {
        if (!isMobile) return;
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    const images = [
        {title: "Classic", img: path+"/pexels-pixabay-289227.jpg"},
        {title: "Hard", img: path+"/pexels-darcy-delia-345397-950760.jpg"},
        {title: "Special", img: path+"/pexels-james-superschoolnews-349383308-14461359.jpg"},
    ];

    const [activeCollapse, setActiveCollapse] = useState(0);
    const items = [
        {
            title: "Overview",
            content: [
                "Always be polite and kind to the escort.",
                "Always have the donation ready is cash, unless otherwise agreed and counted.",
                "At the appropriate time (during the first minutes of the meeting) hand it to her or place it in a very visible place so you spare both of you of any embarrassment.",
                "The donations are for our escort's time and companionship only and they are not negotiable."
            ]
        },
        {
            title: "New User Info",
            content: "We work in countries with strict rules. We know you are a good customer, but we need to be sure.\n" +
                "I will ask you to make a video for verification. It should be a selfie video with your face and money in your hands. This is only for my safety. You need to do it only one time.",
        },
    ];

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useLayoutEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(path+'/data/data.json');
                const result = await res.json();
                const fetchedData = result;
                setData(fetchedData);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const { view = 0,
            connect = 0,
            repeat = 0,
            connect_per = 0.00,
            repeat_per = 0.00,
            con_st = true,
            repeat_st = true } = data ?? {};

    const bottomRef = useRef(null);
    const [isBottomVisible, setIsBottomVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsBottomVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1,
            }
        );

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => {
            if (bottomRef.current) {
                observer.unobserve(bottomRef.current);
            }
        };
    }, []);

    return (
        <div
            className="flex flex-col items-center justify-items-center bg-accent-content">
            <header
                className="flex w-full top-0 justify-center items-center">
                <div className="flex h-full justify-center items-center w-full max-w-7xl px-1">
                    <Image src={`${path}/Logo.png`} alt="Charm" width={220} height={100}
                           className="logo-dark object-contain pb-4 pt-1"/>
                </div>
            </header>

            <main className="flex flex-col row-start-2 items-center">
                {/*Section 0 add line from chat to finish*/}
                <section className="w-full">
                    <div className="flex flex-col items-center justify-around w-full md:flex-row">
                        <div className="flex justify-center w-[50%]">
                            <div className="stats stats-vertical shadow text-primary text-center">
                                <div className="stat">
                                    <div className="stat-title">View</div>
                                    <div className="stat-value">{view}</div>
                                    <div className="stat-desc">From Jan 1st 2025</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Connect</div>
                                    <div className="stat-value">{connect}</div>
                                    <div className="stat-desc">{connect_per}%{' '}
                                        {con_st ?
                                            (<span style={{ color: 'green' }}>▲</span>) :
                                            (<span style={{ color: 'red' }}>▼</span>)}
                                    </div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Return</div>
                                    <div className="stat-value text-secondary">{repeat}</div>
                                    <div className="stat-desc">{repeat_per}%{' '}
                                        {repeat_st ?
                                            (<span style={{ color: 'green' }}>▲</span>) :
                                            (<span style={{ color: 'red' }}>▼</span>)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center w-[50%]">
                            <ul className="timeline timeline-vertical whitespace-nowrap">
                                <li>
                                    <div className="timeline-start timeline-box">Contact with us</div>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <hr/>
                                </li>
                                <li>
                                    <hr/>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="timeline-end timeline-box">Select service</div>
                                    <hr/>
                                </li>
                                <li>
                                    <hr/>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="timeline-end timeline-box">Choose time</div>
                                    <hr/>
                                </li>
                                <li>
                                    <hr/>
                                    <div className="timeline-start timeline-box">Discuss details</div>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <hr/>
                                </li>
                                <li>
                                    <hr/>
                                    <div className="timeline-start timeline-box">Meet</div>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <hr/>
                                </li>
                                <li>
                                    <hr/>
                                    <div className="timeline-middle">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="oklch(45.98% .248 305.03)"
                                            className="h-7 w-7"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="timeline-end timeline-box">Return</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                {/*Section 1 ready*/}
                <section id="services" className="pt-10 pb-10 px-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <h3 className="text-2xl font-semibold text-warning mb-4">Services</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {images.map(({title, img}, index) => (
                                <div key={index}
                                     className="bg-primary-content rounded-2xl overflow-hidden shadow-lg group">
                                    <div
                                        className={`aspect-[3/5] h-[400px] flex justify-center items-center transition-transform duration-300 ease-in-out cursor-pointer ${
                                            isMobile && activeIndex === index ? "scale-150 z-10" : "scale-100"}`}
                                        onClick={() => handleClick(index)}>
                                        <a className="block w-full h-full"
                                           href={`https://wa.me/000000000000/?text=Hi, I from s.agency.club, I want ${title} service`}
                                           target="_blank" rel="nofollow noopener noreferrer">
                                            <img src={img} alt={title}
                                                 className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.5]"/>
                                        </a>
                                    </div>
                                    <div className="p-2">
                                        <h4 className="text-xl font-semibold text-primary">{title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/*Section 2 load*/}
                <section id="rules" className="pt-2 pb-10 px-2">
                    <h3 className="text-2xl text-center font-semibold text-warning mb-6">Our Rules</h3>
                    <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg mx-auto">
                        <div tabIndex={0}
                             className="bg-primary text-primary-content collapse collapse-open border-base-300 border">
                            <div className="flex text-lg">
                                {items.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`cursor-pointer collapse-title text-center font-semibold ${
                                            activeCollapse === i
                                                ? "bg-primary text-primary-content"
                                                : "bg-primary-content text-primary"
                                        }`}
                                        onClick={() => setActiveCollapse(i)}
                                    >
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                            {items.map((item, i) => (
                                <div
                                    key={i}
                                    className={`collapse-content text-base ${
                                        activeCollapse === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                                    }`}
                                >
                                    {Array.isArray(item.content) ? (
                                    <ul className="list-disc pl-4 space-y-3">
                                        {item.content.map((line, index) => (
                                            <li key={index}>{line.split('\n').map((part, j) => (
                                                <p key={j} className="mb-1">{part}</p>))}</li>
                                        ))}
                                    </ul>) : (<p className="text-center pt-8">
                                        {item.content.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </p>)}
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
                {/*Section 3 no*/}
                <section>
                    <div ref={bottomRef} className="flex flex-wrap items-center justify-center gap-4 text-base">
                        <div className="px-4 sm:px-0">
                            <a href="https://wa.me/000000000000/?text=Hi, from s.agency.club" target="_blank"
                               className="btn btn-soft btn-warning text-white inline-flex whitespace-nowrap" rel="nofollow noopener noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="green"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 308 308"
                                    className="mr-1"
                                >
                                    <path
                                        d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                                    <path
                                        d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                                </svg>
                                Connect via WhatsApp
                            </a>
                        </div>
                        <div className="px-4 sm:px-0">
                            <a href="https://t.me/username?text=Hi, from s.agency.club" target="_blank"
                               className="btn btn-soft btn-warning text-white" rel="nofollow noopener noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#24A1DE"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 32 32"
                                    className="mr-1"
                                >
                                    <path
                                        d="M22.122 10.040c0.006-0 0.014-0 0.022-0 0.209 0 0.403 0.065 0.562 0.177l-0.003-0.002c0.116 0.101 0.194 0.243 0.213 0.403l0 0.003c0.020 0.122 0.031 0.262 0.031 0.405 0 0.065-0.002 0.129-0.007 0.193l0-0.009c-0.225 2.369-1.201 8.114-1.697 10.766-0.21 1.123-0.623 1.499-1.023 1.535-0.869 0.081-1.529-0.574-2.371-1.126-1.318-0.865-2.063-1.403-3.342-2.246-1.479-0.973-0.52-1.51 0.322-2.384 0.221-0.23 4.052-3.715 4.127-4.031 0.004-0.019 0.006-0.040 0.006-0.062 0-0.078-0.029-0.149-0.076-0.203l0 0c-0.052-0.034-0.117-0.053-0.185-0.053-0.045 0-0.088 0.009-0.128 0.024l0.002-0.001q-0.198 0.045-6.316 4.174c-0.445 0.351-1.007 0.573-1.619 0.599l-0.006 0c-0.867-0.105-1.654-0.298-2.401-0.573l0.074 0.024c-0.938-0.306-1.683-0.467-1.619-0.985q0.051-0.404 1.114-0.827 6.548-2.853 8.733-3.761c1.607-0.853 3.47-1.555 5.429-2.010l0.157-0.031zM15.93 1.025c-8.302 0.020-15.025 6.755-15.025 15.060 0 8.317 6.742 15.060 15.060 15.060s15.060-6.742 15.060-15.060c0-8.305-6.723-15.040-15.023-15.060h-0.002q-0.035-0-0.070 0z"/>
                                </svg>
                                Connect via Telegram
                            </a>
                        </div>
                    </div>
                </section>

                <div className={`${isBottomVisible ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    <button className="fixed bottom-4 right-4 text-black px-4 py-2 rounded shadow-lg">
                        <div>
                            <div className="pb-4">
                                <a href="https://wa.me/000000000000/?text=Hi, from s.agency.club" target="_blank"
                                   className="btn btn-soft btn-warning rounded-full text-white" rel="nofollow noopener noreferrer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="green"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 308 308"
                                        className="mr-1"
                                    >
                                        <path
                                            d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458C233.168,179.508,230.845,178.393,227.904,176.981z"/>
                                        <path
                                            d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867C276.546,215.678,222.799,268.994,156.734,268.994z"/>
                                    </svg>
                                </a>
                            </div>
                            <div>
                                <a href="https://t.me/username?text=Hi, from s.agency.club" target="_blank"
                                   className="btn btn-soft btn-warning rounded-full text-white" rel="nofollow noopener noreferrer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="#24A1DE"
                                        width="28"
                                        height="28"
                                        viewBox="0 0 32 32"
                                        className="mr-1"
                                    >
                                        <path
                                            d="M22.122 10.040c0.006-0 0.014-0 0.022-0 0.209 0 0.403 0.065 0.562 0.177l-0.003-0.002c0.116 0.101 0.194 0.243 0.213 0.403l0 0.003c0.020 0.122 0.031 0.262 0.031 0.405 0 0.065-0.002 0.129-0.007 0.193l0-0.009c-0.225 2.369-1.201 8.114-1.697 10.766-0.21 1.123-0.623 1.499-1.023 1.535-0.869 0.081-1.529-0.574-2.371-1.126-1.318-0.865-2.063-1.403-3.342-2.246-1.479-0.973-0.52-1.51 0.322-2.384 0.221-0.23 4.052-3.715 4.127-4.031 0.004-0.019 0.006-0.040 0.006-0.062 0-0.078-0.029-0.149-0.076-0.203l0 0c-0.052-0.034-0.117-0.053-0.185-0.053-0.045 0-0.088 0.009-0.128 0.024l0.002-0.001q-0.198 0.045-6.316 4.174c-0.445 0.351-1.007 0.573-1.619 0.599l-0.006 0c-0.867-0.105-1.654-0.298-2.401-0.573l0.074 0.024c-0.938-0.306-1.683-0.467-1.619-0.985q0.051-0.404 1.114-0.827 6.548-2.853 8.733-3.761c1.607-0.853 3.47-1.555 5.429-2.010l0.157-0.031zM15.93 1.025c-8.302 0.020-15.025 6.755-15.025 15.060 0 8.317 6.742 15.060 15.060 15.060s15.060-6.742 15.060-15.060c0-8.305-6.723-15.040-15.023-15.060h-0.002q-0.035-0-0.070 0z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </button>
                </div>
            </main>
            {/* Footer */}
            <footer className="flex justify-end py-6 bg-black text-gray-500 text-center">
                <p>© 2025 Relax. All rights reserved.</p>
            </footer>
        </div>
    );
}