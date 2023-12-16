import React, { useState } from 'react';

import { Container, Row, Col } from 'reactstrap';
import EncyclopediaCarousel from './EncyclopediaCarousel.js';
import './Encyclopedia.css';

  
function Encyclopedia() {

  var apiKey = "Q3A1YL3AAZWPHNITZOX0A1W8ZI7W75UB6LYEOKAGFKQA47B11G3ZGOCCHMEPJHDJ";

  const NUM_IMAGES = 1;
  const [canvasImages, setCanvasImages] = useState(Array(NUM_IMAGES).fill(''));

  const [userInput, setUserInput] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [responseText, setResponseText] = useState('');

  const [dynamicItems, setDynamicItems] = useState(Array(NUM_IMAGES).fill({
    src: '',
    altText: '',
    caption: ''
  }));
  
//   var dynamicItems = [
    
//   ];

  async function generateDescription() {
    const promptText = `Describe ${userInput} in 3 sentences or less.`;
  
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
        //now just processing the data
        setResponseText(data.choices[0].message.content);
        console.log(responseText);
    } catch (error) {
        console.error('Error:', error);
        setResponseText('Error in processing request');
    }

  }
  
  async function generateImageURL() {
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
  
      //   setShowAnimation(false);
  
        return generatedImageUrl;
      } catch (error) {
        console.error('Error fetching OpenAI completion:', error);
      //   setShowAnimation(false);
        // You may want to handle the error in a way that makes sense for your application.
        return '';
      }
    }

  const handleSearchChange = (event) => {
    setUserInput(event.target.value);
  }

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

  return (
    <div className='encyclopedia-container'>
      <Container>
      <h1 className='text-center'>Encyclopedia</h1>
      <Row xs="2" className='xxl'>
        <Col className="text-left">
            <form className='inputText' onSubmit={handleFormSubmit}>
                <input  type="text" value={userInput} onChange={handleSearchChange} placeholder="Search the encyclopedia" />
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