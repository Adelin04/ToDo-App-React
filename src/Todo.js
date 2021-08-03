import React from "react";

const Todo = ({ id, todo }) => {
  return (
    <div className='todo-item' id={id} style={{ textAlign: "center" }}>
      {todo}
    </div>
  );
};

export default Todo;
