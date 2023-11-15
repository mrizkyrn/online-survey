/* eslint-disable react/prop-types */
export const BackIcon = ({ className = '', ...props }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={`${className}`}
      viewBox="0 0 24 24"
      {...props}
   >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
   </svg>
);
