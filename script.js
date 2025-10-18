    const startChatButton = document.getElementById('start-chat-button');
    const startChatButtonHeader = document.getElementById('start-chat-button-header');
    const closeChatButton = document.getElementById('close-chat-button');
    const chatInterface = document.getElementById('chat-interface');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const loadingIndicator = document.getElementById('loading-indicator');

    // Initially disable send button
    sendButton.disabled = true;
    sendButton.classList.add('opacity-50', 'cursor-not-allowed');

    userInput.addEventListener('input', () => {
        if (userInput.value.trim() === '') {
            sendButton.disabled = true;
            sendButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            sendButton.disabled = false;
            sendButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });

    startChatButton.addEventListener('click', (e) => {
        e.preventDefault();
        chatInterface.classList.remove('hidden');
    });

    startChatButtonHeader.addEventListener('click', (e) => {
        e.preventDefault();
        chatInterface.classList.remove('hidden');
    });

    closeChatButton.addEventListener('click', () => {
        chatInterface.classList.add('hidden');
    });

    sendButton.addEventListener('click', () => {
        console.log('Send button clicked!'); // Debug log for click event
        sendMessage();
    });
    console.log('Send button event listener attached.'); // Debug log for listener attachment

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed in user input!'); // Debug log for keypress event
            sendMessage();
        }
    });
    console.log('User input keypress event listener attached.'); // Debug log for listener attachment

    async function sendMessage() {
        console.log('sendMessage function called.'); // Debug log
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage('user', message);
        userInput.value = '';
        sendButton.disabled = true; // Disable after sending
        sendButton.classList.add('opacity-50', 'cursor-not-allowed');

        if (message.toLowerCase() === '/info' || message.toLowerCase() === '/help') {
            appendMessage('bot', displayBotInfo());
            return;
        }

        loadingIndicator.classList.remove('hidden'); // Show loading indicator
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom to show indicator

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            appendMessage('bot', data.response);
            // Append question suggestions after every bot response
            appendMessage('bot', displayBotInfo(), true); // Pass a flag to style it differently if needed
        } catch (error) {
            console.error('Error sending message:', error);
            appendMessage('bot', 'Sorry, something went wrong. Please try again later.');
        } finally {
            loadingIndicator.classList.add('hidden'); // Hide loading indicator
        }
    }

    function displayBotInfo() {
        return `
**Tips for Dog Chat App:**
*   Dog-Centric Content: Ensure all responses are relevant to dogs, their care, behavior, and training.
*   Concise & Actionable Advice: Provide short, easy-to-understand tips that users can immediately apply.
*   Engaging Tone: Use a friendly and encouraging tone suitable for pet owners.
*   Quick Responses: Prioritize speed in generating answers to user queries.
*   Breed-Specific Information: Offer tailored advice where appropriate for different dog breeds.

**Try asking DoggyBot these questions:**
*   "How do I teach my dog to sit?"
*   "What's a good diet for a senior dog?"
*   "Tell me about the history of Beagles."
*   "My dog is anxious, what can I do?"
*   "What are the signs of a happy dog?"
*   "How often should I walk my puppy?"
*   "What are common dog allergies?"
*   "Can dogs eat chocolate?"

**OpenAI Chatbot Specification:**
This chatbot is an AI assistant, leveraging OpenAI's advanced language models. It is specifically configured to provide information, advice, and engaging content exclusively about dogs, including training, health, behavior, and general facts.
`;
    }

    function formatBotResponse(text) {
        // For now, just return the text. This can be extended later for markdown parsing.
        return text;
    }

    function appendMessage(sender, text, isSuggestion = false) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('flex', 'items-end', 'mb-4', 'gap-2');

        const avatar = document.createElement('img');
        avatar.classList.add('w-8', 'h-8', 'rounded-full', 'object-cover');

        const messageBubble = document.createElement('div');
        messageBubble.classList.add('p-3', 'rounded-xl', 'max-w-[70%]', 'shadow-sm', 'break-words');

        if (sender === 'user') {
            messageContainer.classList.add('justify-end');
            avatar.src = 'https://api.dicebear.com/7.x/initials/svg?seed=User'; // Generic user avatar
            messageBubble.classList.add('bg-primary', 'text-white', 'rounded-br-none');
            messageBubble.textContent = text;
            messageContainer.appendChild(messageBubble);
            messageContainer.appendChild(avatar);
        } else {
            messageContainer.classList.add('justify-start');
            avatar.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_WGTcbtnyytV-e-mWy-zMRAs27OBmrV6Vi8BrAx5aLXNAhUf_Uts3Q47gQz5BLZzSCagu65NDjjtOAy83zU5hgkV8IfxX_1JVreqdF0IWXXnf7U9OMAw522BCCCACvMN5Pdi7-Kbj8xX5Sr-t9PjX0rsipq73ALpUGkM1X6aykp_sowRKSrw5nLaWvvNG7uFG_eDCQDsWQ0T3ZCndNJZ9ZX6LSwQT488kzfvrq4uKJoD4K_raMZ9dFKtMC4'; // DoggyBot avatar
            if (isSuggestion) {
                messageBubble.classList.add('bg-gray-100', 'text-gray-600', 'text-sm', 'italic', 'rounded-bl-none');
                messageBubble.innerHTML = text; // Suggestions might already be formatted
            } else {
                messageBubble.classList.add('bg-gray-200', 'text-text-light', 'rounded-bl-none');
                messageBubble.innerHTML = formatBotResponse(text); // Use formatBotResponse for bot messages
            }
            messageContainer.appendChild(avatar);
            messageContainer.appendChild(messageBubble);
        }

        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }
