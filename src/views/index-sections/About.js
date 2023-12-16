import React from 'react';
import styled from "styled-components";

const Section = styled.div`
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items:center;
    padding: 20px;
    margin-top: 15px;
`

const AboutText = styled.p`
    font-size: 40px;
    font-weight: 800;
    color: #ffb236;
`

const MainDescription = styled.p`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
`

const Description = styled.p`
    font-size: 20px;
    font-weight: 600;
`
const Ul = styled.ul`
    margin-top:20px;
    display:flex;
`

const Li = styled.li`
    text-align:center;
    max-width: 400px;
`

const About = () => {
  return (
    <Section id="about-section">
        <Section>
        <AboutText>
            ABOUT
        </AboutText>
        <MainDescription>
            The Mythological Tools app is the perfect modern tool for all your ancient needs!
        </MainDescription>
        <MainDescription>
            Scroll down to see all of the currently available tools, including: 
        </MainDescription>
        <Ul>
            <Li>
                <Description>
                    An ancient language translator
                </Description>
            </Li>
            <Li>
                <Description>
                    An AI encyclopedia for all of your mythological needs
                </Description>
                
                </Li>
            <Li>
                <Description>
                    A battle simulator that can help predict your odds on winning the battle!
                </Description>
            </Li>
        </Ul>
    </Section>
    </Section>
    
  )
}

export default About