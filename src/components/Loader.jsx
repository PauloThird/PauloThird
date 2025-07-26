import { Player } from 'lottie-react';
import { motion } from 'framer-motion';

const loaderAnimation = 'https://assets2.lottiefiles.com/packages/lf20_Hui5eE.json';

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center"
    >
      <div className="w-32 h-32">
        <Player autoplay loop src={loaderAnimation} style={{ height: '100%', width: '100%' }} />
      </div>
    </motion.div>
  );
}