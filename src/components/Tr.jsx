import { AnimatePresence, motion } from "framer-motion";
const Tr = ({
  products,
  setProducts,
  search,
  dispatch,
  setPopup,
  setAll,
  all,
}) => {
  // functions
  const hundledelete = (index) => {
    const newProducts = [...products];
    // update the all products price
    setAll(all - +newProducts[index]?.price);
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };
  const hundleEdit = (index) => {
    const newProducts = [...products];
    // make a new object contains the current product
    const currentProduct = newProducts[index];
    // set the valus state to the current product values
    dispatch({
      type: "EDIT",
      title: currentProduct.title,
      desc: currentProduct.desc,
      category: currentProduct.category,
      price: currentProduct.price,
    });
    // update the all products price
    setAll(all - +currentProduct.price);
    // open the create products popup
    setPopup(true);
    // remove the current product from the products array
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };
  return (
    <AnimatePresence mode="wait">
      {products
        .filter(({ title }) =>
          title.toLowerCase().includes(search.toLowerCase())
        )
        .map(({ id, title, category, desc, price }, index) => (
          <motion.tr
            className="font-semibold capitalize origin-left"
            key={id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <td className="p-5">{title}</td>
            <td className="p-5 max-w-[300px] text-left">{desc}</td>
            <td className="p-5">${price}</td>
            <td className="p-5">{category}</td>
            <td className="flex items-center justify-center gap-4 p-5">
              <button
                className="p-2 rounded-lg transition-all duration-[0.3s] font-bold text-white bg-yellow-500 hover:bg-yellow-950 capitalize"
                onClick={() => hundleEdit(index)}
              >
                edit
              </button>
              <button
                className="p-2 rounded-lg transition-all duration-[0.3s] font-bold text-white bg-red-600 hover:bg-red-950 capitalize"
                onClick={() => hundledelete(index)}
              >
                delete
              </button>
            </td>
            <td className="p-5">---</td>
          </motion.tr>
        ))}
    </AnimatePresence>
  );
};

export default Tr;
