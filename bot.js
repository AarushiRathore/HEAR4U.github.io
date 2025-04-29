<script>
  const responses = {
    hello: "Hi there! I'm Saathi. I'm here to listen and support you. 💖",
    sad: "It's okay to feel sad sometimes. Want to talk about what's bothering you?",
    stressed: "Try taking a deep breath. I'm here for you. Would you like a calming exercise?",
    alone: "You're not alone. I'm here, and I care about you. 💛",
    default: "I'm here to listen. Tell me more about how you're feeling."
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
