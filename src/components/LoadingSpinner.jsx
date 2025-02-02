import React from 'react';

const LoadingSpinner = () => {
return (
    <div className="flex items-center justify-center p-4">
        <div className="relative w-12 h-12">
            <div 
                className="absolute w-full h-full rounded-full border-4 border-t-[#00ffaa] border-r-[#00c8ff] border-b-[#00ffaa]/30 border-l-[#00c8ff]/30 animate-[spin_1s_linear_infinite] shadow-[0_0_15px_rgba(0,255,178,0.3)]"
            />
            <div 
                className="absolute w-full h-full rounded-full border-4 border-[#00ffaa]/10 border-t-transparent border-r-transparent animate-[spin_2s_linear_infinite_reverse] blur-[2px]"
            />
        </div>
    </div>
);
};

export default LoadingSpinner;
