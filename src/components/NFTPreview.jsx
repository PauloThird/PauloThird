import { motion } from 'framer-motion';

export default function NFTPreview({ data, onBack }) {
  const { title, description, imagePreview, cid } = data;

  return (
    <div className="space-y-6">
      <img src={imagePreview} alt={title} className="rounded-xl shadow-lg w-full object-contain" />
      <h2 className="text-2xl font-bold text-neonGreen">{title}</h2>
      <p className="text-gray-300">{description}</p>

      <div className="bg-matteBlack border border-neonBlue p-4 rounded-md text-sm break-all">
        <span className="text-neonPink font-medium">IPFS CID:</span> {cid}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="w-full py-3 rounded-md neon-gradient-bg text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-neonPurple"
      >
        Criar outro NFT
      </motion.button>
    </div>
  );
}