# DogAssistance - AI-Powered Dog Chatbot

This project provides a web application featuring an AI-powered chatbot dedicated to dog assistance. It offers comprehensive information, practical advice, and engaging content covering various aspects of dogs, including their care, behavior, training, and general facts. The chatbot leverages OpenAI's advanced language models (specifically GPT-3.5-turbo) to provide relevant and helpful responses.

## Features

*   **AI-Powered Chat:** Interact with an intelligent chatbot to get answers to all your dog-related questions.
*   **Theme Toggle:** Switch between light and dark modes for a comfortable viewing experience.
*   **Special Commands:** Use `/info` or `/help` within the chat to get tips on using the bot and a list of demo questions for quick starts.
*   **Responsive Interface:** A user-friendly web interface accessible on various devices.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **AI Integration:** OpenAI API (GPT-3.5-turbo)
*   **Environment Management:** `dotenv`
*   **Frontend:** HTML, CSS, JavaScript

## Project Structure

*   `index.html`: The main landing page of the application.
*   `about.html`: Provides information about the project and its purpose.
*   `features.html`: Details the key features and functionalities of the chatbot.
*   `script.js`: Contains the client-side JavaScript logic for interactive elements, chat functionality, and theme toggling.
*   `server.js`: Implements the backend server using Express.js, handles API requests, and integrates with the OpenAI API.
*   `package.json`: Defines project metadata and manages Node.js dependencies.
*   `.env`: Stores environment variables, including your OpenAI API key (not committed to Git).
*   `.gitignore`: Specifies files and directories to be ignored by Git.

## Getting Started

Follow these steps to set up and run the DogAssistance chatbot locally:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/prathmeshmagar447/DogAssistance.git
    cd DogAssistance
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

1.  **Create a `.env` file:**
    In the root directory of the project, create a file named `.env`.
2.  **Add your OpenAI API Key:**
    Obtain an API key from [OpenAI](https://platform.openai.com/account/api-keys) and add it to your `.env` file:
    ```
    OPENAI_API_KEY=your_openai_api_key_here
    ```
    **Important:** Do not share your API key or commit your `.env` file to version control.

### Running the Application

1.  **Start the server:**
    ```bash
    npm start
    ```
    Alternatively, you can run:
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:3000`.

2.  **Open in browser:**
    Navigate to `http://localhost:3000` in your web browser.

## Usage

Once the application is running:

1.  Click the "Start Chat" button to open the chat interface.
2.  Type your dog-related questions into the input field and press Enter or click the "Send" button.
3.  Try special commands:
    *   Type `/info` or `/help` to see tips for using the chatbot and example questions.
4.  Use the theme toggle to switch between light and dark modes.

## Contributing

We welcome contributions to the DogAssistance project! If you have suggestions for improvements, new features, or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## License

This project is currently unlicensed. Please consider adding a `LICENSE` file (e.g., MIT, Apache 2.0) to specify how others can use, modify, and distribute your work.
