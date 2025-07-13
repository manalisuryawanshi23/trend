import * as React from "react"

export const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.5 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
    <path d="M12 11v10" />
    <path d="M12 11a4 4 0 0 0-4-4H4" />
    <path d="m16 11 3-1.5" />
  </svg>
)
