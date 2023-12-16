import React, { useState } from 'react'
import styled from "styled-components"


// Initialize styled components.  
const Section = styled.div`
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items:center;
    padding: 20px;
    margin-top: 15px;
`
const TitleText = styled.p`
    color: #ffb236;
    font-size: 40px;
    font-weight: 800;
`

const OutputText = styled.p`
    font-size: 20px;
    font-weight: 700;
`

const NumCombatants = styled.div`
    display: flex;
    align-text: center;
`

const NumCombatantsText = styled.p`
    display: inline-block;
    text-align: right;
    margin-right: 5px;
`

const NumCombatantsInput = styled.input`
    height: 30px;
`

const Quality = styled.div`
    display: flex;
    align-text: center;
    color: "green";
`

const QualityText = styled.p`
    display: inline-block;
    text-align: right;
    margin-right: 5px;
`


const QualityButton = styled.button`
    border-radius: 10px;
    height: 30px;
    padding-x: 10px;
    margin-left: 10px;
`

const TerrainAdvantage = styled.div`
    display: flex;
    align-text: center;
    color: "green";
`

const TerrainAdvantageText = styled.p`
    display: inline-block;
    text-align: right;
    margin-right: 5px;
`


const TerrainAdvantageButton = styled.button`
    border-radius: 10px;
    height: 30px;
    padding-x: 10px;
    margin-left: 10px;
`

const SubmitButton = styled.button`
    border-radius: 10px;
    padding: 15px;
    margin-left: 10px;
    margin-bottom: 20px;
`
// Define the component.
const BattleSimulator = () => {
  const [numOfMyCombatants, setNumOfMyCombatants] = useState(0);
  const [myArmorQuality, setMyArmorQuality] = useState('');
  const [myTerrainAdvantage, setMyTerrainAdvantage] = useState(false);

  const [numOfOppCombatants, setNumOfOppCombatants] = useState(0);
  const [oppArmorQuality, setOppArmorQuality] = useState('');
  const [oppTerrainAdvantage, setOppTerrainAdvantage] = useState(false);

  const [responseText, setResponseText] = useState('');

  // OpenAI API call.
  const handleResponse = async () => {
    console.log("hih")
    const promptText = `In one sentence, giving only a percentage as an answer (ranging from 0-100), not considering any other factors besides the ones given, what is the chance of winning this fictional battle with the following features: My side: ${numOfMyCombatants} combatants with ${myArmorQuality} weapons and armor and ${myTerrainAdvantage ? "a terrain advantage" : "no terrain advantage"} versus the opponent side: ${numOfOppCombatants} combatants with ${oppArmorQuality} weapons and armor and ${oppTerrainAdvantage ? "a terrain advantage" : "no terrain advantage"}`;

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
};

  return (
    <Section id="battle-section">
        <TitleText>
            BATTLE SIMULATOR
        </TitleText>
        <NumCombatants>
            <NumCombatantsText>
                Number of your sides combatants: 
            </NumCombatantsText>
            <NumCombatantsInput type="number" value={numOfMyCombatants} onChange={(e) => setNumOfMyCombatants(e.target.value)}/>
        </NumCombatants>
        <Quality>
            <QualityText>
                Quality of your armor and weapons: {myArmorQuality}
            </QualityText>
            <QualityButton onClick={() => setMyArmorQuality("High Quality")}>
                High Quality
            </QualityButton>
            <QualityButton onClick={() => setMyArmorQuality("Medium Quality")}>
                Medium Quality
            </QualityButton>
            <QualityButton onClick={() => setMyArmorQuality("Low Quality")}>
                Low Quality
            </QualityButton>
            <QualityButton onClick={() => setMyArmorQuality("No")}>
                No Gear
            </QualityButton>
        </Quality>
        <TerrainAdvantage>
            <TerrainAdvantageText>
                Do you have a terrain advantage: {myTerrainAdvantage ? "Yes" : "No"}
            </TerrainAdvantageText>
            <TerrainAdvantageButton onClick={() => setMyTerrainAdvantage(true)}>
                Yes
            </TerrainAdvantageButton>
            <TerrainAdvantageButton onClick={() => setMyTerrainAdvantage(false)}>
                No
            </TerrainAdvantageButton>
        </TerrainAdvantage>

        <hr />

        <NumCombatants>
            <NumCombatantsText>
                Number of opponent sides combatants: 
            </NumCombatantsText>
            <NumCombatantsInput type="number" value={numOfOppCombatants} onChange={(e) => setNumOfOppCombatants(e.target.value)}/>
        </NumCombatants>
        <Quality>
            <QualityText>
                Quality of your armor and weapons: {oppArmorQuality}
            </QualityText>
            <QualityButton onClick={() => setOppArmorQuality("High Quality")}>
                High Quality
            </QualityButton>
            <QualityButton onClick={() => setOppArmorQuality("Medium Quality")}>
                Medium Quality
            </QualityButton>
            <QualityButton onClick={() => setOppArmorQuality("Low Quality")}>
                Low Quality
            </QualityButton>
            <QualityButton onClick={() => setOppArmorQuality("No")}>
                No Gear
            </QualityButton>
        </Quality>
        <TerrainAdvantage>
            <TerrainAdvantageText>
                Do you have a terrain advantage: {oppTerrainAdvantage ? "Yes" : "No"}
            </TerrainAdvantageText>
            <TerrainAdvantageButton onClick={() => setOppTerrainAdvantage(true)}>
                Yes
            </TerrainAdvantageButton>
            <TerrainAdvantageButton onClick={() => setOppTerrainAdvantage(false)}>
                No
            </TerrainAdvantageButton>
        </TerrainAdvantage>

        <SubmitButton onClick={handleResponse}>
            Simulate Battle
        </SubmitButton>

        <OutputText>
            {responseText}
        </OutputText>
    </Section>
  )
}

export default BattleSimulator