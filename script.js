document.addEventListener('DOMContentLoaded', () => {
    const startChatButton = document.getElementById('start-chat-button');
    const closeChatButton = document.getElementById('close-chat-button');
    const chatInterface = document.getElementById('chat-interface');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const themeToggle = document.getElementById('theme-toggle');

    // Apply saved theme preference or default to system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    startChatButton.addEventListener('click', (e) => {
        e.preventDefault();
        chatInterface.classList.remove('hidden');
    });

    closeChatButton.addEventListener('click', () => {
        chatInterface.classList.add('hidden');
    });

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        appendMessage('user', message);
        userInput.value = '';

        if (message.toLowerCase() === '/info' || message.toLowerCase() === '/help') {
            appendMessage('bot', displayBotInfo());
            return;
        }

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
        } catch (error) {
            console.error('Error sending message:', error);
            appendMessage('bot', 'Sorry, something went wrong. Please try again later.');
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

**Reference Chat (Demo Questions for Quick Starts):**
*   "How do I teach my dog to sit?"
*   "What's a good diet for a senior dog?"
*   "Tell me about the history of Beagles."
*   "My dog is anxious, what can I do?"
*   "What are the signs of a happy dog?"

**OpenAI Chatbot Specification:**
This chatbot is an AI assistant, leveraging OpenAI's advanced language models. It is specifically configured to provide information, advice, and engaging content exclusively about dogs, including training, health, behavior, and general facts.
`;
    }

    function appendMessage(sender, text) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('flex', 'mb-4', sender === 'user' ? 'justify-end' : 'justify-start');

        const messageElement = document.createElement('div');
        messageElement.classList.add('p-4', 'rounded-lg', 'max-w-[75%]', 'shadow-md');

        if (sender === 'user') {
            messageElement.classList.add('bg-primary', 'text-white');
        } else {
            messageElement.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-text-light', 'dark:text-text-dark');
            // Process bot response for tips
            const formattedText = formatBotResponse(text);
            messageElement.innerHTML = formattedText;
        }

        if (sender === 'user') {
            messageElement.textContent = text;
        }

        messageContainer.appendChild(messageElement);
        chatMessages.appendChild(messageContainer);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }

    function formatBotResponse(text) {
        // Look for lists (numbered or bullet points)
        let formattedText = text.replace(/(\d+\.\s.*?(?:\n|$))/g, '<p class="mb-1">$1</p>'); // Numbered list
        formattedText = formattedText.replace(/(\*\s.*?(?:\n|$))/g, '<p class="mb-1">$1</p>'); // Bullet points

        // Basic paragraph formatting for other text
        formattedText = formattedText.split('\n').map(line => {
            if (line.trim() === '') {
                return '';
            }
            // If it's not already a list item, wrap in a paragraph
            if (!line.match(/^(\d+\.|\*)\s/)) {
                return `<p class="mb-1">${line}</p>`;
            }
            return line;
        }).join('');

        return formattedText;
    }
});
