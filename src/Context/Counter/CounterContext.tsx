import { ReactNode, createContext, useState } from "react";

//  context
const CounterContext = createContext<
  | {
      count: number;
      increment: () => void;
      decrement: () => void;
    }
  | undefined
>(undefined);

const CounterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {" "}
      {children}
    </CounterContext.Provider>
  );
};

export { CounterProvider, CounterContext };
