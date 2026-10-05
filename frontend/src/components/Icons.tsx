import type { ReactNode } from 'react'

interface IconProps {
  className?: string
  size?: number
}

function Svg({ children, className, size = 22, strokeWidth = 1.8 }: IconProps & { children: ReactNode; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

export const ArrowUpRight = (p: IconProps) => (
  <Svg {...p} size={p.size ?? 16} strokeWidth={2}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </Svg>
)

export const ArrowRight = (p: IconProps) => (
  <Svg {...p} size={p.size ?? 18} strokeWidth={2.2}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Svg>
)

export const LayoutIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </Svg>
)

export const ServerIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="6" rx="1.5" />
    <rect x="3" y="14" width="18" height="6" rx="1.5" />
    <path d="M7 7h.01" />
    <path d="M7 17h.01" />
  </Svg>
)

export const CodeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 8l-5 4 5 4" />
    <path d="M16 8l5 4-5 4" />
    <path d="M14 5l-4 14" />
  </Svg>
)

export const ClipboardIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 4h6v3H9z" />
    <path d="M7 5H5v16h14V5h-2" />
    <path d="M9 14l2 2 4-4" />
  </Svg>
)

export const MailIcon = (p: IconProps) => (
  <Svg {...p} size={p.size ?? 20}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Svg>
)

export const MenuIcon = (p: IconProps) => (
  <Svg {...p} size={p.size ?? 22}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </Svg>
)

export const CloseIcon = (p: IconProps) => (
  <Svg {...p} size={p.size ?? 22}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </Svg>
)

export const ChatIcon = (p: IconProps) => (
  <Svg {...p} size={p.size ?? 20}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </Svg>
)
