'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FormValues } from '@/interfaces/productoInterface';
import { getProduct } from '@/Helpers/products.helper';


const ModifyDishes = () => {
  const [admin, setAdmin] = useState<boolean | undefined>(undefined);
  const [formValues, setFormValues] = useState<FormValues>({
      name: '',
      descripcion: '',
      price: '',
      imagen: null,
  });
  const router = useRouter();
  const dishId = "string"; // Aquí debes obtener el ID del plato que se va a modificar.

  useEffect(() => {
      const storedUserData = window.localStorage.getItem("userSession");
      if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          if (parsedData && parsedData.user) {
              setAdmin(parsedData.admin);
          }
      }
  }, []);

  useEffect(() => {
      if (admin === false || admin === true) {
          if (!admin) {
              router.push('/menu');
          }
      }
  }, [admin]);

  useEffect(() => {
      // Obtener los datos del plato a modificar
      const fetchDish = async () => {
        try {
            const product = await getProduct(dishId); // Llama a la función getProduct
            setFormValues({
                name: product.name,
                descripcion: product.descripcion,
                price: product.price,
                imagen: null, // No cargamos la imagen aquí, solo mostramos el nombre
            });
        } catch (error) {
            console.error('Error al obtener el plato:', error);
        }
    };
    fetchDish();
}, [dishId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormValues({
          ...formValues,
          [name]: value,
      });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
          setFormValues({
              ...formValues,
              imagen: e.target.files[0],
          });
      }
  };

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('nombre', formValues.name);
      formData.append('descripcion', formValues.descripcion);
      formData.append('precio', formValues.price);
      if (formValues.imagen) {
          formData.append('imagen', formValues.imagen);
      }

      try {
          const response = await fetch(`/api/menus/${dishId}`, {
              method: 'PUT',
              body: formData,
          });

          if (response.ok) {
              alert('Plato modificado correctamente!');
          } else {
              alert('Error al modificar el plato');
          }
      } catch (error) {
          console.error('Error al enviar el formulario:', error);
          alert('Ocurrió un error al intentar modificar el plato');
      }
  };

  return (
      <div className="absolute inset-0 flex items-center justify-center">
          <form className="w-11/12 bg-neutral-300 p-6 rounded-lg flex flex-col justify-center items-center" onSubmit={handleSubmit}>
              <h2 className="w-full text-xl text-center text-neutral-800 font-extrabold">Modificar plato</h2>
              <div className="w-4/5 mb-6 relative">
                  <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      placeholder="Name"
                      value={formValues.name}
                      onChange={handleChange}
                      className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                      required
                  />
                  <label
                      htmlFor="nombre"
                      className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                          formValues.name ? 'top-[4px] text-xs' : ''
                      }`}
>
                      Name
                  </label>
              </div>
              <div className="w-4/5 mb-6 relative">
                  <textarea
                      name="descripcion"
                      id="descripcion"
                      placeholder="Description"
                      value={formValues.descripcion}
                      onChange={handleChange}
                      className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                      required
                  />
                  <label
                      htmlFor="descripcion"
                      className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                          formValues.descripcion ? 'top-[4px] text-xs' : ''
                      }`}
                  >
                      Description
                  </label>
              </div>
              <div className="w-4/5 mb-6 relative">
                  <input
                      type="number"
                      name="precio"
                      id="precio"
                      placeholder="Price"
                      value={formValues.price}
                      onChange={handleChange}
                      className="text-neutral-700 bg-transparent border-b-2 border-gray-400 focus:border-red-600 focus:outline-none w-full pt-4 pb-1"
                      required
                  />
                  <label
                      htmlFor="precio"
                      className={`absolute left-0 top-4 transition-all duration-200 text-gray-600 ${
                          formValues.price ? 'top-[4px] text-xs' : ''
                      }`}
                  >
                      Price
                  </label>
              </div>
              <div className="w-4/5 mb-6 relative">
                  <label htmlFor="imagen" className="w-full flex flex-col items-center p-4 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                      <span className="text-gray-600">Click to upload an image</span>
                      {formValues.imagen ? (
                          <span className="mt-2 text-gray-700">{formValues.imagen.name}</span>
                      ) : (
                          <span className="mt-2 text-gray-500 text-sm">No file selected</span>
                      )}
                  </label>
                  <input id="imagen" type="file" onChange={handleFileChange} className="hidden" required />
              </div>

              <button
                  type="submit"
                  className="w-4/5 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                  Modificar plato
              </button>
          </form>
      </div>
  );
};

export default ModifyDishes;
