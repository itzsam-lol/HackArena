// src/pages/ProjectSubmission.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProjectSubmission = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Add your form state and submission logic here
  
  return (
    <div className="min-h-screen pt-20 bg-hack-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-tech font-bold text-white mb-6">
          Project <span className="text-hack-pink">Submission</span>
        </h1>
        
        {/* Add your submission form here */}
        <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800">
          <p className="text-gray-300 mb-6">
            Submit your project for HackArena 2025. The hackathon will take place on June 28-29, 2025.
          </p>
          
          {/* Form will go here */}
        </div>
      </div>
    </div>
  );
};

export default ProjectSubmission;
