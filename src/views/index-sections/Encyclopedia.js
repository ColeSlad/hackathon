// Import necessary libraries and components
import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import EncyclopediaCarousel from './EncyclopediaCarousel.js';
import './Encyclopedia.css';

// Main function component
function Encyclopedia() {
  // Define API key
  var apiKey = "Q3A1YL3AAZWPHNITZOX0A1W8ZI7W75UB6LYEOKAGFKQA47B11G3ZGOCCHMEPJHDJ";

  // Define state variables
  const NUM_IMAGES = 1;
  const [canvasImages, setCanvasImages] = useState(Array(NUM_IMAGES).fill(''));
  const [userInput, setUserInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to handle loading status
  const [dynamicItems, setDynamicItems] = useState(Array(NUM_IMAGES).fill({
    src: '',
    altText: '',
    caption: ''
  }));

  // Function to generate description using OpenAI API
  async function generateDescription() {
    setIsLoading(true); // Set loading state to false
    const promptText = `Describe ${userInput}. Mention their strengths, weaknesses, and other notable information in 5 sentences or less.`;
  
    try {
        const response = await fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
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
        // Set the response text state variable with the data received
        setResponseText(data.choices[0].message.content);
        console.log(responseText);
    } catch (error) {
        console.error('Error:', error);
        setResponseText('Error in processing request');
    }
  }

  // Function to generate image URL using OpenAI API
  async function generateImageURL() {
    setIsLoading(true); // Set loading state to true
    try {
        const response = await fetch('https://jamsapi.hackclub.dev/openai/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify({
            'model': 'dall-e-3',
            'prompt': userInput,
            'size': '1024x1024',
            'n': 1
          })
        });
  
        const eventsResponse = await response.json();
        console.log(eventsResponse);
  
        const generatedImageUrl = eventsResponse.data[0].url;
        console.log(generatedImageUrl);
  
        
        setIsLoading(false); // Set loading state to false
        return generatedImageUrl;
      } catch (error) {
        console.error('Error fetching OpenAI completion:', error);
        setIsLoading(false); // Set loading state to false
        return '';
      }
    }

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setUserInput(event.target.value);
  }

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await generateDescription();
    var newItems = dynamicItems;

    console.log("encycolpedia items"+ newItems);
    var updatedCanvasImages = Array(NUM_IMAGES).fill('');

    for (let i = 0; i < NUM_IMAGES; i++) {
      updatedCanvasImages[i] = await generateImageURL();
      console.log("mid of handleFormSubmit "+updatedCanvasImages[i]);
    }
    setCanvasImages(updatedCanvasImages);

    for (let i = 0; i < NUM_IMAGES; i++) {
        newItems[i].src = updatedCanvasImages[i];
        newItems[i].altText = userInput;
        newItems[i].caption = userInput;
        console.log("newItems: " + newItems[i].src);
    }
    setDynamicItems(newItems);

    console.log("end of handleFormSubmit "+generatedImage)
  };

  // Render the component
  return (
      <div className='encyclopedia-container'>
        <Container>
        <h1 className='text-center'>Encyclopedia</h1>
        <h4 className='text-center'>Find information about your enemies.</h4>
        <Row xs="2" className='xxl'>
          <Col className="text-left">
              <form  onSubmit={handleFormSubmit}>
                  <input className='inputText' type="text" value={userInput} onChange={handleSearchChange} placeholder="Search the encyclopedia" />
                  {/* Display a spinner while translation is in progress */}
                  {isLoading && (
                            <div className="spinner-border text-gold" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
              </form>
              <p className='descriptionText'>{responseText}</p>
          </Col>
          <Col className='text-right'>
              <EncyclopediaCarousel items={dynamicItems}/>
          </Col>
        </Row>
        </Container>
      </div>
  );
}

export default Encyclopedia;