import React, { useState } from 'react';
//import axios from 'axios';

const Translation = () => {
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [targetLang, setTargetLang] = useState('en');
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const languageOptions = {
        "en": "English",
        "es": "Spanish",
        "fr": "French",
        "de": "German",
        "zh-CN": "Chinese (Simplified)",
        "zh-TW": "Chinese (Traditional)",
        "da": "Danish",
        "nl": "Dutch",
        "fi": "Finnish",
        "el": "Greek",
        "hi": "Hindi",
        "it": "Italian",
        "ja": "Japanese",
        "ko": "Korean",
        "no": "Norwegian",
        "pl": "Polish",
        "pt": "Portuguese",
        "ru": "Russian",
        "sv": "Swedish",
        "tr": "Turkish",
        "cs": "Czech",
        "ro": "Romanian",
        "hu": "Hungarian",
        "sk": "Slovak",
        "sl": "Slovenian",
        "lt": "Lithuanian",
        "lv": "Latvian",
        "et": "Estonian",
        "bg": "Bulgarian",
        "hr": "Croatian",
        "sr": "Serbian",
        "uk": "Ukrainian",
        "he": "Hebrew",
        "ur": "Urdu",
        "ar": "Arabic",
        "fa": "Persian",
        "th": "Thai",
        "vi": "Vietnamese",
        "id": "Indonesian",
        // ... continue adding other languages
    };


    const handleTranslate = async () => {
        setResponseText('');
        setIsLoading(true); // Start loading
        const promptText = `Translate this to ${targetLang}: ${inputText}`;
    
        try {
            const response = await fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer Q3A1YL3AAZWPHNITZOX0A1W8ZI7W75UB6LYEOKAGFKQA47B11G3ZGOCCHMEPJHDJ'
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo", // Specify the model here
                    messages: [{
                        role: "user", // Role can be 'user' or 'assistant'
                        content: promptText
                    }]
                })
            });
            const data = await response.json();
            //now just processing the data
            setResponseText(data.choices[0].message.content);
        } catch (error) {
            console.error('Error:', error);
            setResponseText('Error in processing request');
        }

        setIsLoading(false); // Stop loading

    };
    
    
    






    // const handleTranslate2 = async () => {
    //     try {
    //         const promptText = `Translate this to ${targetLang}: ${inputText}`;

    //         const response = await axios.post(
    //             'https://api.openai.com/v1/engines/davinci-codex/completions',
    //             {
    //                 prompt: promptText,
    //                 max_tokens: 60
    //             },
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer Q3A1YL3AAZWPHNITZOX0A1W8ZI7W75UB6LYEOKAGFKQA47B11G3ZGOCCHMEPJHDJ`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             }
    //         );
    //         setResponseText(response.data.choices[0].text);
    //     } catch (error) {
    //         console.error('Error:', error);
    //         setResponseText('Error in processing request');
    //     }
    // };

    return (
        <div>
            <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text"
            />
            <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                {Object.entries(languageOptions).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                ))}
            </select>
            <button onClick={handleTranslate}>Translate</button>

            <div>
                <p>Translation:</p>

                {/* Spinner */}
                 {isLoading && (
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                 )}

                <p>{responseText}</p>
            </div>
        </div>
    );
}

export default Translation;
