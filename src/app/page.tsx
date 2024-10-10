"use client"
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import CategoryButton from '@/component/CategoryButton';
import { Box, CircularProgress } from '@mui/material';

interface IRssFeed {
  title: string;
  link: string;
  description: string
}

const categories = ['Politics', 'War', 'Finance', 'Technology', 'Health', 'Entertainment'];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [rssFeedData, setRssFeedData] = useState<IRssFeed[]>([]);
  const [isFetchingRssData, setIsFetchingRssData] = useState<boolean>(false);

  useEffect(() => {
    const fetchRssFeed = async () => {
      setIsFetchingRssData(true)
      try {
        const apiResponse = await axios.get("https://realtime-rss-feed-server.onrender.com/rss-feed")
        setRssFeedData(apiResponse.data.data)
      } catch (error) {
        console.error("Error to fetch Realtime RSS Feed", error)
      } finally {
        setIsFetchingRssData(false)
      }
    }
    fetchRssFeed()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Realtime RSS News Aggregator
        </h1>
        {/* Category list */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <CategoryButton
              category="All"
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            {categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            ))}
          </div>
        </div>
        {/* News items */}
        <div className="space-y-6">
          {isFetchingRssData && 
            <Box className="flex flex-row items-center justify-center">
              <CircularProgress className='text-gray-800' />
            </Box>
          }
          {rssFeedData.filter(item => item.title && item.link).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition duration-300">
                    {item.title}
                  </a>
                </h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;