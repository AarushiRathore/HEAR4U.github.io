const responses = {
  hello: {
    text: "Hi there! I'm Saathi. I'm here to listen and support you. 💖",
    followUp: "How are you feeling today?"
  },
  hi: {
    text: "Hello! I'm Saathi, your listening ear. How are you feeling right now? 😊",
    followUp: "Would you like to share what's on your mind?"
  },
  hey: {
    text: "Hey! I'm Saathi. What's on your mind?",
    followUp: "Is there something specific you'd like to talk about?"
  },
  sad: {
    text: "It sounds like you're feeling sad. It's okay to feel that way. 🫂",
    followUp: "Would you like to share more about what's making you feel down?"
  },
  stressed: {
    text: "Feeling stressed can be tough. Remember to breathe. Take a slow, deep breath in... and out. 🧘‍♀️",
    followUp: "Would you like a simple calming exercise?"
  },
  anxious: {
    text: "Anxiety can feel overwhelming. Focus on your breathing for a moment. 🤝",
    followUp: "Can you tell me what's making you feel anxious?"
  },
  alone: {
    text: "Feeling alone can be really difficult. Please know that you're not truly alone. 💛",
    followUp: "Would you like to talk about what's going on?"
  },
  lonely: {
    text: "Loneliness is a hard feeling. Thank you for reaching out. 🤗",
    followUp: "What's been going on in your life recently?"
  },
  depressed: {
    text: "Hearing that you might be feeling depressed concerns me. Remember, it's okay to seek help. 💬",
    followUp: "Have you considered talking to someone about how you're feeling?"
  },
  ocd: {
    text: "OCD involves obsessions (intrusive thoughts) and compulsions (repetitive actions).",
    followUp: "Would you like to know about treatment options?"
  },
  "obsessive compulsive disorder": {
    text: "Obsessive Compulsive Disorder (OCD) can be challenging.",
    followUp: "Would you like information about therapy options?"
  },
  "what is ocd": {
    text: "OCD is characterized by intrusive thoughts and repetitive behaviors.",
    followUp: "Would you like to know more about symptoms or treatment?"
  },
  "ocd treatment": {
    text: "The main treatments are ERP therapy and medications like SSRIs.",
    followUp: "Would you like links to resources?"
  },
  erp: {
    text: "ERP is the gold standard for OCD treatment.",
    followUp: "Would you like me to explain how it works?"
  },
  help: {
    text: "I'm here to offer support. ❤️",
    followUp: "Would you like resources for professional help?"
  },
  "thank you": {
    text: "You're welcome! I'm always here if you need to talk. 😊",
    followUp: "Is there anything else I can help with?"
  },
  thanks: {
    text: "Anytime! Reach out whenever you need. 👍",
    followUp: "Do you want to talk about something else?"
  },
  bye: {
    text: "Take care! Be kind to yourself. 👋",
    followUp: null
  },
  default: {
    text: "I understand. 🤔",
    followUp: "Would you like to share more about how you're feeling?"
  }
};

// Enhanced conversation context tracking
let conversationContext = {
  lastTopic: null,
  lastResponse: null,
  awaitingConfirmation: false,
  followUpQuestion: null
};

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

  setTimeout(() => generateResponse(message.toLowerCase()), 600);
}

function generateResponse(userMessage) {
  let responseText = responses.default.text;
  let followUp = responses.default.followUp;
  let foundMatch = false;

  // Handle affirmative responses ("yes", "yeah", "sure", etc.)
  if (/^(yes|yeah|yep|sure|ok|yup)\b/i.test(userMessage) && conversationContext.followUpQuestion) {
    responseText = getAffirmativeResponse(conversationContext.lastTopic);
    followUp = getFollowUpQuestion(conversationContext.lastTopic, true);
    foundMatch = true;
  }
  // Handle negative responses ("no", "nope", etc.)
  else if (/^(no|nope|nah|not really)\b/i.test(userMessage) && conversationContext.followUpQuestion) {
    responseText = "I understand. " + getAlternativeResponse(conversationContext.lastTopic);
    followUp = "Is there something else you'd like to talk about?";
    foundMatch = true;
  }
  // Handle normal responses
  else {
    for (const key in responses) {
      if (userMessage.includes(key)) {
        responseText = responses[key].text;
        followUp = responses[key].followUp;
        conversationContext.lastTopic = key;
        foundMatch = true;
        break;
      }
    }
  }

  // Update conversation context
  if (foundMatch) {
    conversationContext.lastResponse = responseText;
    conversationContext.followUpQuestion = followUp;
    conversationContext.awaitingConfirmation = followUp !== null && followUp.startsWith("Would you");
  }

  // Construct final response
  let fullResponse = responseText;
  if (followUp && !/^(yes|no)/i.test(userMessage)) {
    fullResponse += "\n\n" + followUp;
  }

  appendMessage('bot', fullResponse);
}

function getAffirmativeResponse(topic) {
  const affirmativeResponses = {
    sad: "Thank you for being willing to share. I'm listening...",
    stressed: "Let's try this simple exercise: Close your eyes and breathe in for 4 counts, hold for 4, exhale for 6. Repeat 3 times.",
    anxious: "Talking about anxiety can help reduce its power. What thoughts are making you anxious?",
    alone: "I'm here to listen. Sometimes just saying things out loud can help.",
    depressed: "It's brave to consider reaching out. Would you like help finding professional resources?",
    ocd: "The most effective treatment is ERP (Exposure and Response Prevention) therapy.",
    "obsessive compulsive disorder": "Cognitive Behavioral Therapy (CBT) with ERP is considered the gold standard.",
    "what is ocd": "Common symptoms include intrusive thoughts and repetitive behaviors that disrupt daily life.",
    "ocd treatment": "Here are helpful resources:\n- IOCDF.org\n- NIMH.nih.gov\n- ADAA.org",
    erp: "ERP works by gradually exposing you to anxiety triggers while resisting compulsions.",
    help: "Here are some immediate resources:\n- Crisis Text Line: Text HOME to 741741\n- SAMHSA Helpline: 1-800-662-HELP",
    default: "I'm glad to help. What would you like to know more about?"
  };
  return affirmativeResponses[topic] || affirmativeResponses.default;
}

function getFollowUpQuestion(topic, isAffirmative) {
  const followUps = {
    sad: isAffirmative ? "What emotions are you feeling most strongly?" : "Would you like some self-care suggestions?",
    stressed: isAffirmative ? "Did that breathing exercise help at all?" : "Maybe try some gentle stretching instead?",
    anxious: isAffirmative ? "How intense would you rate your anxiety right now?" : "Would you prefer some distraction techniques?",
    alone: isAffirmative ? "What would make you feel more connected right now?" : "Would you like some suggestions for meeting new people?",
    depressed: isAffirmative ? "Have you noticed any changes in your sleep or appetite?" : "Would you like some general wellness tips?",
    ocd: isAffirmative ? "Would you like me to explain how ERP therapy works?" : "Would you prefer information about medication options?",
    "ocd treatment": isAffirmative ? "Would you like help finding a therapist in your area?" : "Would you prefer general coping strategies?",
    default: isAffirmative ? "What else can I help with?" : "Is there another topic you'd like to discuss?"
  };
  return followUps[topic] || followUps.default;
}

function getAlternativeResponse(topic) {
  const alternatives = {
    sad: "Sometimes writing in a journal can help process emotions.",
    stressed: "Maybe try some gentle stretching or a short walk.",
    anxious: "Some people find grounding techniques helpful. Would you like to try one?",
    depressed: "Even small steps like getting sunlight can sometimes help.",
    ocd: "Many people find mindfulness helpful alongside treatment.",
    default: "I'm here whenever you want to talk."
  };
  return alternatives[topic] || alternatives.default;
}

function appendMessage(sender, text) {
  const chatBody = document.getElementById('chatBody');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + sender;
  
  // Handle line breaks in the text
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    if (index > 0) messageDiv.appendChild(document.createElement('br'));
    messageDiv.appendChild(document.createTextNode(line));
  });
  
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

