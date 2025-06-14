"use client"

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { navItems } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'

export function MainHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-20 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Standard Pensions
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            <DesktopNav currentPath={pathname} />
          </nav>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button asChild variant="outline" className="font-medium">
            <Link href="/member-portal">Member Portal</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
            <Link href="/make-payment">Make Payment</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <MobileNav currentPath={pathname} />
        </div>
      )}
    </header>
  )
}

function DesktopNav({ currentPath }: { currentPath: string }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => {
          const isActive = currentPath === item.href || 
                          (item.dropdown && item.dropdown.some(subItem => currentPath === subItem.href))

          // If item has dropdown
          if (item.dropdown && item.dropdown.length > 0) {
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuTrigger 
                  className={cn(
                    isActive && "text-accent font-medium"
                  )}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute">
                  <ul className="grid gap-3 p-4 w-[300px]">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/20",
                              currentPath === subItem.href && "bg-accent/20 text-accent"
                            )}
                          >
                            <div className="text-sm font-medium">{subItem.title}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          }

          // If item has no dropdown
          return (
            <NavigationMenuItem key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  navigationMenuTriggerStyle(),
                  isActive && "text-accent font-medium"
                )}
              >
                {item.title}
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNav({ currentPath }: { currentPath: string }) {
  return (
    <nav className="flex flex-col space-y-3 p-4 bg-card border-b border-border/40">
      {navItems.map((item) => {
        const isActive = currentPath === item.href || 
                        (item.dropdown && item.dropdown.some(subItem => currentPath === subItem.href))

        // If item has dropdown
        if (item.dropdown && item.dropdown.length > 0) {
          return (
            <div key={item.href} className="space-y-2">
              <Link
                href={item.href}
                className={cn(
                  "text-lg font-medium",
                  isActive ? "text-accent" : "text-foreground"
                )}
              >
                {item.title}
              </Link>
              <div className="pl-4 border-l border-border space-y-2">
                {item.dropdown.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "block text-base",
                      currentPath === subItem.href ? "text-accent" : "text-muted-foreground"
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            </div>
          )
        }

        // If item has no dropdown
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-lg font-medium",
              isActive ? "text-accent" : "text-foreground"
            )}
          >
            {item.title}
          </Link>
        )
      })}

      {/* Mobile CTA Buttons */}
      <div className="pt-2 space-y-3">
        <Button asChild variant="outline" className="w-full justify-center">
          <Link href="/member-portal">Member Portal</Link>
        </Button>
        <Button asChild className="w-full justify-center bg-accent hover:bg-accent/90">
          <Link href="/make-payment">Make Payment</Link>
        </Button>
      </div>
    </nav>
  )
}

export { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'