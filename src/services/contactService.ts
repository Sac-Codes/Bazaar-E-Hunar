import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Validates the contact form fields before submission.
 * Returns an error message string if validation fails, or null if valid.
 */
function validateContactForm(data: ContactMessage): string | null {
  if (!data.name.trim()) {
    return 'Name is required.';
  }
  if (!data.email.trim()) {
    return 'Email is required.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return 'Please enter a valid email address.';
  }
  if (!data.subject.trim()) {
    return 'Subject is required.';
  }
  if (!data.message.trim()) {
    return 'Message is required.';
  }
  if (data.message.trim().length < 10) {
    return 'Message must be at least 10 characters long.';
  }
  return null;
}

/**
 * Submits a contact message to Firestore.
 * @returns A promise that resolves with the document ID on success.
 * @throws An error with a user-friendly message on failure.
 */
export async function submitContactMessage(data: ContactMessage): Promise<string> {
  // Validate input first
  const validationError = validateContactForm(data);
  if (validationError) {
    throw new Error(validationError);
  }

  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      timestamp: serverTimestamp(),
      status: 'new',
    });
    return docRef.id;
  } catch (error: unknown) {
    // Handle Firebase-specific errors gracefully
    if (error instanceof Error) {
      const firebaseCode = (error as unknown as Record<string, unknown>).code as string | undefined;

      // Map Firebase error codes to user-friendly messages
      switch (firebaseCode) {
        case 'permission-denied':
          throw new Error('Access denied. Please check your permissions and try again.');
        case 'unavailable':
          throw new Error('Service is temporarily unavailable. Please try again later.');
        case 'not-found':
          throw new Error('The specified database was not found. Please contact support.');
        default:
          // Check for network-related errors
          if (error.message?.toLowerCase().includes('network')) {
            throw new Error('Network error. Please check your internet connection and try again.');
          }
          throw new Error('An unexpected error occurred. Please try again later.');
      }
    }
    throw new Error('An unexpected error occurred. Please try again later.');
  }
}

