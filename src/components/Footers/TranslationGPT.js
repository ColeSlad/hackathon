import React, { useState } from 'react';
import './Translation.css';

// Translation component responsible for text translation
const Translation = () => {
    // States for input text, translated response, target language, and loading status
    const [inputText, setInputText] = useState(''); // State for user input text
    const [responseText, setResponseText] = useState(''); // State for translated response text
    const [targetLang, setTargetLang] = useState('en'); // State for target language selection
    const [isLoading, setIsLoading] = useState(false); // State to handle loading status

    // Object containing language options for translation
    const languageOptions = {
        "english": "Select",
        "arabic": "Arabic",
        "bulgarian": "Bulgarian",
        "chinese (simplified)": "Chinese (Simplified)",
        "chinese (traditional)": "Chinese (Traditional)",
        "croatian": "Croatian",
        "czech": "Czech",
        "danish": "Danish",
        "dutch": "Dutch",
        "english": "English",
        "estonian": "Estonian",
        "finnish": "Finnish",
        "french": "French",
        "german": "German",
        "greek": "Greek",
        "hebrew": "Hebrew",
        "hindi": "Hindi",
        "hungarian": "Hungarian",
        "indonesian": "Indonesian",
        "italian": "Italian",
        "japanese": "Japanese",
        "korean": "Korean",
        "latvian": "Latvian",
        "lithuanian": "Lithuanian",
        "norwegian": "Norwegian",
        "persian": "Persian",
        "polish": "Polish",
        "portuguese": "Portuguese",
        "romanian": "Romanian",
        "russian": "Russian",
        "serbian": "Serbian",
        "slovak": "Slovak",
        "slovenian": "Slovenian",
        "spanish": "Spanish",
        "swedish": "Swedish",
        "thai": "Thai",
        "turkish": "Turkish",
        "ukrainian": "Ukrainian",
        "urdu": "Urdu",
        "vietnamese": "Vietnamese",
        // ... continue adding other languages
    };

    // Function triggered when the translate button is clicked
    const handleTranslate = async () => {
        setResponseText(''); // Reset response text
        setIsLoading(true); // Set loading state to true

        // Create the prompt text for translation using input text and target language
        const promptText = `Translate this to ${targetLang}: ${inputText}`;
    
        try {
            // Fetching translation data from an API
            const response = await fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer Q3A1YL3AAZWPHNITZOX0A1W8ZI7W75UB6LYEOKAGFKQA47B11G3ZGOCCHMEPJHDJ'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo", // Specify the translation model
                    messages: [{
                        role: "user", // Define user role for interaction
                        content: promptText // Provide the content for translation
                    }]
                })
            });
            
            // Parsing the response data into JSON format
            const data = await response.json();
            
            // Set the translated response text to the obtained translation
            setResponseText(data.choices[0].message.content);
        } catch (error) {
            // Handle errors in case of API failure or other issues
            console.error('Error:', error);
            setResponseText('Error in processing request');
        }

        setIsLoading(false); // Set loading state to false after translation or error handling
    };
    
    // Render the translation interface
    return (
        <div className="container-fluid translation-section" id="translate">
            <div className="header">
                <h2>Translate Your Enemy</h2>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="translation-card p-4 mb-3">
                        {/* Input area for the user to enter text for translation */}
                        <textarea 
                            className="form-control mb-3"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter text"
                        />
                        {/* Dropdown to select the target language */}
                        <select 
                            className="form-control mb-3"
                            value={targetLang} 
                            onChange={(e) => setTargetLang(e.target.value)}
                        >
                            {Object.entries(languageOptions).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                        {/* Button to trigger the translation process */}
                        <button 
                            className="btn btn-primary mb-3"
                            onClick={handleTranslate}
                        >
                            Translate
                        </button>

                        {/* Display a spinner while translation is in progress */}
                        {isLoading && (
                            <div className="spinner-border text-gold" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}

                        {/* Display the translated text */}
                        <p className="translation-output" id="encyclopedia">{responseText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Translation; // Export the Translation component
