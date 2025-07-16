import React from 'react'

interface GitHubIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export function GitHubIcon({ size = 24, ...props }: GitHubIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 3c0 0-1.04-.35-3.47 1.36A12.6 12.6 0 0 0 12 3.81 12.6 12.6 0 0 0 7.5 4.36c-2.43-1.71-3.47-1.36-3.47-1.36A5.07 5.07 0 0 0 2 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}
