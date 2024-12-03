import React, { createContext, useContext, useState } from 'react';
import ErrorModal from './ErrorModal';

const ErrorContext = createContext(undefined);

export const useError = () => useContext(ErrorContext);


export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const showError = (message) => {
        setError(message);
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{ showError, clearError }}>
            {children}
            <ErrorModal error={error} onClose={clearError} />
        </ErrorContext.Provider>
    );
};
