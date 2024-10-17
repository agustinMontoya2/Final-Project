import React from "react";
import { getProductsDB, getProductsDBdetail } from "@/helpers/products.helper";

const Cards = async () => {
  const products = await getProductsDB();
  console.log(products)
  

  const handleAddToCart = async () => {
    await console.log("se hizo click") 
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-black flex justify-center text-center">Menu</h1>
      <div className="flex flex-wrap">
        {products.map((products) => (
          <div
            key={products.product_id}
            className="flex items-center bg-third p-4 rounded-sm shadow-md m-1 w-full md:w-1/2 lg:w-1/3 relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-2 hover:after:bg-gradient-to-r hover:after:from-blue-500 hover:after:to-purple-500 hover:after:bottom-0 hover:after:left-0 hover:after:blur-md hover:after:opacity-100 hover:after:transition-all"
          >
            <img
              src={products.image_url}
              alt={products.name}
              className="w-32 h-32 object-cover rounded-lg mr-4"
            />
            <div>
              <h2 className="text-black text-xl font-semibold">{products.name}</h2>
              <p className="text-black text-sm font-semibold">{products.description}</p>
              <p className="text-black">Price: ${products.price}</p>
            </div>
            <div>
              <button
                className="bg-secondary"
                onClick={handleAddToCart}>Cart

              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;