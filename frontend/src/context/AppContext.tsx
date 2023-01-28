import { createContext } from 'react';

interface ContextProps {
    apiUrl: string;
}

const AppContext = createContext<ContextProps>({
    apiUrl: 'http://localhost:5000/api',

});

export default AppContext;
