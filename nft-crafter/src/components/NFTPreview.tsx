import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NFT } from '../types';

interface NFTPreviewProps {
  nft: NFT | null;
  onClose?: () => void;
  onCreateAnother?: () => void;
  className?: string;
}

const NFTPreview: React.FC<NFTPreviewProps> = ({ 
  nft, 
  onClose, 
  onCreateAnother, 
  className = '' 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!nft) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <motion.div
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-dark-bg/95 backdrop-blur-lg border border-neon-green/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", duration: 0.6 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-8 h-8 bg-neon-gradient rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-neon-gradient">
                  NFT Criado com Sucesso!
                </h2>
                <p className="text-gray-400 text-sm">Seu NFT está pronto na blockchain</p>
              </div>
            </motion.div>
            
            {onClose && (
              <motion.button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </div>
        </div>

        {/* NFT Card */}
        <div className="p-6 space-y-6">
          {/* 3D Flip Card */}
          <motion.div
            className="relative mx-auto max-w-sm"
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="relative w-full h-80 cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Front of card */}
              <motion.div
                className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                style={{ backfaceVisibility: "hidden" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-neon-green/30">
                  {/* Image */}
                  <div className="relative w-full h-3/4 overflow-hidden">
                    <img
                      src={nft.image_url}
                      alt={nft.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                    )}
                    
                    {/* Glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 via-transparent to-transparent" />
                    
                    {/* Animated border glow */}
                    <motion.div
                      className="absolute inset-0 border-2 border-neon-green/50"
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(57,255,20,0.3)",
                          "0 0 40px rgba(57,255,20,0.5)",
                          "0 0 20px rgba(57,255,20,0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  
                  {/* Card Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-white truncate">{nft.title}</h3>
                    <p className="text-xs text-gray-400">
                      Created {formatDate(nft.created_at)}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Back of card */}
              <motion.div
                className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 border-2 border-neon-purple/30 p-6"
                style={{ 
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                <div className="h-full flex flex-col justify-center space-y-4 text-center">
                  <div className="w-16 h-16 mx-auto bg-neon-gradient rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-neon-green">Verificado ✓</h4>
                    <p className="text-sm text-gray-400 mt-2">
                      Este NFT é autêntico e verificado na blockchain
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">
                    Clique para voltar
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* NFT Details */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">Título</label>
                <div className="p-3 bg-white/5 rounded-lg border border-gray-700">
                  <p className="text-white font-medium">{nft.title}</p>
                </div>
              </div>

              {/* ID */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">ID</label>
                <div className="p-3 bg-white/5 rounded-lg border border-gray-700 flex items-center justify-between">
                  <p className="text-gray-400 font-mono text-sm">#{nft.id}</p>
                  <button
                    onClick={() => copyToClipboard(nft.id)}
                    className="text-neon-blue hover:text-neon-green transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-300">Descrição</label>
              <div className="p-4 bg-white/5 rounded-lg border border-gray-700">
                <p className="text-gray-300 leading-relaxed">{nft.description}</p>
              </div>
            </div>

            {/* IPFS Info */}
            {nft.ipfs_cid && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300">IPFS CID</label>
                <div className="p-3 bg-neon-green/5 rounded-lg border border-neon-green/30 flex items-center justify-between">
                  <p className="text-neon-green font-mono text-sm">{nft.ipfs_cid}</p>
                  <button
                    onClick={() => copyToClipboard(nft.ipfs_cid!)}
                    className="text-neon-green hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {onCreateAnother && (
              <motion.button
                onClick={onCreateAnother}
                className="flex-1 btn-neon"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Criar Outro NFT
                </span>
              </motion.button>
            )}
            
            <motion.button
              onClick={() => window.open(`https://opensea.io/assets/ethereum/${nft.id}`, '_blank')}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-gray-600 hover:border-gray-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver no OpenSea
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NFTPreview;