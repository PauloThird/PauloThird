import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NFTForm from './components/NFTForm.jsx';
import Loader from './components/Loader.jsx';
import NFTPreview from './components/NFTPreview.jsx';

const steps = {
  FORM: 'form',
  LOADING: 'loading',
  PREVIEW: 'preview',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(steps.FORM);
  const [nftData, setNftData] = useState(null);

  const handleCreateNFT = async ({ title, description, imageFile, imagePreview }) => {
    // Basic validation already done in form.
    setCurrentStep(steps.LOADING);

    // Simulate IPFS upload and backend save
    const uploadToIPFS = async (file) => {
      return new Promise((res) => {
        setTimeout(() => res('Qm' + Math.random().toString(36).substring(2, 10)), 1000);
      });
    };

    const cid = await uploadToIPFS(imageFile);

    // Simulate delay for backend persist
    await new Promise((res) => setTimeout(res, 2000));

    setNftData({ title, description, imagePreview, cid });
    setCurrentStep(steps.PREVIEW);
  };

  const reset = () => {
    setCurrentStep(steps.FORM);
    setNftData(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text neon-gradient-bg drop-shadow-lg mb-4">
        NFT Crafter
      </h1>

      <AnimatePresence mode="wait">
        {currentStep === steps.FORM && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg"
          >
            <NFTForm onSubmit={handleCreateNFT} />
          </motion.div>
        )}

        {currentStep === steps.LOADING && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <Loader />
            <p className="mt-4 text-neonGreen">Criando seu NFT, aguarde...</p>
          </motion.div>
        )}

        {currentStep === steps.PREVIEW && nftData && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg"
          >
            <NFTPreview data={nftData} onBack={reset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}