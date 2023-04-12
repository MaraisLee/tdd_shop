import { createContext, useEffect, useMemo, useState } from "react";
export const OrderContext = createContext();

// 가격 정보
const pricePerItem = {
  products: 1000,
  options: 500,
};

// 가격 총 계산함수(종류, 갯수)
function calculatorSubTotal(orderType, orderCounts) {
  let count = 0;
  for (let v of orderCounts[orderType].values()) {
    count += v;
  }

  return count * pricePerItem[orderType];
}

export function OrderContextProvider(props) {
  // state 생성
  // 각 제품의 이름, 수량 / 각 옵션의 이름, 수량
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  // 총 가격 state
  const [totals, setTotals] = useState({
    // 제품 총 가격
    products: 0,
    // 선택 옵션 총 가격
    options: 0,
    // 제품가격 +옵션 가격
    totals: 0,
  });

  // 상품 가격 계산을 위한 useEffect 코드
  useEffect(() => {
    // 새로운 값(state :  totals)을 업데이트
    // 제품 선택 가격 총 계산
    const productsTotal = calculatorSubTotal("products", orderCounts);
    // 옵션 선택 가격 총 계산
    const optionsTotal = calculatorSubTotal("options", orderCounts);
    // 전체 금액 총 계산
    const total = productsTotal + optionsTotal;
    // 업데이트
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total: total,
    });
    // 주문 갯수가 올라가거나 내려갈때마다 값을 갱신해줘야됨 !
  }, [orderCounts]);

  const value = useMemo(() => {
    // products or options  구분위해 orderType 가져옴
    function updateItemCount(itemName, newItemCount, orderType) {
      // (상품이름, 추가상품 체크한지 안한지 숫자로, products or options)
      // state를 바로 갱신하면 x
      // 리랜더링을 위해 주소복사
      const newOrderContents = { ...orderCounts };

      //products or options ?
      const orderCountsMap = orderCounts[orderType];
      // map에서 값을 밀어 넣기 위해서 ! set(키, 값)
      // (이름, 갯수(숫자))
      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCounts(newOrderContents);
    }

    // [{} 객체 , 기능(fn)]이 담긴 상태 (나중에 쓰려고)
    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts, totals]);
  // 밖에서 전달할 값 updateItemCount("Good1", 1, products)
  // 밖에서 전달할 값 updateItemCount("Good1", 1, options)

  return <OrderContext.Provider value={value} {...props} />;
}
