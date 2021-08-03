import React from "react";

const Todo = ({ id, person }) => {
  return (
    <div className='todo-item' id={id} style={{ textAlign: "center" }}>
      {person}
    </div>
  );
};

export default Todo;
