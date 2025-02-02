import { Fragment } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const PageHeader = ({ 
title, 
subtitle, 
breadcrumbs = [], 
actions,
className = ''
}) => {
return (
    <div className={`pb-6 ${className}`}>
    {breadcrumbs.length > 0 && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
            {breadcrumbs.map((item, index) => (
            <Fragment key={item.href}>
                {index > 0 && (
                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                )}
                <li>
                <a
                    href={item.href}
                    className={`text-sm font-medium ${
                    index === breadcrumbs.length - 1
                        ? 'text-gray-700 dark:text-gray-200'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                    {item.name}
                </a>
                </li>
            </Fragment>
            ))}
        </ol>
        </nav>
    )}
    
    <div className="flex items-center justify-between">
        <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
        </h1>
        {subtitle && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
            </p>
        )}
        </div>
        {actions && (
        <div className="flex items-center space-x-4">
            {actions}
        </div>
        )}
    </div>
    </div>
);
};

export default PageHeader;

