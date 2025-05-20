import './eslogan.css';
import { motion } from "framer-motion";

function Eslogan()  {
  return (
    <motion.div
      className="eslogan flex justify-center items-center h-screen bg-gray-900 text-white"
      initial={{ opacity: 0, x: -100 }}  // entra desde la izquierda
      animate={{ opacity: 1, x: 0 }}     // hasta su posición final
      transition={{ type: "spring", stiffness: 1000, damping: 1000 }}
    >
      <h1 className="text-4xl font-bold">
        Fabric of the Game
      </h1>
    </motion.div>
  );
}

export default Eslogan;
