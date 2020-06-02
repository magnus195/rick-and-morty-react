import React, {useEffect, useState} from "react";
import Character from "../components/Character";
import {Row} from 'reactstrap'

async function getData(url) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
}

const Characters = () => {
    // Try to think through what state you'll need for this app before starting. Then build out
    // the state properties here.
    const [characters, setCharacters] = useState({})
    // Fetch characters from the API in an effect hook. Remember, anytime you have a
    // side effect in a component, you want to think about which state and/or props it should
    // sync up with, if any.
    useEffect(() => {
        getData('https://rickandmortyapi.com/api/character/').then(data => {
            console.log(JSON.stringify(data))
            let characterData = data.results.map(character => character)
            setCharacters(characterData)
        })
    }, [])

    return (<div>
        <Row xs={"1"} sm={"2"} md={"4"} lg={"5"}>
            {Object.keys(characters).map(i => {
                return <Character character={characters[i]}/>
            })}
        </Row>
    </div>);
};

export default Characters;
