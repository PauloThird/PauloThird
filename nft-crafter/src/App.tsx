import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Uploader from './components/Uploader';
import NFTForm from './components/NFTForm';
import Loader from './components/Loader';
import NFTPreview from './components/NFTPreview';
import { NFT, NFTFormData, LoadingState } from './types';
import { nftService, uploadToIPFS, fileToDataURL } from './services/supabase';

function App() {
  const [formData, setFormData] = useState<NFTFormData>({
    title: '',
    description: '',
    image: null
  });

  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    progress: 0,
    message: 'Iniciando...'
  });

  const [createdNFT, setCreatedNFT] = useState<NFT | null>(null);
  const [allNFTs, setAllNFTs] = useState<NFT[]>([]);

  // Handle form data changes
  const handleFormChange = useCallback((data: Partial<NFTFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Arquivo muito grande! Máximo 10MB permitido.');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    setFormData(prev => ({ ...prev, image: file }));
    toast.success(`Imagem ${file.name} selecionada!`);
  }, []);

  // Simulate NFT creation process
  const createNFT = useCallback(async (data: NFTFormData) => {
    if (!data.image) {
      toast.error('Por favor, selecione uma imagem!');
      return;
    }

    try {
      setLoadingState({
        isLoading: true,
        progress: 0,
        message: 'Preparando upload...'
      });

      // Step 1: Convert image to data URL for preview
      const imageDataUrl = await fileToDataURL(data.image);
      
      setLoadingState({
        isLoading: true,
        progress: 25,
        message: 'Fazendo upload para IPFS...'
      });

      // Step 2: Upload to IPFS (simulated)
      const ipfsCID = await uploadToIPFS(data.image);
      
      setLoadingState({
        isLoading: true,
        progress: 60,
        message: 'Mintando NFT na blockchain...'
      });

      // Step 3: Create NFT record
      const nftData = {
        title: data.title,
        description: data.description,
        image_url: imageDataUrl, // In production, this would be the IPFS URL
        ipfs_cid: ipfsCID
      };

      const newNFT = await nftService.createNFT(nftData);
      
      setLoadingState({
        isLoading: true,
        progress: 90,
        message: 'Finalizando...'
      });

      // Small delay for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 1000));

      setLoadingState({
        isLoading: true,
        progress: 100,
        message: 'NFT criado com sucesso!'
      });

      // Wait a bit before showing result
      await new Promise(resolve => setTimeout(resolve, 500));

      setCreatedNFT(newNFT);
      setAllNFTs(prev => [newNFT, ...prev]);
      
      // Reset loading state
      setLoadingState({
        isLoading: false,
        progress: 0,
        message: ''
      });

      toast.success('🎉 NFT criado com sucesso!');
      
    } catch (error) {
      console.error('Error creating NFT:', error);
      setLoadingState({
        isLoading: false,
        progress: 0,
        message: ''
      });
      toast.error('Erro ao criar NFT. Tente novamente.');
    }
  }, []);

  // Reset form and start over
  const startOver = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      image: null
    });
    setCreatedNFT(null);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-neon-purple/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-neon-blue/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-neon-green/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center space-y-4">
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-neon-gradient rounded-2xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-neon-gradient font-space">
                NFT Crafter
              </h1>
            </motion.div>
            
            <motion.p
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Transforme suas imagens em NFTs únicos com nossa plataforma moderna e intuitiva
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex justify-center gap-8 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green">{allNFTs.length}</div>
                <div className="text-sm text-gray-500">NFTs Criados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">100%</div>
                <div className="text-sm text-gray-500">Sucesso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-purple">IPFS</div>
                <div className="text-sm text-gray-500">Descentralizado</div>
              </div>
            </motion.div>
          </div>
        </motion.header>

        {/* Main form */}
        <main className="container mx-auto px-4 pb-12">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-effect rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left column - Image upload */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Selecione sua Imagem
                    </h2>
                    <p className="text-gray-400 mb-6">
                      Escolha a imagem que será transformada em NFT
                    </p>
                  </motion.div>

                  <Uploader
                    onFileSelect={handleFileSelect}
                    selectedFile={formData.image}
                  />

                  {/* Tips */}
                  <motion.div
                    className="bg-neon-blue/5 border border-neon-blue/20 rounded-xl p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h4 className="text-neon-blue font-semibold mb-2">💡 Dicas para uma boa imagem:</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Resolução mínima de 400x400 pixels</li>
                      <li>• Formatos aceitos: PNG, JPG, GIF</li>
                      <li>• Imagens únicas têm mais valor</li>
                      <li>• Considere a história por trás da arte</li>
                    </ul>
                  </motion.div>
                </div>

                {/* Right column - Form */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Detalhes do NFT
                    </h2>
                    <p className="text-gray-400 mb-6">
                      Adicione informações que tornam seu NFT especial
                    </p>
                  </motion.div>

                  <NFTForm
                    onSubmit={createNFT}
                    isLoading={loadingState.isLoading}
                    formData={formData}
                    onFormChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent NFTs */}
          {allNFTs.length > 0 && (
            <motion.div
              className="max-w-6xl mx-auto mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                NFTs Recém-Criados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allNFTs.slice(0, 6).map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    className="bg-white/5 border border-gray-700 rounded-xl overflow-hidden hover:border-neon-green/50 transition-all duration-300 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCreatedNFT(nft)}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={nft.image_url}
                        alt={nft.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white truncate">{nft.title}</h4>
                      <p className="text-gray-400 text-sm truncate">{nft.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">#{nft.id}</span>
                        <span className="text-xs text-neon-green">●</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Modals and Overlays */}
      <AnimatePresence>
        {loadingState.isLoading && (
          <Loader loadingState={loadingState} />
        )}
        
        {createdNFT && (
          <NFTPreview
            nft={createdNFT}
            onClose={() => setCreatedNFT(null)}
            onCreateAnother={startOver}
          />
        )}
      </AnimatePresence>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#39FF14',
              secondary: '#1f2937',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1f2937',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
