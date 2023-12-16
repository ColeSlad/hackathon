import React, { useState } from 'react';
import './Translation.css';
//import axios from 'axios';

const Translation = () => {
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [targetLang, setTargetLang] = useState('en');
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const languageOptions = {
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

    // return (
    //     <div>
    //         <textarea 
    //             value={inputText}
    //             onChange={(e) => setInputText(e.target.value)}
    //             placeholder="Enter text"
    //         />
    //         <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
    //             {Object.entries(languageOptions).map(([code, name]) => (
    //                 <option key={code} value={code}>{name}</option>
    //             ))}
    //         </select>
    //         <button onClick={handleTranslate}>Translate</button>

    //         <div>
    //             <p>Translation:</p>

    //             {/* Spinner */}
    //              {isLoading && (
    //             <div className="spinner-border text-success" role="status">
    //                 <span className="sr-only">Loading...</span>
    //             </div>
    //              )}

    //             <p>{responseText}</p>
    //         </div>
    //     </div>
    // );


    return (
        
        <div className="container-fluid translation-section">
            <div className="header">
                <h2>Translate Your Enemy</h2>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="translation-card p-4 mb-3">
                        <textarea 
                            className="form-control mb-3"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Enter text"
                        />
                        <select 
                            className="form-control mb-3"
                            value={targetLang} 
                            onChange={(e) => setTargetLang(e.target.value)}
                        >
                            {Object.entries(languageOptions).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                        <button 
                            className="btn btn-primary mb-3"
                            onClick={handleTranslate}
                        >
                            Translate
                        </button>

                        {/* Spinner */}
                        {isLoading && (
                            <div className="spinner-border text-gold" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}

                        <p className="translation-output">{responseText}</p>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default Translation;
