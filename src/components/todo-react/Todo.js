import React, {useState, useEffect} from 'react';
import './style.css';

const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");
    if(lists) {
        return JSON.parse(lists)
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    useEffect (() => {
        localStorage.setItem("myTodoList", JSON.stringify(items))
    },[items])

    const addItem = () => {
        if(!inputData) {
            alert('Plz fill the Data');
        } else if(inputData && isEditItem) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return {...curElem, name : inputData}
                    } else {
                        return curElem;
                    }
                })
            )
            setInputData([]);
            setIsEditItem(null);
            setToggleButton(false);
        } 
        
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    }

    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedItem);
    }

    const editItem = (index) => {
        const item_todo_edit = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edit.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    return (
        <div className="main-div">
            <div className="child-div">     
                <figure>
                    <img src="./images/todo.svg" alt=""/>
                    <figcaption>Add your list here</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder="Add Items"
                        value={inputData}
                        onChange={(event) => setInputData(event.target.value)}
                    />
                    {toggleButton ? 
                        <i class="far fa-edit add-btn" onClick = {() => addItem()}></i> 
                        :
                        <i class="fa fa-plus add-btn" onClick = {() => addItem()}></i>
                    }
                    
                </div>
                <div className>
                    <div className="showItems">
                    {items.map((curElem, index) => {
                             return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                    <i class="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                    <i class="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                             )   
                            })}
                        
                    </div>

                </div>
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={() => setItems([])}>
                     <span>CHECK LIST</span>   
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Todo;
