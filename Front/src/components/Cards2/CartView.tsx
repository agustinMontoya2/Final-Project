"use client";
import { useEffect, useState } from "react";
import {
  addCart,
  getCart,
  removeQuantityCart,
  removeProductCart,
} from "@/Helpers/cart";
import { postOrder } from "@/Helpers/order";
import Image from "next/image";
import { ICart, IOrder } from "@/interfaces/productoInterface";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { PagoMercado } from "@/Helpers/MercadoPago";
import Link from "next/link";

const CartView = () => {
  const [cartItems, setCartItems] = useState<ICart>({
    cart_id: "",
    note: "",
    product: [],
    productDetail: [],
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [totalCart, setTotalCart] = useState<number>(0);
  const [note, setNote] = useState<string>("");
  const [deliveryOption, setDeliveryOption] = useState<string>("dine-in");
  const [paymentOption, setPaymentOption] = useState<string>("cash");
  const [address, setAddress] = useState<string>("");
  const [showCouponModal, setShowCouponModal] = useState<boolean>(false);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [totalWithDiscount, setTotalWithDiscount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storeUserData = window.localStorage.getItem("userSession");
      if (storeUserData) {
        const parseData = JSON.parse(storeUserData);
        if (parseData && parseData.user) 
        setUserId(parseData.user.user_id);
        setToken(parseData.token);
      }
    }
  }, []);

  const handleGetCart = async () => {
    if (userId && token) {
      try {
        const items = await getCart(userId, token);
        setCartItems(items);
        calculateTotal(items);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
        alert("Error al obtener el carrito.");
      }
    } else {
      alert("Log in to view the cart.");
    }
  };

  const calculateTotal = (items: ICart) => {
    if (items && items.productDetail) {
      const total = items.productDetail.reduce(
        (acc, item) => acc + parseFloat(item.subtotal),
        0
      );
      setTotalCart(total);
    } else {
      setTotalCart(0);
    }
  };

  useEffect(() => {
    if (totalCart > 0) {
      if (discountApplied) {
        const discount = totalCart * 0.1;
        setTotalWithDiscount(totalCart - discount);
      } else {
        setTotalWithDiscount(totalCart);
      }
    }
  }, [totalCart, discountApplied]);

  const handleDeleteQuantityCart = async (product_detail_id: string) => {
    if (userId && token) {
      try {
        const response = await removeQuantityCart(product_detail_id, token);
        if (response) {
          await handleGetCart();
        } else {
          alert("Failed to delete the product from the cart.");
        }
      } catch (error) {
        console.error(
          `Error: ${error instanceof Error ? error.message : error}`
        );
        Swal.fire({
          title: 'To remove a product from the cart, click the trash icon',
          icon: 'error',
        });
      }
    }
  };

  const handleDeleteProductCart = async (product_detail_id: string) => {
    if (userId && token) {
      try {
        const response = await removeProductCart(product_detail_id, token);
        Swal.fire({
          icon: "success",
          title: "Product removed",
          toast: true,
          position: "top-end",
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        if (response) {
          await handleGetCart();
        } else {
          alert("Failed to delete the product from the cart.");
        }
      } catch (error) {
        console.error(
          `Error: ${error instanceof Error ? error.message : error}`
        );
        Swal.fire({
          title: 'To remove a product from the cart, click the trash icon',
          icon: 'error',
        });
      }
    }
  };

  const handleAddCart = async (productId: string) => {
    if (token && userId) {
      try {
        await addCart(userId, productId, token);
        await handleGetCart();
      } catch (error) {
        alert(`Error: ${error instanceof Error ? error.message : error}`);
        console.error("Error to add product to cart");
      }
    } else {
      alert("Log in to add product to the cart.");
    }
  };

  const handlePostOrder = async () => {
    if (!cartItems.productDetail.length) {
      Swal.fire({
        icon: "error",
        title: "Your cart is empty. Add products before finalizing the order.",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      return;
    }
    if (!userId) {
      alert("User ID is missing. Please log in.");
      return;
    }
    if (deliveryOption === "delivery" && !address) {
      Swal.fire({
        icon: "error",
        title: "Please enter your delivery address before proceeding.",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      return;
    }
    if (token && deliveryOption && paymentOption) {
      const orderData: IOrder = {
        user_id: userId,
        order_type: deliveryOption,
        payment_method: paymentOption,
        note,
        address: deliveryOption === "delivery" ? address : undefined,
        discount: discountApplied ? totalCart * 0.1 : 0,
        date: new Date().toISOString()
      };
      

      //* LA FUNCION EMPIEZA ACA
      try {
        if (paymentOption === "card") {
          const data = await PagoMercado(userId, token, orderData);
          if (data && data.init_point) {
            window.location.href = data.init_point;
          } else {
            alert("Error initiating payment with MercadoPago.");
          }
        }
        if (paymentOption === "cash") {
          const response = await postOrder(orderData, token);
   
          if (response) {
            await handleGetCart();
            const purchasedProductIds: string[] = cartItems.productDetail.map(item => item.product.product_id);
            const storedProductIds: string[] = JSON.parse(localStorage.getItem('purchasedProductIds') || '[]');
            const updatedProductIds: string[] = Array.from(new Set([...storedProductIds, ...purchasedProductIds]));
            localStorage.setItem('purchasedProductIds', JSON.stringify(updatedProductIds));
            Swal.fire({
              icon: "success",
              title: "Thank you for your purchase!",
              toast: true,
              position: "top-end",
              timer: 2500,
              showConfirmButton: false,
              timerProgressBar: true,
            });
            setNote("");
          }
        } else {
          // Swal.fire({
          //   icon: "success",
          //   title: "Failed to create order",
          //   toast: true,
          //   position: "top-end",
          //   timer: 2500,
          //   showConfirmButton: false,
          //   timerProgressBar: true,
          // });
          console.log("Invalid payment option");
        }
      } catch (error) {
        throw new Error(`Error: ${error instanceof Error ? error.message : error}`);
      }
    }
  };


  useEffect(() => {
    if (userId && token) {
      handleGetCart();
    }
  }, [userId, token]);

  const handleFinishOrder = () => {
    router.push("/menu");
  };

  const handleCouponApply = (e: React.FormEvent) => {
    e.preventDefault();
    const couponInput = (e.target as HTMLFormElement).querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    if (couponInput.value === "FELLINI10OFF" && !discountApplied) {
      setDiscountApplied(true);
      setShowCouponModal(false);
    } else {
      alert("Invalid coupon code.");
    }
  };


  const modalCupon = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <h2 className="text-lg font-bold text-neutral-800">
            Enter your coupon code
          </h2>
          <form onSubmit={handleCouponApply}>
            <input
              type="text"
              placeholder="Código del cupón"
              className="text-neutral-800 border outline-none border-gray-300 p-2 rounded mt-2 w-full"
            />
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setShowCouponModal(false)}
                className="bg-secondary text-white rounded px-4 py-2 hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="w-m-auto flex flex-col items-center justify-center md:min-h-screen py-8 ">
      <h1 className="text-3xl font-bold text-black mb-6">Cart</h1>
      {cartItems?.productDetail.length === 0 ? (
        <div className='flex flex-col items-center'>
          <p className="text-lg text-gray-700">Your cart is empty.</p>
          <Link href="/menu" className='text-blue-700 p-4 m-2'>Wanna order something? Do not be shy, get yourself something yummy!</Link>
        </div>
      ) : (
        <div className="md:w-1/2 w-96">
          <ul className="bg-white shadow-lg rounded-lg w-full">
            {cartItems?.productDetail.map((item) => (
              <li
                key={item.product_detail_id}
                className="flex items-center justify-between p-6 border-b border-gray-300"
              >
                <div className="flex items-center">
                  <Image
                    src={item.product.image_url}
                    alt={item.product.product_name}
                    width={120}
                    height={120}
                    className="mr-6 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-black">
                      {item.product.product_name}
                    </h2>
                    <p className="text-gray-600">
                      Price:
                      <span className="font-bold"> ${item.product.price}</span>
                    </p>
                    <div className="w-24 flex justify-center border text-lg text-neutral-800">
                      <button
                        onClick={() =>
                          handleDeleteQuantityCart(item.product_detail_id)
                        }
                        className="w-1/3 flex justify-center hover:bg-neutral-200"
                      >
                        -
                      </button>
                      <span className="w-1/3 flex justify-center font-bold">{parseInt(item.quantity)}</span>
                      <button
                        className="w-1/3 flex justify-center hover:bg-neutral-200"
                        onClick={() => handleAddCart(item.product.product_id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleDeleteProductCart(item.product_detail_id)
                    }
                    className="text-white font-bold w-16 rounded-lg transition duration-300"
                  >
                    <Image
                      src={"/assets/icon/trashred.png"}
                      width={30}
                      height={30}
                      alt="trash"
                    />
                  </button>
                </div>
              </li>
            ))}
            <span className="flex justify-between p-6">
              <div>
                <p className="text-lg font-semibold text-black">
                  Total:{" "}
                  <span className="font-bold">${totalCart.toFixed(2)}</span>
                </p>
                {discountApplied && (
                  <p className="text-lg font-semibold text-black">
                    Total after discount:{" "}
                    <span className="font-bold text-red-600">
                      ${totalWithDiscount.toFixed(2)}
                    </span>
                  </p>
                )}
                
              </div>
            </span>
          </ul>
          <div className="mt-6">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-24 max-h-56 min-h-16 p-3 border border-gray-300 text-neutral-800 rounded-lg focus:outline-red-600"
              placeholder="Any special instructions or notes?"
            />
            <h3 className="mt-6 font-semibold text-lg text-black">
              Delivery Options
            </h3>
            <div className="flex mt-2">
              <label className="flex items-center text-neutral-800">
                <input
                  type="radio"
                  value="dine-in"
                  checked={deliveryOption === "dine-in"}
                  onChange={(e) => {
                    setDeliveryOption(e.target.value);
                    setAddress("");
                  }}
                  className="mr-2"
                />
                Take Away
              </label>
              <label className="flex items-center text-neutral-800 ml-5">
                <input
                  type="radio"
                  value="delivery"
                  checked={deliveryOption === "delivery"}
                  onChange={(e) => {
                    setDeliveryOption(e.target.value);
                  }}
                  className="mr-2"
                />
                Delivery
              </label>
            </div>

            {deliveryOption === "delivery" && (
              <div className="mt-4 relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                  required
                />
                <label
                  htmlFor="delivery"
                  className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${address ? "top-[4px] text-xs" : ""
                    }`}
                >
                  Enter your delivery address
                </label>
              </div>
            )}

            <h3 className="mt-6 font-semibold text-lg text-black">
              Payment Method
            </h3>
            <div className="flex mt-2">
              <label className="flex items-center text-neutral-800">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentOption === "cash"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="mr-2"
                />
                Cash
              </label>
              <label className="flex items-center text-neutral-800 ml-5">
                <input
                  type="radio"
                  value="card"
                  checked={paymentOption === "card"}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="mr-2"
                />
                Card
              </label>
            </div>
            <div className="w-full flex justify-between mt-6">
              <button
                onClick={handleFinishOrder}
                className="bg-secondary text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Continue Shopping
              </button>
              {paymentOption === "card" ? (
                <button
                  onClick={handlePostOrder}
                  className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Pay with card
                </button>
              ) : (
                <button
                  onClick={handlePostOrder}
                  className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Finalize Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {showCouponModal && modalCupon()}
    </div>
  );
};

export default CartView;
