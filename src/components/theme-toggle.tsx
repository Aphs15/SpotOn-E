
"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-sm text-muted-foreground">Appearance</span>
       <div className="flex items-center rounded-full border bg-secondary p-1">
        <Button
            variant={theme === 'light' ? 'default' : 'ghost'}
            size="icon"
            className="h-7 w-7 rounded-full"
            onClick={() => setTheme("light")}
        >
            <Sun />
        </Button>
        <Button
            variant={theme === 'dark' ? 'default' : 'ghost'}
            size="icon"
             className="h-7 w-7 rounded-full"
            onClick={() => setTheme("dark")}
        >
            <Moon />
        </Button>
        <Button
            variant={theme === 'system' ? 'default' : 'ghost'}
            size="icon"
             className="h-7 w-7 rounded-full"
            onClick={() => setTheme("system")}
        >
            <Monitor />
        </Button>
      </div>
    </div>
  )
}
