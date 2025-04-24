<script>
    const responses = {
        hello: "Hi there! I'm Saathi. I'm here to listen and support you. 💖",
        hi: "Hello! I'm Saathi, your listening ear. How are you feeling right now? 😊",
        hey: "Hey! I'm Saathi. What's on your mind?",
        sad: "It sounds like you're feeling sad. It's okay to feel that way. Would you like to share more about what's making you feel down? 🫂",
        stressed: "Feeling stressed can be tough. Remember to breathe. Take a slow, deep breath in... and out. I'm here for you. Would you like a simple calming exercise? 🧘‍♀️",
        anxious: "Anxiety can feel overwhelming. Focus on your breathing for a moment. Can you tell me what's making you feel anxious? Talking about it might help. 🤝",
        alone: "Feeling alone can be really difficult. Please know that you're not truly alone. I'm here to listen and chat with you. You matter. 💛",
        lonely: "Loneliness is a hard feeling. Thank you for reaching out. I'm here to keep you company. What's been going on? 🤗",
        depressed:"Hearing that you might be feeling depressed concerns me. Remember, it's okay to seek help. Have you considered talking to a friend, family member, or a mental health professional? I'm here to listen without judgment. 💬",
        help: "I'm here to offer support and listen. If you're in crisis or need immediate professional help, please reach out to a helpline or mental health professional. For general chat and support, tell me what's going on. ❤️",
        "thank you": "You're welcome! I'm glad I could be here for you. Remember, I'm always here if you need to talk. 😊",
        thanks: "Anytime! Taking care of your mental health is important. Reach out whenever you need to. 👍",
        bye: "Take care! Remember to be kind to yourself. I'll be here if you need me again. 👋",
        default: "I understand. It's okay to feel that way. Tell me more about it if you're comfortable. I'm here to listen. 🤔"
    };

    function toggleChatbot() {
        const chatbot = document.getElementById('chatbot');
        const chatToggle = document.getElementById('chatToggle');
        const isOpening = chatbot.style.display === 'none' || chatbot.style.display === '';

        if (isOpening) {
             chatbot.style.display = 'flex';
             // Optional: Animate the opening
             setTimeout(() => { chatbot.style.opacity = 1; chatbot.style.transform = 'scale(1)'; }, 10);
             chatToggle.innerHTML = '<i class="fas fa-times"></i>'; // Change to close icon
        } else {
            // Optional: Animate the closing
            chatbot.style.opacity = 0;
            chatbot.style.transform = 'scale(0.9)';
            setTimeout(() => { chatbot.style.display = 'none'; }, 300); // Match timeout to CSS transition if added
            chatToggle.innerHTML = '<i class="fas fa-comment-dots"></i>'; // Change back to chat icon
        }
    }


     // Add initial bot message when chat opens (can be moved inside toggleChatbot if preferred)
     // window.onload = () => {
     //    appendMessage('bot', "Hi there! I'm Saathi. How can I help you today?");
     // };


    function sendMessage() {
        const input = document.getElementById('userInput');
        const message = input.value.trim();
        if (message === '') return;

        appendMessage('user', message);
        input.value = '';

        // Basic keyword matching
        const lowerMessage = message.toLowerCase();
        let response = responses.default;
        let foundResponse = false;

        // Prioritize more specific phrases if needed, then single keywords
        const sortedKeys = Object.keys(responses).sort((a, b) => b.length - a.length); // Longer keys first

        for (const key of sortedKeys) {
            // Use word boundaries for keywords like 'hi', 'sad' to avoid partial matches in words like 'history' or 'sadness'
             const regex = new RegExp(`\\b${key}\\b`, 'i'); // 'i' for case-insensitive
             if (regex.test(lowerMessage)) {
                response = responses[key];
                foundResponse = true;
                break;
            }
        }
        // If no keyword match, check for simple greetings
        if (!foundResponse) {
             if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
                 response = responses.hello; // Or a specific greeting response
             } else if (lowerMessage.includes('thank')) {
                 response = responses['thank you'];
             } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
                 response = responses.bye;
             }
        }


        // Simulate bot thinking time
        setTimeout(() => appendMessage('bot', response), 600 + Math.random() * 400); // Add slight delay variation
    }

    function appendMessage(sender, text) {
        const chatBody = document.getElementById('chatBody');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + sender;
        // Sanitize text slightly (replace < and > to prevent basic HTML injection)
        messageDiv.textContent = text; // Use textContent for better security than innerText/innerHTML
        chatBody.appendChild(messageDiv);
        // Scroll to the bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleKeyPress(event) {
      // Check if the key pressed was Enter
      if (event.key === "Enter") {
        sendMessage();
      }
    }

    // Optional: Add initial styles for chatbot animation
    const chatbotElement = document.getElementById('chatbot');
    chatbotElement.style.opacity = 0;
    chatbotElement.style.transform = 'scale(0.9)';
    chatbotElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';


</script>
