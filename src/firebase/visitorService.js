import { 
  doc, 
  getDoc, 
  setDoc, 
  increment,
  updateDoc,
  onSnapshot 
} from 'firebase/firestore';
import { db } from './config';

const VISITOR_COUNT_DOC_ID = 'visitorCount';
const VISITOR_COUNT_COLLECTION = 'analytics';

/**
 * Get the current visitor count from Firestore
 * @returns {Promise<number>} The current visitor count
 */
export const getVisitorCount = async () => {
  try {
    const docRef = doc(db, VISITOR_COUNT_COLLECTION, VISITOR_COUNT_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().count || 0;
    } else {
      // If document doesn't exist, create it with base count
      const baseCount = 428;
      await setDoc(docRef, { count: baseCount });
      return baseCount;
    }
  } catch (error) {
    console.error('Error getting visitor count:', error);
    
    // If it's a permission error, provide helpful message
    if (error.code === 'permission-denied') {
      console.warn('Firestore permission denied. Please update your Firestore security rules. See FIRESTORE_RULES_FIX.md for instructions.');
    }
    
    return 428; // Fallback to base count
  }
};

/**
 * Increment the visitor count in Firestore
 * @returns {Promise<number>} The new visitor count after increment
 */
export const incrementVisitorCount = async () => {
  try {
    const docRef = doc(db, VISITOR_COUNT_COLLECTION, VISITOR_COUNT_DOC_ID);
    
    // First, check if document exists
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Document exists, increment the count
      await updateDoc(docRef, {
        count: increment(1),
        lastUpdated: new Date()
      });
      
      // Get the updated count
      const updatedDoc = await getDoc(docRef);
      return updatedDoc.data().count;
    } else {
      // Document doesn't exist, create it with base count + 1
      const baseCount = 428;
      const newCount = baseCount + 1;
      await setDoc(docRef, { 
        count: newCount,
        lastUpdated: new Date()
      });
      return newCount;
    }
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    
    // If it's a permission error, provide helpful message
    if (error.code === 'permission-denied') {
      console.warn('Firestore permission denied. Please update your Firestore security rules. See FIRESTORE_RULES_FIX.md for instructions.');
    }
    
    return 428; // Fallback to base count
  }
};

/**
 * Subscribe to real-time visitor count updates
 * @param {function} callback - Function to call when count updates
 * @returns {function} Unsubscribe function
 */
export const subscribeToVisitorCount = (callback) => {
  const docRef = doc(db, VISITOR_COUNT_COLLECTION, VISITOR_COUNT_DOC_ID);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data().count || 0);
    } else {
      callback(428); // Fallback to base count
    }
  }, (error) => {
    console.error('Error subscribing to visitor count:', error);
    
    // If it's a permission error, provide helpful message
    if (error.code === 'permission-denied') {
      console.warn('Firestore permission denied. Please update your Firestore security rules. See FIRESTORE_RULES_FIX.md for instructions.');
    }
    
    callback(428); // Fallback to base count
  });
};
