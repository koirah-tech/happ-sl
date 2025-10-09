"use client"

import React, {JSX} from "react";
import {RiSunFill, RiMoonFill} from "@remixicon/react";
import {useTheme} from "next-themes";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';



/**
 * ThemeToggle
 *
 * Presents a dropdown allowing the user to switch between light, dark,
 * and system theme modes. Visually toggles icon states to reflect current
 * theme, and calls `setTheme` from `next-themes` to apply the selection.
 *
 * @component
 * @returns {JSX.Element}
 */
function ThemeToggle(): JSX.Element {

    // grab the setter to change theme
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <RiSunFill className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <RiMoonFill className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ThemeToggle