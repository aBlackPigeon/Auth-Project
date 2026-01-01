import React from 'react';
import {motion} from 'framer-motion';

export const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-pink-900 flex
        items-center justify-center relative overflow-hidden">
            <motion.div className="w-16 h-16 border-4 border-t-4 border-t-red-500
            border-red-200 rounded-full"
            animate={{rotate: 360}}
            transition={{duration: 1, repeat: Infinity,ease: "linear"}}/>
        </div>
    )
}