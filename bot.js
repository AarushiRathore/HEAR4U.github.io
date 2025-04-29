
  const responses = 
{
  hello: "Hi there! I'm Saathi. I'm here to listen and support you. 💖",
hi: "Hello! I'm Saathi, your listening ear. How are you feeling right now? 😊",
hey: "Hey! I'm Saathi. What's on your mind?",
sad: "It sounds like you're feeling sad. It's okay to feel that way. Would you like to share more about what's making you feel down? 🫂",
stressed: "Feeling stressed can be tough. Remember to breathe. Take a slow, deep breath in... and out. I'm here for you. Would you like a simple calming exercise? 🧘‍♀️",
anxious: "Anxiety can feel overwhelming. Focus on your breathing for a moment. Can you tell me what's making you feel anxious? Talking about it might help. 🤝",
alone: "Feeling alone can be really difficult. Please know that you're not truly alone. I'm here to listen and chat with you. You matter. 💛",
lonely: "Loneliness is a hard feeling. Thank you for reaching out. I'm here to keep you company. What's been going on? 🤗",
depressed:"Hearing that you might be feeling depressed concerns me. Remember, it's okay to seek help. Have you considered talking to a friend, family member, or a mental health professional? I'm here to listen without judgment. 💬",
ocd: "OCD involves obsessions (intrusive thoughts) and compulsions (repetitive actions). It's more than just liking things neat. Treatment like ERP therapy and medication can help manage it. Is there anything specific about OCD you'd like to discuss?",
"obsessive compulsive disorder": "Obsessive Compulsive Disorder (OCD) can be challenging. Key features are unwanted obsessive thoughts and compulsive behaviors done to reduce anxiety. Effective treatments are available, like therapy (ERP) and sometimes medication. How can I help you regarding OCD?",
"what is ocd": "OCD (Obsessive Compulsive Disorder) is an anxiety disorder characterized by intrusive, unwanted thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) that a person feels driven to perform. It often causes significant distress. Want to know more about symptoms or treatment?",
"ocd treatment": "The main treatments for OCD are Exposure and Response Prevention (ERP) therapy, a type of CBT, and medications like SSRIs. ERP involves gradually facing feared situations without doing compulsions. Would you like links to resources like the IOCDF?",
erp: "ERP (Exposure and Response Prevention) is a type of Cognitive Behavioral Therapy (CBT) considered the gold standard for OCD. It involves facing triggers (exposure) and resisting the urge to perform compulsions (response prevention). It helps break the OCD cycle.",
help: "I'm here to offer support and listen. If you're in crisis or need immediate professional help, please reach out to a helpline or mental health professional. For general chat and support, tell me what's going on. ❤️",
"thank you/thankyou": "You're welcome! I'm glad I could be here for you. Remember, I'm always here if you need to talk. 😊",
thanks: "Anytime! Taking care of your mental health is important. Reach out whenever you need to. 👍",
bye: "Take care! Remember to be kind to yourself. I'll be here if you need me again. 👋",
default: "I understand. It's okay to feel that way. Tell me more about it if you're comfortable. I'm here to listen. 🤔"
}


  function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
  }

  function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (message === '') return;

    appendMessage('user', message);
    input.value = '';

    const lowerMessage = message.toLowerCase();
    let response = responses.default;
    for (const key in responses) {
      if (lowerMessage.includes(key)) {
        response = responses[key];
        break;
      }
    }
    setTimeout(() => appendMessage('bot', response), 600);
  }

  function appendMessage(sender, text) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + sender;
    messageDiv.innerText = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

