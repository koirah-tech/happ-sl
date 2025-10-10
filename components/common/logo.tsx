"use client"


import { cn } from "@/lib/utils"
import Link from "next/link";
import { MOHSLogoBlackBG, MOHSLogoWhiteBG } from "../svg/spriteAndIconSVGs";
import { useTheme } from "next-themes";
import { useEffect } from "react";


interface LogoProps {
    size?: "sm" | "md" | "lg" | "xl"
    orientation?: "horizontal" | "vertical"
    showText?: boolean
    className?: string
    width?: number
    height?: number
}

const sizeConfig = {
    sm: {
        text: "text-sm",
        spacing: "space-y-1",
    },
    md: {
        text: "text-[1.3rem]",
        spacing: "space-y-1",
    },
    lg: {
        text: "text-[1.5rem]",
        spacing: "space-y-1",
    },
    xl: {
        text: "text-[1.6rem]",
        spacing: "space-y-1",
    },
}

export default function Logo({ size = "md", showText = true, orientation = "horizontal", width = 50, height = 50, className }: LogoProps) {

    const config = sizeConfig[size]
    const {resolvedTheme, setTheme} = useTheme();

    useEffect(() => {
        if (resolvedTheme !== "dark" && resolvedTheme !== "light") {
            setTheme("light")
        }
    }, [resolvedTheme, setTheme])

    return (
        <Link href="/" 
        className={cn("flex items-center ", orientation === "vertical" ? "flex-col gap-0" : "gap-2", config.spacing, className)}
        >
            {/* Logo Icon */}
            { resolvedTheme === "dark" ? (<MOHSLogoBlackBG width={width} height={height}/>) : (<MOHSLogoWhiteBG width={width} height={height} />)}

            {/* PApp Name */}
            {showText && (
                <span className={cn("font-bold leading-tight", config.text)}>
                    HAPP-SL
                </span>
            )}
        </Link>
    )
}
