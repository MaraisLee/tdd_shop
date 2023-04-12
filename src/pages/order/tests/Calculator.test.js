// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import { OrderContextProvider } from "../../../context/OrderContext";
import Type from "../Type";

// 상품 가격을 위한 테스트
// 제품은 1000원, 옵션 500원
test("제품 가격 계산 테스트", async () => {
  render(<Type orderType="products" />);
  // 상품의 총 가격
  // 글자를 읽어서 비교할 때 정말 똑같지 않아도 됨을 설정
  const productsTotal = screen.getByText("총 가격 :", { exact: false });
  expect(productsTotal).toHaveTextContent("0");
  // 제품 1개 추가
  // spinbutton :  input type="number"
  const good1 = await screen.findByRole("spinbutton", {
    name: "Good1",
  });
  // https://testing-library.com/docs/user-event/intro
  // input 또는 textarea 의 글자를 write처리 이벤트 강제실행.
  // 자주 userEvent 를 사용할 것이므로
  // 먼저 userEvent.clear() 작성후 사용 권장
  userEvent.clear(good1);
  userEvent.type(good1, "1");
  // 총 1개의 상품 쪽에서만 총 가격이 1000이라면 통과
  expect(productsTotal).toHaveTextContent("1000");
});
