import React from 'react';
import {ButtonGroup, ToggleButton, Row, Col} from 'react-bootstrap';

 class Menu extends React.Component {

    render() {

        return (
            <div className="d-flex flex-column pt-4 pb-4">
                <ButtonGroup toggle className="w-100">
                    <ToggleButton variant="info" type="radio" name="radio" defaultChecked value="1">
                    Photo
                    </ToggleButton>
                    <ToggleButton variant="info" type="radio" name="radio" value="2">
                    Document
                    </ToggleButton>
                    <ToggleButton variant="info" type="radio" name="radio" value="3">
                    Text
                    </ToggleButton>
                </ButtonGroup>
            </div>
        )
    }

 }

 export default Menu;