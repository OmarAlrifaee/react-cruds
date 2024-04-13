import { createPortal } from "react-dom";
const CreateProduct = ({
  state,
  dispatch,
  setPopup,
  setProducts,
  products,
  setAll,
}) => {
  // functions
  const hundleCreate = () => {
    if (state.title && state.category && state.desc && state.price) {
      setProducts([...products, { ...state, id: new Date().getTime() }]);
      // edit the all products price
      setAll((prevAll) => prevAll + +state.price);
      // reset the inputs state
      dispatch({ type: "RESET" });
      // close the popup
      setPopup(false);
    }
  };
  return createPortal(
    <div className="container p-5 absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-slate-800 max-w-[500px] max-h-[400px]">
      <h2 className="text-white font-extrabold md:text-4xl text-lg mx-auto text-center py-5 capitalize">
        create your product
      </h2>
      <div className="flex md:justify-between justify-center md:gap-0 gap-3 items-center mt-3 md:flex-nowrap flex-wrap">
        <input
          type="text"
          autoFocus
          placeholder="Title"
          className=" outline-none border-none focus:outline-none bg-slate-200 p-2 rounded-lg font-bold"
          value={state.title}
          onChange={(e) =>
            dispatch({ type: "TITLE", ...state, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descreption"
          className=" outline-none border-none focus:outline-none bg-slate-200 p-2 rounded-lg font-bold"
          value={state.desc}
          onChange={(e) =>
            dispatch({ type: "DESC", ...state, desc: e.target.value })
          }
        />
      </div>
      <div className="flex md:justify-between justify-center md:gap-0 gap-3 items-center mt-3 md:flex-nowrap flex-wrap">
        <input
          type="text"
          placeholder="Category"
          className=" outline-none border-none focus:outline-none bg-slate-200 p-2 rounded-lg font-bold"
          value={state.category}
          onChange={(e) =>
            dispatch({ type: "CATEGORY", ...state, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className=" outline-none border-none focus:outline-none bg-slate-200 p-2 rounded-lg font-bold"
          value={state.price}
          onChange={(e) =>
            dispatch({ type: "PRICE", ...state, price: e.target.value })
          }
        />
      </div>
      <div className="flex justify-center gap-3 items-center mt-5">
        <button
          className="bg-purple-500 hover:bg-purple-950 capitalize transition-all duration-[0.3s] p-2 rounded-lg font-bold text-white"
          onClick={hundleCreate}
        >
          Create
        </button>
        <button
          className=" bg-red-400 hover:bg-red-950 capitalize transition-all duration-[0.3s]  p-2 rounded-lg font-bold text-white"
          onClick={() => {
            setPopup(false);
            dispatch({ type: "RESET" });
          }}
        >
          cancel
        </button>
      </div>
    </div>,
    document.getElementById("popup")
  );
};

export default CreateProduct;
