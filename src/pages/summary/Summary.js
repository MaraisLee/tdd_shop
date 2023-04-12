import React, { useState } from "react";

const Summary = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <form>
        <label>
          주문 사항을 확인하셨나요?
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </label>
        <button disabled={!checked} type="submit">
          주문확인
        </button>
      </form>
    </>
  );
};

export default Summary;
