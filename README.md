# Translate XML Content

This project is designed to translate XML content using an external API. It provides a simple interface for users to input XML data, select a target language, and receive the translated output.

## Project Structure

```
translate-xml-content
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers
│   │   └── translateController.js  # Handles XML translation logic
│   ├── routes
│   │   └── index.js          # Sets up application routes
│   └── utils
│       └── encryption.js      # Functions for encrypting and decrypting API keys
├── package.json               # Configuration file for npm
├── .env                       # Environment variables (API key, encryption key)
└── README.md                  # Documentation for the project
```

## Features

- Beautify XML input for better readability.
- Translate XML content from Vietnamese to a specified target language.
- Handle API key securely using encryption.
- Simple and intuitive user interface.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd translate-xml-content
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your API key and encryption key:
   ```
   API_KEY=your_api_key
   ENCRYPTION_KEY=your_encryption_key
   ```

## Usage

To start the application, run:
```
node src/app.js
```

Visit `http://localhost:3000` in your browser to access the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
