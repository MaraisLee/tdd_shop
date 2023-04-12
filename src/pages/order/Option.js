import React from "react";

const Option = ({ name, updateItemCount }) => {
  return (
    <div>
      <form>
        <input
          type="checkbox"
          id={name}
          onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
        />
        <label htmlFor={name}>{name}</label>
      </form>
    </div>
  );
};

export default Option;
