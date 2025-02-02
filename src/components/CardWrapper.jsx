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
        <div className="p-4 bg-red-500/10 backdrop-blur-lg rounded-lg border border-red-500/20">
            <h3 className="text-red-400 font-medium">Something went wrong</h3>
            <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 hover:scale-[1.02]"
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
    relative overflow-hidden
    rounded-2xl bg-black/20 backdrop-blur-lg
    border border-white/5
    transition-all duration-300 ease-in-out
    hover:shadow-[0_0_20px_rgba(0,255,178,0.15)]
    hover:scale-[1.02]
    ${className}
    `}
    >
        {/* Card Header */}
        <div className="p-4 border-b border-white/5 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00ffaa]/5 to-[#00c8ff]/5 pointer-events-none" />
            <div className="flex justify-between items-center relative">
            <div>
                <h2 className="text-lg font-semibold text-white">
                {title}
                </h2>
                {subtitle && (
                <p className="text-sm text-[#00ffaa]/70 mt-1">
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
        <div className="p-4 relative">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00ffaa]/5 to-[#00c8ff]/5 pointer-events-none" />
            <div className="relative">
            <Suspense fallback={<LoadingSpinner />}>
                {isLoading ? <LoadingSpinner /> : children}
            </Suspense>
            </div>
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

