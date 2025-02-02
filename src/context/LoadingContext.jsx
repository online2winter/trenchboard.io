import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

/**
* @typedef {Object} LoadingContextType
* @property {boolean} isLoading - Current loading state
* @property {function} setIsLoading - Function to update loading state
*/

/** @type {React.Context<LoadingContextType>} */
const LoadingContext = createContext({
isLoading: false,
setIsLoading: () => {
    throw new Error('useLoading must be used within LoadingProvider');
},
});

/**
* Provider component for loading state management
* @param {Object} props - Component props
* @param {React.ReactNode} props.children - Child components
* @returns {JSX.Element} Provider component
*/
export function LoadingProvider({ children }) {
const [isLoading, setIsLoading] = useState(false);

return (
    <LoadingContext.Provider
    value={{
        isLoading,
        setIsLoading,
    }}
    >
    {children}
    </LoadingContext.Provider>
);
}

LoadingProvider.propTypes = {
children: PropTypes.node.isRequired,
};

/**
* Custom hook to access loading state and setter
* @returns {LoadingContextType} Loading context value
* @throws {Error} If used outside of LoadingProvider
*/
export function useLoading() {
const context = useContext(LoadingContext);

if (context === undefined) {
    throw new Error('useLoading must be used within LoadingProvider');
}

return context;
}

export default LoadingContext;

