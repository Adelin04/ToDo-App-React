import React, { useReducer, useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";

import Todo from "./Todo";

const reducer = (state, action) => {
  if (action.type === "ADD_TODO") {
    const newToDo = { id: action.payload.id, name: action.payload.name };
    return {
      ...state,
      todoList: [...state.todoList, newToDo],
      isSucces: true
    };
  }
  if (action.type === "REMOVE_TODO") {
    const leftToDo = state.todoList.filter(todo => {
      return todo.id !== Number(action.idPersonRemove);
    });
    return { ...state, todoList: leftToDo, isSucces: true };
  }
  return state;
};

const defaultState = {
  todoList: [],
  isSucces: false
};

function App() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("To-Do");
  const [state, dispatch] = useReducer(reducer, defaultState);
  let TMP_List = [];
  let tmp_Dictionary = {};
  let tmpId = 0;

  useEffect(() => {
    const localMemo = localStorage.getItem("todo");

    if (localMemo !== null) {
      JSON.parse(localMemo).forEach(element => {
        dispatch({
          type: "ADD_TODO",
          payload: {
            id: element.id,
            name: element.name
          }
        });
        tmpId = Number(element.id);
        setId(tmpId + 1);
      });
    }
  }, []);

  const handlerSubmit = e => {
    e.preventDefault();
    const localMemo = localStorage.getItem("todo");

    if (localMemo !== null)
      JSON.parse(localMemo).forEach(element => {
        TMP_List.push(element);
      });

    if (name) {
      tmp_Dictionary = {
        type: "ADD_TODO",
        payload: { id: id, name: name.toString() }
      };
      dispatch(tmp_Dictionary);
      setId(id + 1);

      TMP_List.push({
        id: tmp_Dictionary.payload.id,
        name: tmp_Dictionary.payload.name
      });
    }

    localStorage.setItem("todo", JSON.stringify(TMP_List));

    setName("");
    setMessage("Todo added with succes!");

    setTimeout(() => {
      setMessage("To-Do");
    }, 2000);
  };

  return (
    <div className="App">
      <Wrapper>
        <div
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: "18px"
          }}
        >
          {message}
          <div
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              fontSize: "18px"
            }}
          >
            <form
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center"
              }}
              onSubmit={handlerSubmit}
            >
              <input
                style={{ outline: "none", borderBottom: "2px solid #64edcf" }}
                className="input"
                value={name}
                required
                onChange={e => setName(e.target.value)}
              />
            </form>
          </div>
        </div>
        {state.todoList.map((person, index) => {
          return (
            <div key={index} className="todo">
              <Todo person={person.name} id={index} />
              <button
                className="remove-todo"
                onClick={() => {
                  let leftItems = JSON.parse(
                    localStorage.getItem("todo")
                  ).filter(element => {
                    return element.id !== person.id;
                  });
                  localStorage.setItem("todo", JSON.stringify(leftItems));

                  dispatch({
                    type: "REMOVE_TODO",
                    idPersonRemove: person.id
                  });
                }}
              >
                remove
              </button>
            </div>
          );
        })}
      </Wrapper>
    </div>
  );
}

export default App;

const Wrapper = styled.section`
  displey: flex;
  flex-direction: column;
  margin: auto;
  height: 100%;
  /*   background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%); */

  input {
    width: 300px;
    height: 25px;
    margin: 25px;
    border: none;
    text-align: center;
    color: #64edcf;
    font-size: 17px;
    border-radius: 5px;
  }

  .todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 500px;
    height: 30px;
    margin: 5px auto;
    padding: 5px;
    border-radius: 5px;
    overflow-wrap: anywhere;
    color: white;
    background: #64edcf;
  }

  .remove-todo {
    displey: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-width: 100px;
    height: 20px;
    padding: 5px;
    border-radius: 5px;
    border: none;
    background: skyblue;
    color: white;
    cursor: pointer;
  }

  .remove-todo:hover {
    color: red;
  }

  .todo-item {
    displey: flex;
    justifyContent: center;
    padding: 15px;
  }
`;
