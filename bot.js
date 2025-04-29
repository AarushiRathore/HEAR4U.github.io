<script>
  const responses = 
{
  hello: "Hi there! I'm Saathi. I'm here to listen and support you. 💖",

  sad: "It's okay to feel sad sometimes. Want to talk about what's bothering you?",

  stressed: "Try taking a deep breath. I'm here for you. Would you like a calming exercise?",

  alone: "You're not alone. I'm here, and I care about you. 💛",

  anxious: "Anxiety can feel overwhelming. I'm here to help you calm your mind. 🌿",

  angry: "It’s okay to feel angry. Let’s understand it together.",

  happy: "That's wonderful to hear! 😊 What made you feel so good?",

  confused: "Feeling confused is completely normal. Let's sort it out together.",

  tired: "You seem exhausted. Would you like some relaxation tips or sleep guidance? 😴",

  depressed: "I'm really sorry you're feeling this way. You're not alone, and I care about you deeply. 🫂",

  overwhelmed: "When everything feels too much, pause and breathe. I'm here with you.",

  grateful: "That's lovely! Gratitude is powerful. 🌟 What are you thankful for today?",

  insecure: "It’s okay to have doubts. You are worthy and enough, just as you are.",

  hopeless: "It may feel dark now, but even the longest night ends. You're not alone.",

  panic: "Let’s slow things down. Focus on your breath. I’m here with you.",

  motivated: "That's the spirit! 🌟 Keep going—you're doing great!",

  bored: "Want to try a small activity or mindfulness exercise together?",

  rejected: "Rejection hurts, but it doesn’t define your worth. I'm here for you.",

  guilty: "Guilt is a heavy feeling. Let’s talk through it and lighten your heart.",

  default: "I'm here to listen. Tell me more about how you're feeling."
}

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
</script>
