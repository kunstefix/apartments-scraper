import { motion } from 'framer-motion'

interface ListingCardProps {
  id: string | number;
  title: string;
  media: string;
  locality: string;
  index: number;
}

export default function ListingCard({ id, title, media, locality, index }: ListingCardProps) {
  return (
    <motion.div key={id} initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }} // Adjust the delay duration as needed
      className="bg-white rounded-lg shadow-md p-4 hover:bg-purple-100 transition-colors duration-200">
      <img
        src={media}
        alt="Element 1"
        className="w-full h-auto"
      />
      <p className="mt-2 text-lg font-semibold">{title}</p>
      <p className="mt-2 text-md font-semibold text-purple italic">{locality}</p>
    </motion.div>
  )
}
