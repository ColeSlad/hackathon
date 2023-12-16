import React, { useState } from 'react';

import { Container, Row, Col } from 'reactstrap';

// fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
//   method: 'POST',
//   headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer YOURTOKEN'},
//   body: JSON.stringify({
//     'model': 'gpt-3.5-turbo',
//     'messages': [
//       {'role': 'user',
//        'content': 'Hello, world!'
//       }
//     ],
//   }
// )}).then(result => result.json()).then(data => console.log(data.choices[0].message.content)); // => 'Hello, world!'

function Encyclopedia() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Container>
      <Row>
        <Col md="12" className="text-center">
            <h1>Encyclopedia</h1>
        </Col>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search the encyclopedia" />
        {/* Display search results here */}
      </Row>
      </Container>
    </div>
  );
}

export default Encyclopedia;