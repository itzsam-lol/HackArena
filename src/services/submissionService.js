// src/services/submissionService.js
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
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import { db, storage } from '../firebase/config';
  
  // Create or update a project submission
  export const submitProject = async (projectData, teamId, files = {}) => {
    try {
      // Check if submission already exists
      const submissionRef = doc(db, "submissions", teamId);
      const submissionDoc = await getDoc(submissionRef);
      
      // Upload files if provided
      const fileUrls = {};
      
      if (files.projectImage) {
        const imageRef = ref(storage, `submissions/${teamId}/project-image`);
        await uploadBytes(imageRef, files.projectImage);
        fileUrls.projectImageUrl = await getDownloadURL(imageRef);
      }
      
      if (files.presentationFile) {
        const presentationRef = ref(storage, `submissions/${teamId}/presentation`);
        await uploadBytes(presentationRef, files.presentationFile);
        fileUrls.presentationUrl = await getDownloadURL(presentationRef);
      }
      
      const submissionData = {
        ...projectData,
        ...fileUrls,
        teamId,
        updatedAt: serverTimestamp()
      };
      
      if (submissionDoc.exists()) {
        // Update existing submission
        await updateDoc(submissionRef, submissionData);
      } else {
        // Create new submission
        submissionData.createdAt = serverTimestamp();
        await setDoc(submissionRef, submissionData);
      }
      
      return true;
    } catch (error) {
      console.error("Error submitting project:", error);
      throw error;
    }
  };
  
  // Get submission by team ID
  export const getSubmissionByTeamId = async (teamId) => {
    try {
      const submissionDoc = await getDoc(doc(db, "submissions", teamId));
      if (submissionDoc.exists()) {
        return { id: submissionDoc.id, ...submissionDoc.data() };
      }
      return null;
    } catch (error) {
      console.error("Error getting submission:", error);
      throw error;
    }
  };
  
  // Get all submissions (for admin)
  export const getAllSubmissions = async () => {
    try {
      const submissionsRef = collection(db, "submissions");
      const q = query(submissionsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting all submissions:", error);
      throw error;
    }
  };
  
  // Delete a submission
  export const deleteSubmission = async (teamId) => {
    try {
      await deleteDoc(doc(db, "submissions", teamId));
      return true;
    } catch (error) {
      console.error("Error deleting submission:", error);
      throw error;
    }
  };
  