import React, {useEffect, useState} from "react";
import Character from "../components/Character";
import {Row, Input, InputGroup, InputGroupAddon, InputGroupText, Col, Button} from 'reactstrap'

async function getCharacters(url) {
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
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    // Fetch characters from the API in an effect hook. Remember, anytime you have a
    // side effect in a component, you want to think about which state and/or props it should
    // sync up with, if any.
    function searchFieldChange(e) {
        setSearch(e.target.value)
    }
    function pageIncrease() {
        setPage(page + 1)
    }
    function pageDecrease() {
        setPage(page - 1)
    }

    useEffect(() => {
        getCharacters('https://rickandmortyapi.com/api/character/?name=' + search + '&page=' + page).then(data => {
            console.log(JSON.stringify(data))
            let characterData
            try {
                characterData = data.results.map(character => character)
            } catch {
                characterData = {}
                console.log("error")
            }
            setCharacters(characterData)
        })
    }, [search, page])

    return (<div>
        <Row xs={"1"} md={"2"} lg={"2"} className={"justify-content-center"}>
            <Col>
            <InputGroup>
                <InputGroupAddon addonType={"prepend"}>
                    <InputGroupText>Search</InputGroupText>
                </InputGroupAddon>
                <Input type={"text"} name={"search"} id={"searchField"} onChange={searchFieldChange}/>
            </InputGroup>
            </Col>
        </Row>
        <Row xs={"1"} sm={"2"} md={"4"} lg={"5"}>
            {Object.keys(characters).map(i => {
                return <Character character={characters[i]}/>
            })}
        </Row>
        <Row xs={"1"} md={"2"} lg={"2"} className={"justify-content-center"}>
            <Col>
                <InputGroup>
                    <InputGroupAddon addonType={"prepend"}>
                        <Button onClick={pageDecrease}>Previous</Button>
                    </InputGroupAddon>
                    <InputGroupText>{page}</InputGroupText>
                    <InputGroupAddon addonType={"append"}>
                        <Button onClick={pageIncrease}>Next</Button>
                    </InputGroupAddon>
                </InputGroup>
            </Col>
        </Row>
    </div>);
};

export default Characters;
