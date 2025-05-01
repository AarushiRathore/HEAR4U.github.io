// firebase-config.js
// Configuration for Firebase v9 compat (CDN version)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBihkMtv01iKT1odnfH_6ilImu_-MijICo",
  authDomain: "contactus-beff5.firebaseapp.com",
  projectId: "contactus-beff5",
  storageBucket: "contactus-beff5.firebasestorage.app",
  messagingSenderId: "977845064641",
  appId: "1:977845064641:web:c0e0a6103cd382ac4ad540",
  measurementId: "G-LBE45KWC90"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

 document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase services
    const app = firebase.initializeApp(firebaseConfig);
    const analytics = firebase.analytics(app);
    const db = firebase.firestore();
    const auth = firebase.auth(app);
    const storage = firebase.storage(app);
    
    // Get form element
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return; // Exit if form doesn't exist

    // Single event listener for form submission
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Get form values
        const name = contactForm['name'].value;
        const email = contactForm['email'].value;
        const message = contactForm['message'].value;
        
        // Validation
        if (!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }

        // UI Loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Save to Firestore
            await db.collection('contactuspage').add({
                name: name,
                email: email,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Analytics
            analytics.logEvent('contact_form_submitted');
            
            // Success action
            alert('Message sent successfully!');
            contactForm.reset();
            
            // Redirect after 1 second (optional)
            setTimeout(() => {
                window.location.href = 'explore-mental-health.html';
            }, 1000);
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        } finally {
            // Reset UI
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
});
