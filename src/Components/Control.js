import "./Control.css";

const Control = ({ type, brLeng, seLeng, handleClick }) => {
  return (
    <div
      className="control"
      id={`${type.toLowerCase()}-label`}
      onClick={handleClick}
    >
      <h2>{`${type} Length`}</h2>
      <button id={`${type.toLowerCase()}-decrement`}>-</button>
      <p id={`${type.toLowerCase()}-length`}>
        {type === "Session" ? seLeng : brLeng}
      </p>
      <button id={`${type.toLowerCase()}-increment`}>+</button>
    </div>
  );
};

export default Control;
