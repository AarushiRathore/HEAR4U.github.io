// app.js - Modified to work with your specific Firebase setup

document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Initialize Firebase services
    // Using compat version since you're loading it via CDN
    const db = firebase.firestore();
    const analytics = firebase.analytics();

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
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Add document to Firestore
            await db.collection('contactuspage').add({
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
            submitBtn.textContent = originalBtnText;
        }
    }
});
