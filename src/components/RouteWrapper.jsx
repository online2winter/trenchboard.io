import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/50">
        <h2 className="text-red-800 dark:text-red-200">Something went wrong.</h2>
        <button
            onClick={() => window.location.reload()}
            className="mt-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
        >
            Reload page
        </button>
        </div>
    );
    }
    return this.props.children;
}
}

const LoadingSpinner = () => (
<div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
</div>
);

const RouteWrapper = ({
children,
withBackground = true,
className = '',
loading = false
}) => {
return (
    <ErrorBoundary>
    <AnimatePresence mode="wait">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className={`h-full ${withBackground ? 'bg-white dark:bg-gray-800 shadow-sm rounded-lg' : ''} ${className}`}
        >
        <Suspense fallback={<LoadingSpinner />}>
            {loading ? <LoadingSpinner /> : children}
        </Suspense>
        </motion.div>
    </AnimatePresence>
    </ErrorBoundary>
);
};

export default RouteWrapper;

