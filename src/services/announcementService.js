// src/services/announcementService.js
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    updateDoc, 
    serverTimestamp,
    deleteDoc,
    orderBy,
    limit
  } from 'firebase/firestore';
  import { db } from '../firebase/config';
  
  // Create a new announcement (admin only)
  export const createAnnouncement = async (announcementData, adminId) => {
    try {
      const announcementRef = doc(collection(db, "announcements"));
      
      const newAnnouncement = {
        ...announcementData,
        id: announcementRef.id,
        createdBy: adminId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(announcementRef, newAnnouncement);
      return announcementRef.id;
    } catch (error) {
      console.error("Error creating announcement:", error);
      throw error;
    }
  };
  
  // Get all announcements
  export const getAnnouncements = async (limit = 10) => {
    try {
      const announcementsRef = collection(db, "announcements");
      const q = query(
        announcementsRef, 
        orderBy("createdAt", "desc"), 
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting announcements:", error);
      throw error;
    }
  };
  
  // Update an announcement (admin only)
  export const updateAnnouncement = async (announcementId, updateData) => {
    try {
      const announcementRef = doc(db, "announcements", announcementId);
      
      await updateDoc(announcementRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error("Error updating announcement:", error);
      throw error;
    }
  };
  
  // Delete an announcement (admin only)
  export const deleteAnnouncement = async (announcementId) => {
    try {
      await deleteDoc(doc(db, "announcements", announcementId));
      return true;
    } catch (error) {
      console.error("Error deleting announcement:", error);
      throw error;
    }
  };
  