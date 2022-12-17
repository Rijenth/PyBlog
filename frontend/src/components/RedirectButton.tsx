import React from 'react';

interface ButtonProps {
    buttonText: string;
    buttonUrl: string;
    buttonClass: string;
}

const RedirectButton = (props:ButtonProps) => {
    return (
        <a style={{paddingLeft: 5, paddingRight: 5}} href={props.buttonUrl}>  
            <button type='button' className={props.buttonClass}>
                {props.buttonText}
            </button>
        </a>
    )
}

export default RedirectButton;