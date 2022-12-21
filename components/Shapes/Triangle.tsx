import React from 'react'

interface TriangleProps {
  className?: string
  fill?: string
}

const Triangle:React.FC<TriangleProps> = ({className, fill="none"}) => {
  return (
    <svg className={className}
      width="345"
      height="503"
      viewBox="0 0 345 503"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M344.172 1.37935L343.496 501.582L1.86425 136.218L344.172 1.37935Z"
        stroke="black"
      />
    </svg>
  );
}

export default Triangle