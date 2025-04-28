// Create and append the Dialogflow bootstrap script
const dialogflowScript = document.createElement('script');
dialogflowScript.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
document.body.appendChild(dialogflowScript);

// Once the script is loaded, add the df-messenger element
dialogflowScript.onload = function() {
  const dfMessenger = document.createElement('df-messenger');
  dfMessenger.setAttribute('intent', 'WELCOME');
  dfMessenger.setAttribute('chat-title', 'Neuronest');
  dfMessenger.setAttribute('agent-id', '97505251-f7bb-4dc2-b7f0-ea81ace40fcf');
  dfMessenger.setAttribute('language-code', 'en');
  document.body.appendChild(dfMessenger);
};
