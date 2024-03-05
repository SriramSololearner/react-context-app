import { createContext, ReactNode, useEffect, useState } from "react";

interface Istate {
  products: {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    stock: number;
    images: string[];
    brand: string;
    category: string;
    rating: number;
  }[];

  state: {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    stock: number;
    images: string[];
    brand: string;
    category: string;
    rating: number;
  }[];

  cartList: {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    stock: number;
    images: string[];
    brand: string;
    category: string;
    rating: number;
    qty: number;
  }[];
}

const Context = createContext<
  | {
      products: Istate["products"];
      setProducts: (products: any) => void;
      state: Istate["state"];
      setState: (state: any) => void;
      cartList: Istate["cartList"];
      setCartList: (cartList: any) => void;
      handleAddCart: (product: any, ind: number) => void;
      Inc: (id: number) => void;
      Dec: (id: number) => void;
      RemoveProduct(id: number): void;
      index: number | null;
    }
  | undefined
>(undefined);

const ContextData: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Istate["products"]>([]);
  const [state, setState] = useState<Istate["state"]>([]);
  const [cartList, setCartList] = useState<Istate["cartList"]>([]);
  const [index, setIndex] = useState<number | null>(null);

  // Add to Cart
  const handleAddCart = (product: any, ind: number) => {
    setIndex(ind);
    // console.log(ind, index)
    let cartData = cartList.filter((EachOne) => EachOne.id === product.id);

    if (cartData.length === 0) {
      setCartList([...cartList, { ...product, qty: 1 }]);
    }
  };

  // Inc qty
  function Inc(id: number) {
    let newData = cartList.map((obj) => {
      if (obj.id === id) {
        obj.qty += 1;
      }
      return obj;
    });
    setCartList(newData);
  }

  // dec Qty
  function Dec(id: number) {
    let newData = cartList.map((obj) => {
      if (obj.id === id && obj.qty > 1) {
        obj.qty -= 1;
      }

      return obj;
    });

    // newData = newData.filter((obj) => obj.qty > 1)

    setCartList(newData);
  }

  function RemoveProduct(productId: number) {
    let newObj = cartList.filter((itm) => itm.id !== productId);
    setCartList(newObj);
  }

  function AddData(data: any) {
    setProducts([...products, data]);
  }

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        state,
        setState,
        cartList,
        setCartList,
        handleAddCart,
        Inc,
        Dec,
        RemoveProduct,
        index,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextData };
