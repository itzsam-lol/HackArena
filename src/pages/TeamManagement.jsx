import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  serverTimestamp,
  getDocs,
  query,
  where,
  arrayUnion,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';

const TeamManagement = () => {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [teamData, setTeamData] = useState(null);
  const [formData, setFormData] = useState({
    teamName: '',
    description: '',
    inviteCode: ''
  });
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        
        // Check if user has a team
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        
        if (userDoc.exists() && userDoc.data().teamId) {
          const teamDoc = await getDoc(doc(db, "teams", userDoc.data().teamId));
          if (teamDoc.exists()) {
            setTeamData({id: teamDoc.id, ...teamDoc.data()});
          }
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        toast.error("Failed to load team data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamData();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    
    if (!formData.teamName) {
      return toast.error("Team name is required");
    }
    
    try {
      setLoading(true);
      
      // Generate a random invite code
      const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Create a new team document
      const teamRef = await addDoc(collection(db, "teams"), {
        name: formData.teamName,
        description: formData.description || "",
        inviteCode: inviteCode,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        members: [{
          uid: currentUser.uid,
          name: userProfile?.displayName || currentUser.displayName || currentUser.email,
          role: "leader",
          joinedAt: serverTimestamp()
        }]
      });
      
      // Update user document with team reference
      await updateDoc(doc(db, "users", currentUser.uid), {
        teamId: teamRef.id,
        teamRole: "leader"
      });
      
      toast.success("Team created successfully!");
      
      // Fetch the new team data
      const newTeamDoc = await getDoc(teamRef);
      setTeamData({id: teamRef.id, ...newTeamDoc.data()});
      
      // Reset form
      setFormData({
        teamName: '',
        description: '',
        inviteCode: ''
      });
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    
    if (!joinCode) {
      return toast.error("Invite code is required");
    }
    
    try {
      setLoading(true);
      
      // Find team with the invite code
      const teamsRef = collection(db, "teams");
      const querySnapshot = await getDocs(query(teamsRef, where("inviteCode", "==", joinCode)));
      
      if (querySnapshot.empty) {
        setLoading(false);
        return toast.error("Invalid invite code");
      }
      
      const teamDoc = querySnapshot.docs[0];
      const teamData = teamDoc.data();
      
      // Check if team is full (max 4 members)
      if (teamData.members && teamData.members.length >= 4) {
        setLoading(false);
        return toast.error("Team is already full");
      }
      
      // Add user to team
      await updateDoc(doc(db, "teams", teamDoc.id), {
        members: arrayUnion({
          uid: currentUser.uid,
          name: userProfile?.displayName || currentUser.displayName || currentUser.email,
          role: "member",
          joinedAt: serverTimestamp()
        })
      });
      
      // Update user document with team reference
      await updateDoc(doc(db, "users", currentUser.uid), {
        teamId: teamDoc.id,
        teamRole: "member"
      });
      
      toast.success("Successfully joined team!");
      
      // Fetch the team data
      const updatedTeamDoc = await getDoc(doc(db, "teams", teamDoc.id));
      setTeamData({id: teamDoc.id, ...updatedTeamDoc.data()});
      
      // Reset join code
      setJoinCode('');
    } catch (error) {
      console.error("Error joining team:", error);
      toast.error("Failed to join team");
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveTeam = async () => {
    if (!teamData) return;
    
    try {
      setLoading(true);
      
      // Remove user from team members
      const updatedMembers = teamData.members.filter(member => member.uid !== currentUser.uid);
      
      // If user is the last member, delete the team
      if (updatedMembers.length === 0) {
        await deleteDoc(doc(db, "teams", teamData.id));
      } else {
        // If user is the leader, assign leadership to another member
        if (teamData.members.find(member => member.uid === currentUser.uid)?.role === "leader") {
          updatedMembers[0].role = "leader";
        }
        
        await updateDoc(doc(db, "teams", teamData.id), {
          members: updatedMembers
        });
      }
      
      // Update user document to remove team reference
      await updateDoc(doc(db, "users", currentUser.uid), {
        teamId: null,
        teamRole: null
      });
      
      toast.success("Successfully left the team");
      setTeamData(null);
    } catch (error) {
      console.error("Error leaving team:", error);
      toast.error("Failed to leave team");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-hack-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-hack-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading team data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-hack-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-tech font-bold text-white mb-6">
          Team <span className="text-hack-pink">Management</span>
        </h1>
        
        {teamData ? (
          <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800">
            <div className="mb-6">
              <h2 className="text-2xl font-tech text-white mb-2">{teamData.name}</h2>
              <p className="text-gray-300 mb-4">{teamData.description || "No team description"}</p>
              
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-tech text-white mb-2">Invite Code</h3>
                <div className="flex items-center">
                  <span className="bg-gray-700 px-4 py-2 rounded-l-md text-hack-mint font-mono text-lg">
                    {teamData.inviteCode}
                  </span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(teamData.inviteCode);
                      toast.success("Invite code copied to clipboard");
                    }}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-r-md text-white transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-2">Share this code with others to invite them to your team</p>
              </div>
              
              <h3 className="text-lg font-tech text-white mb-3">Team Members</h3>
              <div className="space-y-3 mb-6">
                {teamData.members && teamData.members.map((member, index) => (
                  <div key={index} className="flex items-center bg-gray-800 p-3 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-hack-pink flex items-center justify-center mr-3">
                      <span className="text-black font-bold">{member.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-white">{member.name}</p>
                      <p className="text-gray-400 text-sm">{member.role === "leader" ? "Team Leader" : "Member"}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleLeaveTeam}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Leave Team
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-tech text-white mb-4">Create a New Team</h2>
              
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div>
                  <label htmlFor="teamName" className="block text-sm font-medium text-gray-300 mb-1">Team Name</label>
                  <input
                    id="teamName"
                    name="teamName"
                    type="text"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hack-pink text-white"
                    placeholder="Enter team name"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description (Optional)</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hack-pink text-white"
                    placeholder="Describe your team"
                    disabled={loading}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-hack-mint to-hack-pink hover:from-hack-pink hover:to-hack-mint text-black font-tech font-medium rounded-md transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? 'Creating...' : 'Create Team'}
                </button>
              </form>
            </div>
            
            <div className="bg-gray-900 bg-opacity-60 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-tech text-white mb-4">Join Existing Team</h2>
              
              <form onSubmit={handleJoinTeam} className="space-y-4">
                <div>
                  <label htmlFor="joinCode" className="block text-sm font-medium text-gray-300 mb-1">Invite Code</label>
                  <input
                    id="joinCode"
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-hack-pink text-white"
                    placeholder="Enter team invite code"
                    required
                    disabled={loading}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-tech font-medium rounded-md transition-colors disabled:opacity-70"
                >
                  {loading ? 'Joining...' : 'Join Team'}
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-white font-medium mb-2">Why join a team?</h3>
                <p className="text-gray-300 text-sm">
                  HackArena is a team-based hackathon. Joining a team allows you to collaborate with others, combine different skills, and create more impressive projects. Teams can have up to 4 members.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagement;
