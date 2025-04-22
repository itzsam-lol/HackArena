// src/services/teamService.js
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    updateDoc, 
    arrayUnion, 
    arrayRemove, 
    serverTimestamp,
    deleteDoc
  } from 'firebase/firestore';
  import { db } from '../firebase/config';
  
  // Create a new team
  export const createTeam = async (teamData, userId) => {
    try {
      // Create a new team document with auto-generated ID
      const teamRef = doc(collection(db, "teams"));
      
      const newTeam = {
        ...teamData,
        id: teamRef.id,
        createdBy: userId,
        members: [{ 
          uid: userId, 
          role: 'leader',
          joinedAt: serverTimestamp()
        }],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(teamRef, newTeam);
      
      // Update the user's team reference
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        teamId: teamRef.id,
        teamRole: 'leader'
      });
      
      return teamRef.id;
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  };
  
  // Get team by ID
  export const getTeamById = async (teamId) => {
    try {
      const teamDoc = await getDoc(doc(db, "teams", teamId));
      if (teamDoc.exists()) {
        return { id: teamDoc.id, ...teamDoc.data() };
      }
      return null;
    } catch (error) {
      console.error("Error getting team:", error);
      throw error;
    }
  };
  
  // Get team by user ID
  export const getTeamByUserId = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists() && userDoc.data().teamId) {
        return await getTeamById(userDoc.data().teamId);
      }
      return null;
    } catch (error) {
      console.error("Error getting team by user ID:", error);
      throw error;
    }
  };
  
  // Join a team with invite code
  export const joinTeamWithCode = async (inviteCode, userId) => {
    try {
      // Find the team with the invite code
      const teamsRef = collection(db, "teams");
      const q = query(teamsRef, where("inviteCode", "==", inviteCode));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error("Invalid invite code");
      }
      
      const teamDoc = querySnapshot.docs[0];
      const teamData = teamDoc.data();
      
      // Check if team is full (max 4 members)
      if (teamData.members && teamData.members.length >= 4) {
        throw new Error("Team is already full");
      }
      
      // Check if user is already in a team
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists() && userDoc.data().teamId) {
        throw new Error("You are already in a team");
      }
      
      // Add user to team
      await updateDoc(doc(db, "teams", teamDoc.id), {
        members: arrayUnion({
          uid: userId,
          role: 'member',
          joinedAt: serverTimestamp()
        }),
        updatedAt: serverTimestamp()
      });
      
      // Update user's team reference
      await updateDoc(doc(db, "users", userId), {
        teamId: teamDoc.id,
        teamRole: 'member'
      });
      
      return teamDoc.id;
    } catch (error) {
      console.error("Error joining team:", error);
      throw error;
    }
  };
  
  // Leave a team
  export const leaveTeam = async (teamId, userId) => {
    try {
      const teamDoc = await getDoc(doc(db, "teams", teamId));
      
      if (!teamDoc.exists()) {
        throw new Error("Team not found");
      }
      
      const teamData = teamDoc.data();
      
      // Find the member to remove
      const memberToRemove = teamData.members.find(member => member.uid === userId);
      
      if (!memberToRemove) {
        throw new Error("You are not a member of this team");
      }
      
      // If user is the team leader and there are other members, assign a new leader
      if (memberToRemove.role === 'leader' && teamData.members.length > 1) {
        const newLeader = teamData.members.find(member => member.uid !== userId);
        
        // Update the new leader's role
        const updatedMembers = teamData.members.map(member => {
          if (member.uid === newLeader.uid) {
            return { ...member, role: 'leader' };
          }
          return member;
        });
        
        // Remove the current user
        const filteredMembers = updatedMembers.filter(member => member.uid !== userId);
        
        await updateDoc(doc(db, "teams", teamId), {
          members: filteredMembers,
          updatedAt: serverTimestamp()
        });
        
        // Update the new leader's user document
        await updateDoc(doc(db, "users", newLeader.uid), {
          teamRole: 'leader'
        });
      } 
      // If user is the only member or the leader with no other members, delete the team
      else if (teamData.members.length === 1 || (memberToRemove.role === 'leader' && teamData.members.length === 1)) {
        await deleteDoc(doc(db, "teams", teamId));
      } 
      // Otherwise just remove the user from the team
      else {
        await updateDoc(doc(db, "teams", teamId), {
          members: arrayRemove(memberToRemove),
          updatedAt: serverTimestamp()
        });
      }
      
      // Update the user's document
      await updateDoc(doc(db, "users", userId), {
        teamId: null,
        teamRole: null
      });
      
      return true;
    } catch (error) {
      console.error("Error leaving team:", error);
      throw error;
    }
  };
  