import React from 'react'; // Optional in newer React versions (v17+)

const Button = (props) => {
  // Component logic and state management (using hooks like useState, useEffect) go here
  return (
    <div className="Home-container">
      <h1>Hello, {props.name}!</h1>
      <p>This is a button</p>
    </div>
  );
};

export default Button;