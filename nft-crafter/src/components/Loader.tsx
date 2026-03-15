import React from 'react';
import { motion } from 'framer-motion';
import { LoadingState } from '../types';

interface LoaderProps {
  loadingState: LoadingState;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ loadingState, className = '' }) => {
  const { isLoading, progress, message } = loadingState;

  if (!isLoading) return null;

  return (
    <motion.div
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-dark-bg/90 backdrop-blur-lg border border-neon-purple/30 rounded-3xl p-8 max-w-md w-full mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {/* Main Loading Animation */}
        <div className="text-center space-y-6">
          {/* Spinning NFT Icon */}
          <motion.div
            className="relative mx-auto w-24 h-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full bg-neon-gradient rounded-2xl flex items-center justify-center relative overflow-hidden">
              <svg
                className="w-12 h-12 text-white relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              
              {/* Animated background particles */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 to-neon-green/20"
                animate={{ 
                  background: [
                    "linear-gradient(45deg, rgba(255,0,128,0.2) 0%, rgba(57,255,20,0.2) 100%)",
                    "linear-gradient(45deg, rgba(57,255,20,0.2) 0%, rgba(142,45,226,0.2) 100%)",
                    "linear-gradient(45deg, rgba(142,45,226,0.2) 0%, rgba(74,0,224,0.2) 100%)",
                    "linear-gradient(45deg, rgba(74,0,224,0.2) 0%, rgba(255,0,128,0.2) 100%)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            {/* Orbital rings */}
            <motion.div
              className="absolute inset-0 border-2 border-neon-blue/30 rounded-2xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border border-neon-green/30 rounded-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-neon-gradient">
              Criando seu NFT
            </h3>
            <motion.p
              className="text-gray-400"
              key={message}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {message}
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progresso</span>
              <span className="text-neon-green font-semibold">{Math.round(progress)}%</span>
            </div>
            
            <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-neon-blue/20 to-neon-green/20" />
              
              {/* Progress fill */}
              <motion.div
                className="h-full bg-neon-gradient relative overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              {/* Progress glow */}
              <motion.div
                className="absolute top-0 h-full bg-white/20 blur-sm"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Loading Steps */}
          <div className="flex justify-center gap-2">
            {['Upload', 'IPFS', 'Mint', 'Done'].map((step, index) => {
              const stepProgress = (progress / 100) * 4;
              const isActive = stepProgress > index;
              const isCurrent = Math.floor(stepProgress) === index;
              
              return (
                <motion.div
                  key={step}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-all duration-500
                    ${isActive 
                      ? 'bg-neon-gradient text-white' 
                      : isCurrent
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                        : 'bg-gray-800 text-gray-500'
                    }
                  `}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                  transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
                >
                  {step}
                </motion.div>
              );
            })}
          </div>

          {/* Fun Loading Facts */}
          <motion.div
            className="text-xs text-gray-500 italic"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💡 Dica: NFTs são únicos e imutáveis na blockchain
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;