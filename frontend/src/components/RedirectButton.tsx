import React from 'react';

interface ButtonProps {
    buttonText: string;
    buttonUrl: string;
    buttonClass: string;
}

const RedirectButton = (props:ButtonProps) => {
    return (
        <a href={props.buttonUrl}>  
            <button type='button' className={props.buttonClass}>
                {props.buttonText}
            </button>
        </a>
    )
}

export default RedirectButton;