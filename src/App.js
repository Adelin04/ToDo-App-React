import React, { useReducer, useState, useEffect } from "react";
import styled from "styled-components";

import "./App.css";
import Todo from "./Todo";

import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const reducer = (state, action) => {
  if (action.type === "ADD_TODO") {
    const newToDo = { id: action.payload.id, name: action.payload.name };
    return {
      ...state,
      todoList: [...state.todoList, newToDo],
      isSucces: true,
    };
  }
  if (action.type === "REMOVE_TODO") {
    const leftToDo = state.todoList.filter((todo) => {
      return todo.id !== Number(action.idPersonRemove);
    });
    return { ...state, todoList: leftToDo, isSucces: true };
  }
  return state;
};

const defaultState = {
  todoList: [],
  isSucces: false,
};

function App() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("To-Do");
  const [state, dispatch] = useReducer(reducer, defaultState);
  let TMP_List = [];
  let tmp_Dictionary = {};

  useEffect(() => {
    const localMemo = localStorage.getItem("todo");

    if (localMemo !== null) {
      JSON.parse(localMemo).forEach((element) => {
        dispatch({
          type: "ADD_TODO",
          payload: {
            id: element.id,
            name: element.name,
          },
        });
        let tmpId = Number(element.id);
        setId(tmpId + 1);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const localMemo = localStorage.getItem("todo");

    if (localMemo !== null)
      JSON.parse(localMemo).forEach((element) => {
        TMP_List.push(element);
      });

    if (name) {
      tmp_Dictionary = {
        type: "ADD_TODO",
        payload: { id: id, name: name.toString() },
      };
      dispatch(tmp_Dictionary);
      setId(id + 1);

      TMP_List.push({
        id: tmp_Dictionary.payload.id,
        name: tmp_Dictionary.payload.name,
      });
    }

    localStorage.setItem("todo", JSON.stringify(TMP_List));

    setName("");
    setMessage("Todo added with succes!");

    setTimeout(() => {
      setMessage("To-Do");
    }, 2000);
  };

  const handleEdit = (e, id, value) => {
    if (value !== undefined) {
      setName(value);
    }

    let leftItems = JSON.parse(localStorage.getItem("todo")).filter(
      (element) => {
        return element.id !== Number(id);
      }
    );

    localStorage.setItem("todo", JSON.stringify(leftItems));
    console.log(leftItems);
    dispatch({
      type: "REMOVE_TODO",
      idPersonRemove: id,
    });
  };

  return (
    <div className="App">
      <Wrapper>
        <div
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            fontSize: "18px",
          }}
        >
          {message}
          <div
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              fontSize: "18px",
            }}
          >
            <form
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={handleSubmit}
            >
              <input
                style={{ outline: "none", borderBottom: "2px solid #64edcf" }}
                className="input"
                value={name || ""}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </form>
          </div>
        </div>

        {state.todoList.map((todo, index) => {
          return (
            <div key={index} className="todo">
              <Todo todo={todo.name} id={index} />
              <div className="wrapper-btns">
                <button
                  className="btn edit-todo"
                  id={index}
                  value={todo.name}
                  onClick={(e) => handleEdit(e, todo.id, todo.name)}
                >
                  Edit {<FaEdit />}
                </button>
                <button
                  className="btn remove-todo"
                  onClick={() => {
                    let leftItems = JSON.parse(
                      localStorage.getItem("todo")
                    ).filter((element) => {
                      return element.id !== todo.id;
                    });
                    localStorage.setItem("todo", JSON.stringify(leftItems));

                    dispatch({
                      type: "REMOVE_TODO",
                      idPersonRemove: todo.id,
                    });
                  }}
                >
                  Remove {<FaTrash />}
                </button>
              </div>
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
  margin: 0px auto;
  height: 100%;

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
    height: auto;
    margin: 5px auto;
    padding: 5px;
    border-radius: 5px;
    overflow-wrap: anywhere;
    color: white;
    background: #64edcf;
  }

  .todo:hover {
    /* background: rgb(34, 193, 195);
    background: linear-gradient(
      0deg,
      rgba(34, 193, 195, 1) 0%,
      rgba(252, 191, 60, 1) 100%
      )
      fixed; */
    background: transparent;
  }

  .wrapper-btns {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 150px;
  }

  .btn {
    displey: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 50px;
    height: 20px;
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
    justifycontent: center;
    align-items: center;
    margin: 0px 5px;
    max-width: 330px;
    height: auto;
  }
`;
