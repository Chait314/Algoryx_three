"use client";

import { useTheme } from "@/context/ThemeContext";
import { ArrowUpRight, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetID = href.replace("#", "");
        const element = document.getElementById(targetID);

        if(element){
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Simulation", href: "#simulation" },
        { name: "Community", href: "#community" },
    ];

    return (
        <header
        className={`fixed top-0 left-0 right-0 z-50  ${theme==='dark' ? 'bg-slate-950/80':'bg-gray-50'} transition-all duration-300 ${
            isScrolled
            ? "backdrop-blur-md border-b border-slate-800/50 py-3 shadow-lg"
            : ""
        }`}
        >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <a href="#home" className="flex items-center gap-2 group" onClick={(e)=>smoothScroll(e,"#home")}>
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white dark shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
            </div>
            <span className={`font-bold text-xl tracking-tight ${theme==='dark' ? 'text-white' : 'text-black'}`}>
                Algoryx<span className="text-blue-500">.3D</span>
            </span>
            </a>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e)=>smoothScroll(e,link.href)}
                    className={`text-sm font-medium transition-colors ${theme==='dark' ? 'text-gray-100 hover:text-gray-50' : 'text-gray-800 hover:text-black'}`}
                    > 
                    {link.name} 
                </a>
            ))}
            </nav>
            { theme === 'dark'? (<button onClick = {()=>toggleTheme()} className="text-amber-400 hover:cursor-pointer h-[50px]"><Sun/></button>): 
        (<button onClick = {()=> toggleTheme()} className="text-black hover:cursor-pointer h-[50px]"><Moon/></button>)}
            {/* Desktop Action */}
            <div className="hidden md:flex items-center gap-4">
            <a
                href="https://community.algoryx.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-200 bg-slate-900 border border-slate-700/60 rounded-full hover:bg-slate-800 hover:border-slate-600 transition-all shadow-sm"
            >
                Algoryx Hub <ArrowUpRight className="w-4 h-4 opacity-70" />
            </a>
            </div>

            {/* Mobile Toggle */}
            <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden  hover:cursor-pointer ${theme==='dark'?'text-slate-300':'text-slate-900'} p-2`}
            aria-label="Toggle navigation menu"
            >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
            <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
                <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-300 hover:text-white"
                >
                {link.name}
                </a>
            ))}
            <a
                href="https://community.algoryx.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
                Algoryx Hub
            </a>
            </div>
        )}
        
        </header>
    );
}