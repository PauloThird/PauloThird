import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NFTFormData } from '../types';

interface NFTFormProps {
  onSubmit: (data: NFTFormData) => void;
  isLoading: boolean;
  formData: NFTFormData;
  onFormChange: (data: Partial<NFTFormData>) => void;
}

const NFTForm: React.FC<NFTFormProps> = ({ 
  onSubmit, 
  isLoading, 
  formData, 
  onFormChange 
}) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.length > 50) {
      newErrors.title = 'Título deve ter no máximo 50 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Descrição deve ter no máximo 500 caracteres';
    }

    if (!formData.image) {
      newErrors.image = 'Imagem é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof NFTFormData, value: string | File | null) => {
    onFormChange({ [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title Input */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="title" className="block text-sm font-semibold text-gray-300">
          Título do NFT *
        </label>
        <div className="relative">
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Digite um título épico para seu NFT..."
            className={`
              w-full px-4 py-3 bg-white/5 border-2 rounded-xl
              text-white placeholder-gray-400 font-medium
              transition-all duration-300 focus:outline-none
              ${errors.title 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-gray-600 focus:border-neon-blue hover:border-gray-500'
              }
              focus:bg-white/10 focus:shadow-lg focus:shadow-neon-blue/20
            `}
            maxLength={50}
            disabled={isLoading}
          />
          <div className="absolute right-3 top-3 text-xs text-gray-500">
            {formData.title.length}/50
          </div>
        </div>
        {errors.title && (
          <motion.p
            className="text-red-400 text-sm flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.title}
          </motion.p>
        )}
      </motion.div>

      {/* Description Input */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label htmlFor="description" className="block text-sm font-semibold text-gray-300">
          Descrição *
        </label>
        <div className="relative">
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Conte a história por trás do seu NFT. O que o torna único e especial?"
            rows={4}
            className={`
              w-full px-4 py-3 bg-white/5 border-2 rounded-xl
              text-white placeholder-gray-400 font-medium resize-none
              transition-all duration-300 focus:outline-none
              ${errors.description 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-gray-600 focus:border-neon-purple hover:border-gray-500'
              }
              focus:bg-white/10 focus:shadow-lg focus:shadow-neon-purple/20
            `}
            maxLength={500}
            disabled={isLoading}
          />
          <div className="absolute right-3 bottom-3 text-xs text-gray-500">
            {formData.description.length}/500
          </div>
        </div>
        {errors.description && (
          <motion.p
            className="text-red-400 text-sm flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.description}
          </motion.p>
        )}
      </motion.div>

      {/* Image Error */}
      {errors.image && (
        <motion.p
          className="text-red-400 text-sm flex items-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors.image}
        </motion.p>
      )}

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          type="submit"
          disabled={isLoading}
          className={`
            w-full btn-neon relative group
            ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-neon-gradient'}
          `}
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Criando NFT...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Criar NFT
              </>
            )}
          </span>
          
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-neon-pink/20 rounded-xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      {/* Form Statistics */}
      <motion.div
        className="flex justify-center gap-6 text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${formData.title ? 'bg-neon-green' : 'bg-gray-600'}`} />
          Título
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${formData.description ? 'bg-neon-green' : 'bg-gray-600'}`} />
          Descrição
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${formData.image ? 'bg-neon-green' : 'bg-gray-600'}`} />
          Imagem
        </div>
      </motion.div>
    </motion.form>
  );
};

export default NFTForm;