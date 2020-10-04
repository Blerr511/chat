import React from "react";

const AddPersonIcon = React.forwardRef(({ ...rest }, ref) => {
    return (
        <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            ref={ref}
            {...rest}
        >
            <path
                fill="currentColor"
                d="M14 2H16V3H14V5H13V3H11V2H13V0H14V2Z"
            ></path>
            <path
                fill="currentColor"
                d="M6.5 8.00667C7.88 8.00667 9 6.88667 9 5.50667C9 4.12667 7.88 3.00667 6.5 3.00667C5.12 3.00667 4 4.12667 4 5.50667C4 6.88667 5.12 8.00667 6.5 8.00667Z"
            ></path>
            <path
                fill="currentColor"
                d="M6.5 8.34C3.26 8.34 1 9.98666 1 12.34V13.0067H12V12.34C12 9.98 9.74 8.34 6.5 8.34Z"
            ></path>
        </svg>
    );
});

export default AddPersonIcon;
