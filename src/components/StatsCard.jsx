import React, { useState, useEffect } from 'react';
import '../styles/animations.css';

const StatsCard = ({ title, value, change, isLoading }) => {
const [animatedValue, setAnimatedValue] = useState(0);
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
    if (!isLoading) {
    const duration = 1000;
    const steps = 20;
    const stepValue = value / steps;
    const stepTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
        setAnimatedValue(value);
        clearInterval(timer);
        } else {
        setAnimatedValue(current);
        }
    }, stepTime);

    return () => clearInterval(timer);
    }
}, [value, isLoading]);

useEffect(() => {
    setIsVisible(true);
}, []);

if (isLoading) {
    return (
    <div className="glass card-hover rounded-xl p-6 min-h-[200px] flex items-center justify-center">
        <div className="pulse w-6 h-6 rounded-full bg-emerald-500/20"></div>
    </div>
    );
}

const changeColor = change >= 0 ? 'text-emerald-500' : 'text-red-500';

return (
    <div className={`glass card-hover rounded-xl p-6 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className="live-indicator w-2 h-2"></div>
    </div>
    
    <div className="animate-count">
        <span className="text-3xl font-bold animate-gradient-text">
        {typeof animatedValue === 'number' ? animatedValue.toLocaleString() : animatedValue}
        </span>
    </div>
    
    <div className={`mt-4 flex items-center ${changeColor}`}>
        <span className="text-sm font-medium">
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
    </div>
    </div>
);
};

export default StatsCard;

