import { motion } from "framer-motion";

interface ICategoryButton {
    category: string,
    selectedCategory: string,
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}

const CategoryButton = (props: ICategoryButton) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${props.selectedCategory === props.category
                ? 'text-gray-800 shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
        onClick={() => props.setSelectedCategory(props.category)}
    >
        {props.category}
    </motion.button>
);

export default CategoryButton