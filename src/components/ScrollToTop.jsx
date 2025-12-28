import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop Component
 * 
 * Scrolls to the top of the page on every route change.
 * This prevents the issue where navigating to a new page
 * lands you in the middle or bottom of the page.
 */
export default function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
