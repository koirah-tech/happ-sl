"use client"

import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {useTheme} from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    RiMenu3Line,
    RiCloseLargeLine,
    RiArrowDownSLine,
} from "@remixicon/react";

import Logo from "./logo";
import CTAButton from "@/components/common/ctaButton";
import ThemeToggle from "@/components/common/themeToggler";
import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";

interface DropdownItems {
    name: string;
    href: string;
    description: string;
}

interface NavItem {
    name: string;
    href?: string;
    hasDropdown?: boolean;
    dropdownItems?: DropdownItems[];
}

const navItems: NavItem[] = [
    {name: "Home", href: "/"},
    {name: "Verify Credentials", href: "/verify"},
    {name: "Help", href: "/help"},
]


export const Navigation = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string|null>(null);
    const theme = useTheme();
    const isMobile = useIsMobile();
    const pathname = usePathname();

    const isActive = (href?: string) => 
        !!href && (pathname === href || pathname.startsWith(href + "/"));



    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])



    const desktopVPVariants = {
        initial: {y: -100, opacity: 0},
        animate: {y: 0, opacity: 1},
        scrolled: {
            backdropFilter: "blur(20px)",
            // @ts-ignore
            backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.8)" :"rgba(255, 255, 255, 0.8)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }
    }

    const mobileVPVariants = {
        closed: { opacity: 0, height: 0 },
        open: { opacity: 1, height: 'auto' },
    }

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    }



    // @ts-ignore
    return (
        <motion.header
            className=" z-50 bg-background/95 backdrop-blur-lg dark:bg-muted"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
            }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-26 items-center justify-between lg:h-30">

                    <motion.button
                        className="rounded-lg p-2 transition-colors duration-200 hover:bg-muted lg:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMobileMenuOpen ? (
                            <RiCloseLargeLine className="h-6 w-6" />
                        ) : (
                            <RiMenu3Line className="h-6 w-6" />
                        )}
                    </motion.button>


                    {/* The main navigation - the left side of the navigation */}
                    <nav className="hidden items-center space-x-6 lg:flex">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() =>
                                    item.hasDropdown && setActiveDropdown(item.name)
                                }
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href ? item.href : ""}
                                    className={cn("flex items-center space-x-1 font-medium text-foreground transition-colors duration-200 hover:text-accent", isActive(item.href)
                                        ? "text-accent underline decoration-2 underline-offset-4"
                                        : "text-foreground hover:text-accent")}
                                >
                                    <span>{item.name}</span>
                                    {item.hasDropdown && (
                                        <RiArrowDownSLine className="h-4 w-4 transition-transform duration-200" />
                                    )}
                                </Link>
                                {item.hasDropdown && (
                                    <AnimatePresence>
                                        {activeDropdown === item.name && (
                                            <motion.div
                                                className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur-lg"
                                                variants={dropdownVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.dropdownItems?.map((dropdownItem) => (
                                                    <Link
                                                        key={dropdownItem.name}
                                                        href={dropdownItem.href}
                                                        className="block px-4 py-3 transition-colors duration-200 hover:bg-accent text-accent-foreground"
                                                    >
                                                        <div className="font-medium text-foreground">
                                                            {dropdownItem.name}
                                                        </div>
                                                        {dropdownItem.description && (
                                                            <div className="text-sm text-muted-foreground">
                                                                {dropdownItem.description}
                                                            </div>
                                                        )}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>
                    
                    {/* The app logo */}
                    <Logo 
                        orientation={isMobile ? "horizontal" : "vertical"} 
                        showText={isMobile ? false : true}
                        width={isMobile ? 70 : 50}
                        height={isMobile ? 70 : 50} 
                    />

                    {/* Call to action menu - the right side of the navigation */}
                    <div className="hidden items-center space-x-4 lg:flex">

                        <Link
                            href="/signin"
                            className="font-medium text-foreground transition-colors duration-200
                            underline decoration-double decoration-2 decoration-accent underline-offset-4  hover:text-accent"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/register"
                        >
                            <CTAButton className="font-bold bg-secondary hover:bg-secondary dark:bg-primary">
                                APPLY NOW
                            </CTAButton>
                        </Link>
                        <ThemeToggle />
                    </div>

                    <div className="lg:hidden px-4 py-2 border-t border-muted">
                        <ThemeToggle />            
                    </div>
                    
                </div>
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="
                            overflow-hidden lg:hidden
                            absolute inset-x-0 top-15 z-40
                            border-secondary border-t-2 backdrop-blur-lg
                            "
                            variants={mobileVPVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <div className=" space-y-2 border border-border bg-background/95 py-4 dark:shadow-xl backdrop-blur-lg rounded-bl-xl rounded-br-xl">
                                {navItems.map((item) => item.hasDropdown ? (
                                        <details key={item.name} className="px-4">
                                            <summary className="flex justify-between py-3 cursor-pointer">
                                                {item.name}
                                                <RiArrowDownSLine className="w-4 h-4" />
                                            </summary>
                                            <div className="pl-4 pb-2 space-y-1">
                                                {item.dropdownItems!.map(dd => (
                                                    <Link
                                                        key={dd.name}
                                                        href={dd.href}
                                                        className="block py-2 text-sm hover:text-accent"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {dd.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </details>
                                    ) : (
                                    <Link
                                        key={item.name}
                                        href={item.href ? item.href : ""}
                                        className={cn("block px-4 py-3 font-medium text-foreground transition-colors duration-200 hover:bg-muted", isActive(item.href) ? "text-accent font-semibold" : "text-foreground hover:text-accent")}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <div className="space-y-2 px-4 py-2">
                                    <Link
                                        href="/signin"
                                        className="block w-full rounded-lg py-2.5 text-center font-medium text-foreground transition-colors duration-200 hover:bg-muted"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>

                                    <Link
                                        href="/register"
                                        className="block w-full rounded-lg bg-gradient-to-r from-primary to-secondary py-2.5 text-center font-bold text-white transition-all duration-200 hover:shadow-lg"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        APPLY NOW
                                    </Link>
                                </div>
                                
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}