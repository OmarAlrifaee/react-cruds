import { useEffect, useReducer, useState } from "react";
import CreateProduct from "./CreateProduct";
import Tr from "./Tr";
const initState = {
  title: "",
  desc: "",
  price: "",
  category: "",
};
const initAction = {
  ...initState,
  type: "",
};
const Reducer = (state, action = initAction) => {
  switch (action.type) {
    case "TITLE":
      return {
        ...state,
        title: action.title,
      };
    case "DESC":
      return {
        ...state,
        desc: action.desc,
      };
    case "PRICE":
      return {
        ...state,
        price: action.price,
      };
    case "CATEGORY":
      return {
        ...state,
        category: action.category,
      };
    case "EDIT":
      return {
        title: action.title,
        desc: action.desc,
        price: action.price,
        category: action.category,
      };
    case "RESET":
      return initState;
    default:
      return state;
  }
};
const Home = ({ products, setProducts }) => {
  const [state, dispatch] = useReducer(Reducer, initState),
    [popup, setPopup] = useState(false),
    [search, setSearch] = useState(""),
    [all, setAll] = useState(
      JSON.parse(localStorage.getItem("all-products-price")) || 0
    );
  // save the products price in the local storage
  useEffect(
    () => localStorage.setItem("all-products-price", JSON.stringify(all)),
    [all]
  );
  return (
    <div className="min-h-[100vh] bg-slate-400 p-5">
      <div className="container mx-auto xl:px-4 px-2">
        <h1 className="md:text-[80px] text-[60px] font-bold text-white uppercase text-center mx-auto mt-5">
          cruds app
        </h1>
        <button
          className=" p-3 bg-blue-400 font-bold text-[30px] mt-3 rounded-xl capitalize transition-all duration-[0.3s] hover:bg-blue-950 mx-auto text-white block"
          onClick={() => setPopup(true)}
        >
          create product
        </button>
        {products.length > 0 && (
          <div className="mt-12 flex md:flex-row flex-col md:gap-0 gap-3 md:justify-between justify-center items-center">
            <input
              type="search"
              className="outline-none border-none focus:outline-none bg-slate-200 p-2 rounded-lg font-bold"
              placeholder="Search By Title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className=" bg-red-500 hover:bg-red-950 px-3 py-2 text-white text-lg font-bold capitalize transition-all duration-[0.3s] rounded-xl"
              onClick={() => {
                setProducts([]);
                setAll(0);
              }}
            >
              delete all
            </button>
          </div>
        )}
        {popup && (
          <div className=" fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-80 z-10"></div>
        )}
        {popup && (
          <CreateProduct
            state={state}
            dispatch={dispatch}
            setPopup={setPopup}
            setProducts={setProducts}
            products={products}
            setAll={setAll}
          />
        )}
        <div className="overflow-x-auto">
          <table className="w-full mt-10 bg-white rounded-[20px]">
            <thead className="text-center">
              <tr>
                <th className="p-5 text-lg capitalize">title</th>
                <th className="p-5 text-lg capitalize">descreption</th>
                <th className="p-5 text-lg capitalize">price</th>
                <th className="p-5 text-lg capitalize">category</th>
                <th className="p-5 text-lg capitalize">actions</th>
                <th className="p-5 text-lg capitalize">all: ${all}</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <Tr
                products={products}
                setProducts={setProducts}
                search={search}
                dispatch={dispatch}
                setPopup={setPopup}
                setAll={setAll}
                all={all}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
