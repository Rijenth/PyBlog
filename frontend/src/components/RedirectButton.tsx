import { useNavigate } from 'react-router-dom';

interface ButtonProps {
    buttonText: string;
    buttonUrl: string;
    buttonClass: string;
}

const RedirectButton = (props:ButtonProps) => {
    const navigate = useNavigate();

    return (
        <a style={{paddingLeft: 5, paddingRight: 5}} onClick={()=>navigate(props.buttonUrl)}>  
            <button type='button' className={props.buttonClass}>
                {props.buttonText}
            </button>
        </a>
    )
}

export default RedirectButton;