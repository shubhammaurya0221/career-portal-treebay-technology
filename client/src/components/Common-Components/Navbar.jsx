import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, ChevronRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
    {
        title: 'What we do',
        overview: {
            heading: 'Perpetually Adaptive Enterprise',
            description: 'At TreeBay, we don’t just help businesses transform. We help them become perpetually adaptive enterprises, built to evolve continuously.',
            cta: 'Adaptability starts here',
        },
        categories: [
            {
                name: 'Industries',
                links: ['Banking', 'Capital Markets', 'Consumer Packaged Goods and Distribution', 'Communications, Media, and Information Services', 'Education', 'Energy, Resources, and Utilities', 'Healthcare', 'High Tech', 'Insurance', 'Life Sciences', 'Manufacturing', 'Public Services', 'Retail', 'Travel and Logistics'],
            },
            {
                name: 'Services',
                links: ['Artificial Intelligence and Data & Analytics', 'Cloud', 'Cognitive Business Operations', 'Consulting', 'Cybersecurity', 'Enterprise Solutions', 'Industrial Autonomy & Engineering', 'Network Solutions and Services', 'Sustainability Services', 'TCS Interactive'],
            },
            {
                name: 'Products and Platforms',
                links: ['TCS ADD™', 'TCS BANCS™', 'TCS BFSI Platforms', 'TCS CHROMA™', 'TCS Customer Intelligence & Insights™', 'ignio™', 'TCS iON™', 'TCS HOBS™', 'TCS Intelligent Urban Exchange™', 'TCS OmniStore™', 'TCS Optumera™', 'TCS Tap™', 'Quartz™ – The Smart Ledgers™', 'TCS TwinX™', 'TCS MasterCraft™ Jile™', 'TCS DigiBOLT™', 'TCS AI WisdomNext™'],
            },
            {
                name: 'Research and Innovation',
                links: ['TCS Research', 'TCS Innovation Labs', 'TCS Co-Innovation Network (COIN™)'],
            }
        ],
    },
    {
        title: 'Who we are',
        overview: {
            heading: 'About Us',
            description: 'We deliver excellence and create value for customers and communities. With the best talent and latest technology, we create meaningful change.',
            cta: 'Discover the difference',
        },
        categories: [
            {
                name: 'Brand',
                links: ['Our Vision', 'Our Mission', 'Values', 'Leadership'],
            },
            {
                name: 'Sustainability',
                links: ['Environmental Responsibility', 'Carbon Neutrality', 'Community'],
            },
        ],
    },
    {
        title: 'Insights',
        overview: {
            heading: 'Industry Knowledge & Trends',
            description: 'Stay ahead of the curve with the latest advancements in chemical solutions, sustainable energy, and market dynamics.',
            cta: 'Explore All Insights',
        },
        categories: [
            {
                name: 'Publications',
                links: ['Latest Blogs', 'Whitepapers', 'Case Studies', 'Research Reports'],
            },
            {
                name: 'Key Topics',
                links: ['Sustainable Energy Transition', 'Industrial Alcohols', 'Biofuels Innovation', 'Market Trends'],
            },
            {
                name: 'Media & Resources',
                links: ['Podcasts', 'Webinars', 'Video Gallery', 'Technical Guides'],
            },
            {
                name: 'Events',
                links: ['Upcoming Trade Shows', 'Conferences', 'Leadership Summits'],
            }
        ],
    },
    {
        title: 'Careers',
        overview: {
            heading: 'Join Our Global Team',
            description: 'Build your career with a forward-thinking chemical solutions company. We are looking for innovators to drive sustainable progress.',
            cta: 'View Open Roles',
        },
        categories: [
            {
                name: 'Opportunities',
                links: ['Experienced Professionals', 'Early Careers & Graduates', 'Internships', 'Executive Roles'],
            },
            {
                name: 'Life at TreeBay',
                links: ['Our Culture', 'Diversity & Inclusion', 'Employee Benefits', 'Career Development'],
            },
            {
                name: 'Our Teams',
                links: ['Engineering & Research', 'Supply Chain & Logistics', 'Sales & Marketing', 'Corporate Operations'],
            },
            {
                name: 'Hiring Process',
                links: ['How We Hire', 'Interview Preparation', 'FAQs', 'Meet Our Recruiters'],
            }
        ],
    },
    {
        title: 'Newsroom',
        overview: {
            heading: 'Latest Updates & Announcements',
            description: 'Keep up with TreeBay Technology’s corporate news, strategic partnerships, and global media features.',
            cta: 'Go to Newsroom',
        },
        categories: [
            {
                name: 'Press & Media',
                links: ['Press Releases', 'In the News', 'News Alerts', 'Media Kit'],
            },
            {
                name: 'Corporate Updates',
                links: ['Company Milestones', 'Partnerships & Alliances', 'Awards & Recognition'],
            },
            {
                name: 'Multimedia Assets',
                links: ['Brand Guidelines', 'Image Library', 'B-Roll Video Footage', 'Spokesperson Biographies'],
            }
        ],
    },
    {
        title: 'Investors',
        overview: {
            heading: 'Financial Information & Governance',
            description: 'We are committed to transparency, operational excellence, and delivering long-term growth and value for our shareholders.',
            cta: 'View Investor Relations',
        },
        categories: [
            {
                name: 'Financials',
                links: ['Quarterly Earnings', 'Annual Reports', 'SEC Filings', 'Financial Fact Sheet'],
            },
            {
                name: 'Stock Information',
                links: ['Stock Quote & Chart', 'Dividend History', 'Analyst Coverage', 'Investment Calculator'],
            },
            {
                name: 'Corporate Governance',
                links: ['Board of Directors', 'Committee Composition', 'Governance Documents', 'Ethics & Compliance'],
            },
            {
                name: 'ESG & Sustainability',
                links: ['Sustainability Reports', 'Environmental Impact', 'Social Responsibility', 'ESG Framework'],
            }
        ],
    }
];

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeCategory, setActiveCategory] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
    const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

    const headerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header ref={headerRef} className="shadow-sm sticky w-full top-0 z-50 bg-[#111] text-white font-sans border-b border-gray-800 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* Left: Logo */}
                    <div className="flex items-center space-x-6 h-full z-50">
                        <a href="/" className="text-2xl font-bold tracking-wider text-green-500">
                            Treebay Tech
                        </a>
                    </div>

                    {/* Center: Desktop Navigation */}
                    <nav className="hidden lg:flex items-center h-full space-x-1">
                        {navItems.map((item, index) => (
                            <div key={item.title} className="h-full flex items-center">
                                <button
                                    className="h-full flex items-center px-4 cursor-pointer hover:bg-gray-800 transition-colors duration-200 focus:outline-none"
                                    onClick={() => {
                                        setActiveMenu(activeMenu === index ? null : index);
                                        setActiveCategory(0);
                                    }}
                                >
                                    <span className="text-[15px] font-semibold tracking-wide">{item.title}</span>
                                    <ChevronDown className={`text-xs ml-1 transition-transform duration-300 ${activeMenu === index ? 'rotate-180 text-green-500' : ''}`} />
                                </button>

                                {/* Dropdown Menu Container with top-to-bottom drop animation */}
                                {activeMenu === index && (
                                    <div className="absolute top-[80px] left-0 w-full bg-[#0F172A] shadow-2xl border-t border-gray-700 overflow-hidden animate-drop-down" style={{ minHeight: '400px' }}>
                                        <div className="max-w-7xl mx-auto flex h-full p-10">

                                            {/* Column 1: Overview (Reveals First) */}
                                            <div className="w-1/3 pr-10 border-r border-gray-700 animate-column-1">
                                                <h3 className="text-2xl font-light mb-4">{item.overview.heading}</h3>
                                                <p className="text-gray-400 leading-relaxed mb-6 text-sm">{item.overview.description}</p>
                                                <a href="#" className="inline-block px-6 py-2 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-sm font-medium rounded-full">
                                                    {item.overview.cta}
                                                </a>
                                            </div>

                                            {/* Column 2: Categories (Reveals Second) */}
                                            <div className="w-1/4 px-10 border-r border-gray-700 animate-column-2">
                                                <ul className="space-y-4">
                                                    {item.categories.map((cat, catIdx) => (
                                                        <li
                                                            key={cat.name}
                                                            className={`flex justify-between items-center cursor-pointer text-[15px] pb-2 border-b border-gray-800 transition-colors ${activeCategory === catIdx ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'}`}
                                                            onMouseEnter={() => setActiveCategory(catIdx)}
                                                        >
                                                            {cat.name}
                                                            <ChevronRight size={16} className={`transition-opacity ${activeCategory === catIdx ? 'opacity-100' : 'opacity-0'}`} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Column 3: Links (Reveals last with staggered waterfall) */}
                                            <div className="w-5/12 pl-10">
                                                <ul key={activeCategory} className="grid grid-cols-2 gap-y-4 gap-x-8">
                                                    {item.categories[activeCategory]?.links.map((link, idx) => (
                                                        <li
                                                            key={link}
                                                            className="animate-link-reveal"
                                                            style={{ animationDelay: `${200 + (idx * 30)}ms` }}
                                                        >
                                                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                                                                {link}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right: Desktop Actions & Mobile Menu Toggle */}
                    <div className="flex items-center space-x-5 z-50">
                        {/* Desktop Only Actions */}
                        <Link className="hidden lg:flex items-center space-x-6 h-full" to="/jobs">
                            <button className="text-gray-300 hover:text-white transition-colors px-5 py-2 bg-blue-600 rounded-md" >
                                View All Jobs
                            </button>
                        </Link>

                        {/* Mobile Controls */}
                        <div className="lg:hidden flex items-center space-x-5">
                            <button className="text-gray-300 hover:text-white transition-colors">
                                <Search size={22} />
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-300 hover:text-white transition-colors focus:outline-none"
                            >
                                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                            </button>
                        </div>
                    </div>

                </div>

                {/* ============================================================== */}
                {/* MOBILE MENU DRAWER                                             */}
                {/* ============================================================== */}
                <div
                    className={`lg:hidden fixed inset-0 top-20 bg-[#111] overflow-y-auto transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col px-6 py-4 space-y-2">
                        {navItems.map((item, index) => (
                            <div key={item.title} className="border-b border-gray-800 pb-2 pt-2 overflow-hidden">
                                <button
                                    className="flex justify-between items-center w-full text-left font-semibold text-lg py-2 focus:outline-none"
                                    onClick={() => {
                                        if (!item.isSimple) {
                                            setMobileActiveMenu(mobileActiveMenu === index ? null : index);
                                            setMobileActiveCategory(null);
                                        }
                                    }}
                                >
                                    <span>{item.title}</span>
                                    {!item.isSimple && (
                                        <ChevronDown className={`transition-transform duration-300 ${mobileActiveMenu === index ? 'rotate-180 text-blue-400' : 'text-gray-400'
                                            }`} size={20} />
                                    )}
                                </button>

                                {mobileActiveMenu === index && !item.isSimple && (
                                    <div className="mt-2 flex flex-col space-y-2 pl-4">

                                        {/* 1. DESCRIPTION BOX (Slides in first) */}
                                        <div
                                            className="mb-4 mt-2 bg-gray-900 p-4 rounded-lg animate-slide-left"
                                            style={{ animationDelay: '0ms' }}
                                        >
                                            <p className="text-gray-300 text-sm leading-relaxed mb-3">
                                                {item.overview.description}
                                            </p>
                                            <a href="#" className="text-blue-400 text-sm font-medium flex items-center hover:text-blue-300 transition-colors">
                                                {item.overview.cta} <ChevronRight size={16} className="ml-1" />
                                            </a>
                                        </div>

                                        {/* 2. CATEGORIES (Slide in one by one) */}
                                        {item.categories.map((cat, catIdx) => (
                                            <div
                                                key={cat.name}
                                                className="flex flex-col animate-slide-left"
                                                style={{ animationDelay: `${(catIdx + 1) * 60}ms` }} /* Staggers each category */
                                            >
                                                <button
                                                    className={`flex justify-between items-center text-left py-3 focus:outline-none transition-colors ${mobileActiveCategory === catIdx ? 'text-blue-400 font-medium' : 'text-gray-300'
                                                        }`}
                                                    onClick={() => setMobileActiveCategory(mobileActiveCategory === catIdx ? null : catIdx)}
                                                >
                                                    <span>{cat.name}</span>
                                                    <ChevronDown className={`transition-transform duration-300 ${mobileActiveCategory === catIdx ? 'rotate-180' : ''
                                                        }`} size={18} />
                                                </button>

                                                {/* Nested Links */}
                                                {mobileActiveCategory === catIdx && (
                                                    <ul className="flex flex-col space-y-3 pl-4 py-2 border-l border-gray-700 ml-2 mb-2 animate-fade-in">
                                                        {cat.links.map((link, linkIdx) => (
                                                            <div className='animate-slide-left' >
                                                                <li key={linkIdx} >
                                                                <a href="#" className="text-sm  text-gray-400 hover:text-white transition-colors">
                                                                    {link}
                                                                </a>
                                                            </li>
                                                            </div>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="pt-6 pb-10 space-y-6">
                            <Link className="flex items-center justify-center mt-10 space-x-6 h-full" to="/jobs">
                            <button className="text-gray-300 hover:text-white transition-colors px-5 py-2 bg-blue-600 rounded-md" >
                                View All Jobs
                            </button>
                        </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;