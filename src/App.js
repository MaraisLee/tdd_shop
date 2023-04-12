import Order from "./pages/order/Order";
import { OrderContextProvider } from "./context/OrderContext";
function App() {
  return (
    <OrderContextProvider>
      <Order />
    </OrderContextProvider>
  );
}

export default App;
