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

export const DeleteIcon = ({ className = '', ...props }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`${className}`}
      viewBox="0 0 24 24"
      {...props}
   >
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
   </svg>
);

export const XmarkIcon = ({ className = '', ...props }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`${className}`}
      viewBox="0 0 24 24"
      {...props}
   >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
   </svg>
);

export const KebabMenuIcon = ({ className = '', ...props }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={`${className}`}
      viewBox="0 0 24 24"
      {...props}
   >
      <circle cx={12} cy={5} r={2} />
      <circle cx={12} cy={19} r={2} />
      <circle cx={12} cy={12} r={2} />
   </svg>
);

export const EditIcon = ({ className = '', ...props }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`${className}`}
      viewBox="0 0 24 24"
      {...props}
   >
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
   </svg>
);

export const LinkIcon = ({ className = '', ...props }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={`${className}`}
      viewBox="0 0 24 24"
      {...props}
   >
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
      />
   </svg>
);
