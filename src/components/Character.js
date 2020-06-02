import React from "react";
import {Card, CardBody, CardImg, CardTitle, CardSubtitle, Badge, Col} from 'reactstrap'

const Character = (props) => {
    function aliveBadge() {
        if (props.character.status === "Alive") {
            return <Badge color="success">Alive</Badge>
        } else if (props.character.status === "Dead") {
            return <Badge color="danger">Dead</Badge>
        } else {
            return <Badge color="secondary">{props.character.status}</Badge>
        }
    }
    return (<div>
        <Col style={{margin: 10}}>
        <Card>
            <CardImg top width="100%" src={props.character.image}/>
            <CardBody>
                <CardTitle>{props.character.name} <Badge color={"primary"}>{props.character.species}</Badge></CardTitle>
                <CardSubtitle>{aliveBadge()}</CardSubtitle>
            </CardBody>
        </Card>
        </Col>
    </div>);
};

export default Character;
