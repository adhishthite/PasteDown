import * as React from "react"

export enum Breakpoint {
  MOBILE = 480,
  TABLET = 768,
  DESKTOP = 1024,
  LARGE = 1280
}

export type BreakpointState = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLarge: boolean
  activeBreakpoint: 'mobile' | 'tablet' | 'desktop' | 'large'
}

export function useBreakpoints() {
  const [breakpoints, setBreakpoints] = React.useState<BreakpointState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLarge: false,
    activeBreakpoint: 'desktop'
  })

  React.useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth
      setBreakpoints({
        isMobile: width < Breakpoint.TABLET,
        isTablet: width >= Breakpoint.MOBILE && width < Breakpoint.DESKTOP,
        isDesktop: width >= Breakpoint.DESKTOP && width < Breakpoint.LARGE,
        isLarge: width >= Breakpoint.LARGE,
        activeBreakpoint: 
          width < Breakpoint.TABLET ? 'mobile' :
          width < Breakpoint.DESKTOP ? 'tablet' :
          width < Breakpoint.LARGE ? 'desktop' : 'large'
      })
    }
    
    updateBreakpoints()
    window.addEventListener("resize", updateBreakpoints)
    return () => window.removeEventListener("resize", updateBreakpoints)
  }, [])

  return breakpoints
}

// Keep original functionality for backwards compatibility
export function useIsMobile() {
  const { isMobile } = useBreakpoints()
  return isMobile
}
