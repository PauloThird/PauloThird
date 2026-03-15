import { useState } from 'react';
import Uploader from './Uploader.jsx';
import { motion } from 'framer-motion';

export default function NFTForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelect = ({ file, preview }) => {
    setImageFile(file);
    setImagePreview(preview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !imageFile) {
      alert('Por favor, preencha todos os campos e selecione uma imagem.');
      return;
    }
    onSubmit({ title, description, imageFile, imagePreview });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Uploader onSelect={handleImageSelect} preview={imagePreview} />

      <div className="flex flex-col space-y-2">
        <label htmlFor="title" className="text-sm text-neonPink font-medium">
          Título do NFT
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md p-3 bg-matteBlack border border-neonBlue focus:outline-none focus:ring-2 focus:ring-neonPurple transition"
          placeholder="Ex: Meu NFT incrível"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className="text-sm text-neonPink font-medium">
          Descrição
        </label>
        <textarea
          id="description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-md p-3 bg-matteBlack border border-neonBlue focus:outline-none focus:ring-2 focus:ring-neonPurple transition"
          placeholder="Fale sobre seu NFT..."
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full py-3 rounded-md neon-gradient-bg text-white font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-neonGreen"
      >
        Criar NFT
      </motion.button>
    </form>
  );
}