import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import {Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const TaskList = styled.div`
    padding: 8px;
    flex-grow: 1;
    background-color: ${props => (props.isDraggingOver ? 'teal' : 'white')};
    min-height: 100px;
`;

const BoardColumn = (props) => {
    const [columnTitle, setColumnTitle] = React.useState(props.Title)
    const [titleReadOnly, setTitleReadOnly] = React.useState(true)
    const updateColumnTitle = () => {
        setTitleReadOnly(true);
        props.renameColumn(props.ColumnId, columnTitle);
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            updateColumnTitle();
        }
    }
    return (
        <Card className='col-3 m-4'>
            <Card.Body>
                <Form.Control 
                    className="col-12 input-sm" 
                    name="columnTitle" 
                    type="text" 
                    value={columnTitle} 
                    onChange={e => setColumnTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                    readOnly={titleReadOnly}
                    onClick={() => setTitleReadOnly(false)}
                    onMouseLeave={() => { if (!titleReadOnly) {updateColumnTitle();}}}
                    size="sm"
                    />
                <Card.Text><small>ColumnId: {props.ColumnId} Index:{props.Index}</small></Card.Text>
                <Button onClick={() => props.addCardToColumn(props.ColumnId)}><small>Add task</small></Button>
                <Droppable droppableId={props.ColumnId} >
                    { (provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            { props.children }
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Card.Body>
        </Card>
    )
}

export default BoardColumn
