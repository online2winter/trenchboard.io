import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
constructor(props) {
    super(props);
    this.state = { hasError: false };
}

static getDerivedStateFromError(error) {
    return { hasError: true };
}

render() {
    if (this.state.hasError) {
    return (
        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
        <h3 className="text-red-800 dark:text-red-200 font-medium">Something went wrong</h3>
        <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
        >
            Try again
        </button>
        </div>
    );
    }
    return this.props.children;
}
}

const LoadingSpinner = () => (
<div className="flex justify-center items-center h-full min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
</div>
);

const CardWrapper = ({
title,
subtitle,
children,
isLoading,
headerRight,
className = "",
}) => {
return (
    <ErrorBoundary>
    <div
        className={`
        bg-white dark:bg-gray-800 
        rounded-xl shadow-sm hover:shadow-md
        transition-all duration-300 ease-in-out
        border border-gray-100 dark:border-gray-700
        ${className}
        `}
    >
        {/* Card Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center">
            <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {title}
            </h2>
            {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
                </p>
            )}
            </div>
            {headerRight && (
            <div className="flex items-center">{headerRight}</div>
            )}
        </div>
        </div>

        {/* Card Content */}
        <div className="p-4">
        <Suspense fallback={<LoadingSpinner />}>
            {isLoading ? <LoadingSpinner /> : children}
        </Suspense>
        </div>
    </div>
    </ErrorBoundary>
);
};

CardWrapper.propTypes = {
title: PropTypes.string.isRequired,
subtitle: PropTypes.string,
children: PropTypes.node.isRequired,
isLoading: PropTypes.bool,
headerRight: PropTypes.node,
className: PropTypes.string,
};

CardWrapper.defaultProps = {
isLoading: false,
subtitle: '',
className: '',
};

export default CardWrapper;

