import { useRef } from 'react';
import { Player } from 'lottie-react';
import { motion } from 'framer-motion';

export default function Uploader({ onSelect, preview }) {
  const inputRef = useRef();

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        onSelect({ file, preview: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAnimation = 'https://assets10.lottiefiles.com/packages/lf20_iwmd6pyr.json';

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="cursor-pointer border-2 border-dashed border-neonPurple rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-2"
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-48 object-contain rounded-lg" />
        ) : (
          <>
            {/* Placeholder Lottie animation */}
            <div className="w-24 h-24 mb-2">
              <Player autoplay loop src={uploadAnimation} style={{ height: '100%', width: '100%' }} />
            </div>
            <p className="text-neonPurple font-medium">Clique ou arraste para fazer upload</p>
          </>
        )}
      </motion.div>
    </div>
  );
}