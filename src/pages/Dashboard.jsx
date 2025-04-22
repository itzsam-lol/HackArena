// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        // Fetch user data
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          
          // Check if user has a team
          if (userDoc.data().teamId) {
            const teamDocRef = doc(db, "teams", userDoc.data().teamId);
            const teamDoc = await getDoc(teamDocRef);
            
            if (teamDoc.exists()) {
              setTeamData(teamDoc.data());
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load your profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast.success('Successfully logged out');
    } catch (error) {
      console.error("Failed to log out", error);
      toast.error('Failed to log out');
    }
  };

  // Placeholder event data
  const upcomingEvents = [
    {
      title: "Registration Deadline",
      date: "May 15, 2025",
      description: "Last day to register for HackArena 2025"
    },
    {
      title: "Pre-Event Workshop",
      date: "May 25, 2025",
      description: "Ideation sessions and technical workshops to prepare for the hackathon"
    },
    {
      title: "Team Finalization",
      date: "June 15, 2025",
      description: "Final selection of teams who will participate in the main event"
    }
  ];

  // Placeholder announcements
  const announcements = [
    {
      title: "New Problem Statements Released",
      date: "April 15, 2025",
      content: "Check out the new problem statements from our sponsors in the gaming and esports industry."
    },
    {
      title: "Special Workshop Announcement",
      date: "April 10, 2025",
      content: "Join our special workshop on Game Development with Unity on April 22, 2025."
    },
    {
      title: "Early Bird Registration Closing Soon",
      date: "April 5, 2025",
      content: "Early bird registration closes on April 20. Register now to get exclusive perks!"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-hack-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-hack-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-hack-black">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 mb-8 border border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-tech font-bold text-white mb-2">
                Welcome, <span className="text-hack-pink">{userData?.name || currentUser.displayName || currentUser.email}</span>
              </h1>
              <p className="text-gray-400">
                {teamData ? `Team: ${teamData.name}` : "You're not part of any team yet"}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-8">
          <div className="flex overflow-x-auto space-x-4 pb-2">
            {['overview', 'team', 'submissions', 'resources'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-tech uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'bg-hack-pink text-black' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                } rounded-md`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 mb-8 border border-gray-800">
                  <h2 className="text-xl font-tech font-bold text-white mb-4">Registration Status</h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-hack-mint flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">Account Created</p>
                        <p className="text-gray-400 text-sm">{new Date(userData?.createdAt || Date.now()).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-full ${teamData ? 'bg-hack-mint' : 'bg-gray-700'} flex items-center justify-center mr-3`}>
                        {teamData ? (
                          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                          </svg>
                        ) : (
                          <span className="text-white text-sm">2</span>
                        )}
                      </div>
                      <div>
                        <p className={`${teamData ? 'text-white' : 'text-gray-400'} font-medium`}>Team Formation</p>
                        <p className="text-gray-400 text-sm">{teamData ? 'Completed' : 'Pending'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                        <span className="text-white text-sm">3</span>
                      </div>
                      <div>
                        <p className="text-gray-400 font-medium">Project Submission</p>
                        <p className="text-gray-400 text-sm">Not started</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                        <span className="text-white text-sm">4</span>
                      </div>
                      <div>
                        <p className="text-gray-400 font-medium">Hackathon Participation</p>
                        <p className="text-gray-400 text-sm">June 28-29, 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <a 
                      href="https://hackarenaa.devfolio.co/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-hack-mint text-black font-medium rounded-md hover:bg-opacity-90 transition-colors inline-block"
                    >
                      Complete Registration on Devfolio
                    </a>
                  </div>
                </div>
                
                <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800">
                  <h2 className="text-xl font-tech font-bold text-white mb-4">Announcements</h2>
                  
                  <div className="space-y-4">
                    {announcements.map((announcement, index) => (
                      <div key={index} className="border-l-2 border-hack-pink pl-4 py-1">
                        <h3 className="text-white font-medium">{announcement.title}</h3>
                        <p className="text-gray-400 text-sm mb-1">{announcement.date}</p>
                        <p className="text-gray-300">{announcement.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'team' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800"
              >
                <h2 className="text-xl font-tech font-bold text-white mb-6">Team Management</h2>
                
                {teamData ? (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-white mb-2">Team Information</h3>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <p className="text-white font-medium text-lg mb-2">{teamData.name}</p>
                        <p className="text-gray-300 mb-4">{teamData.description || "No team description available."}</p>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Team Members</h4>
                          <div className="space-y-2">
                            {teamData.members && teamData.members.map((member, index) => (
                              <div key={index} className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                                  <span className="text-white text-sm">{member.name.charAt(0)}</span>
                                </div>
                                <div>
                                  <p className="text-white">{member.name}</p>
                                  <p className="text-gray-400 text-sm">{member.role || "Member"}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <button className="px-4 py-2 bg-hack-pink text-black font-medium rounded-md hover:bg-opacity-90 transition-colors">
                          Manage Team
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="text-white font-medium text-lg mb-2">You're not part of any team yet</h3>
                      <p className="text-gray-400 mb-6">Create a new team or join an existing one to participate in HackArena.</p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-4 py-2 bg-hack-mint text-black font-medium rounded-md hover:bg-opacity-90 transition-colors">
                          Create Team
                        </button>
                        <button className="px-4 py-2 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition-colors">
                          Join Team
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
            
            {activeTab === 'submissions' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800"
              >
                <h2 className="text-xl font-tech font-bold text-white mb-6">Project Submissions</h2>
                
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-white font-medium text-lg mb-2">No submissions yet</h3>
                  <p className="text-gray-400 mb-6">Project submissions will open during the hackathon on June 28, 2025.</p>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'resources' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800"
              >
                <h2 className="text-xl font-tech font-bold text-white mb-6">Resources</h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Hackathon Guidelines</h3>
                    <p className="text-gray-300 mb-3">Review the rules, guidelines, and judging criteria for HackArena 2025.</p>
                    <a href="#" className="text-hack-mint hover:underline">Download PDF</a>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Problem Statements</h3>
                    <p className="text-gray-300 mb-3">Explore the problem statements and challenges for this year's hackathon.</p>
                    <a href="#" className="text-hack-mint hover:underline">View Challenges</a>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Workshop Materials</h3>
                    <p className="text-gray-300 mb-3">Access slides and code samples from our pre-event workshops.</p>
                    <a href="#" className="text-hack-mint hover:underline">Browse Materials</a>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">APIs & SDKs</h3>
                    <p className="text-gray-300 mb-3">Explore APIs and SDKs provided by our sponsors for the hackathon.</p>
                    <a href="#" className="text-hack-mint hover:underline">View Documentation</a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 mb-8 border border-gray-800">
              <h2 className="text-xl font-tech font-bold text-white mb-4">Upcoming Events</h2>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                    <h3 className="text-white font-medium">{event.title}</h3>
                    <p className="text-hack-pink text-sm mb-1">{event.date}</p>
                    <p className="text-gray-300 text-sm">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-tech font-bold text-white mb-4">Quick Links</h2>
              
              <div className="space-y-2">
                <a 
                  href="https://discord.gg/X6tzRjrx8z" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5 text-hack-pink mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.977-.608 1.414a17.27 17.27 0 0 0-5.487 0 12.293 12.293 0 0 0-.617-1.415.077.077 0 0 0-.079-.036 19.566 19.566 0 0 0-4.885 1.491.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.229 13.229 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                  </svg>
                  <span className="text-white">Join Discord Server</span>
                </a>
                
                <a 
                  href="https://www.instagram.com/ignite.room/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5 text-hack-pink mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span className="text-white">Follow on Instagram</span>
                </a>
                
                <a 
                  href="mailto:collabwithigniteroom@gmail.com" 
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5 text-hack-pink mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white">Contact Support</span>
                </a>
                
                <a 
                  href="/faq" 
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5 text-hack-pink mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white">FAQ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
