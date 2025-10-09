"use client"

/**
 * Theme.tsx
 *
 * Wraps your entire app in next-themes’ ThemeProvider,
 * enabling light / dark / system preference toggling.
 *
 * @module Theme
 */

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"


/**
 * Theme
 *
 * A simple wrapper component that provides theming context
 * to all of its child components via next-themes.
 *
 * @param {{ children: React.ReactNode }} props
 *   @property {React.ReactNode} props.children - Your app’s component tree
 * @returns {JSX.Element}
 */
export function Theme({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
        >
            {children}
        </NextThemesProvider>
    )
}