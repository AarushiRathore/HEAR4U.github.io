// Initialize Firebase (configuration should be in firebase-config.js)
// This assumes you've loaded Firebase via the CDN in your HTML

document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Initialize Firebase (compatibility version)
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
    const app = firebase.initializeApp(firebaseConfig);
    const analytics = firebase.analytics();
    const db = firebase.firestore();

    // Form submission handler
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form values
        const name = contactForm['name'].value;
        const email = contactForm['email'].value;
        const message = contactForm['message'].value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill all fields');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Add document to Firestore
            await db.collection('contacts').add({
                name: name,
                email: email,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Log analytics event
            analytics.logEvent('contact_form_submitted');

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    }
});
