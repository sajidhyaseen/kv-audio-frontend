import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaCirclePlus, FaEye } from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemsLoaded) {
      api
        .get("/api/products")
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setItemsLoaded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [itemsLoaded]);

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.key !== key));
    }
    api
      .delete(`/api/products/${key}`)
      .then((res) => {
        console.log(res.data);
        setItemsLoaded(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleView = (productId) => {
    navigate(`/admin/items/view/${productId}`);
  };

  return (
    <div className="w-full h-full p-6 flex flex-col items-center">
      {!itemsLoaded && (
        <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-16 h-16" />
      )}
      {itemsLoaded && (
        <div className="overflow-x-auto w-full max-w-9xl">
          <table className="w-full min-w-max border border-gray-300 rounded-lg shadow-md bg-white">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="py-3 border px-4">Key</th>
                <th className="py-3 border px-4">Name</th>
                <th className="py-3 border px-4">Price</th>
                <th className="py-3 border px-4">Stock</th>
                <th className="py-3 border px-4">Category</th>
                <th className="py-3 border px-4">Dimensions</th>
                <th className="py-3 border px-4">Availability</th>
                <th className="py-3 border px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.key} className="border-b">
                  <td className="px-3 py-3 text-white">{product.key}</td>
                  <td className="px-3 py-3 text-white">{product.name}</td>
                  <td className="px-3 py-3 text-white">Rs. {product.price}</td>
                  <td className="px-3 py-3 text-white">{product.stock ?? 1}</td>
                  <td className="px-3 py-3 text-white">{product.category}</td>
                  <td className="px-3 py-3 text-white">{product.dimensions}</td>
                  <td className="px-3 py-3 text-white">
                    {product.availability ? (
                      <span className="text-green-500 bg-green-50 font-semibold px-2 py-1 rounded">Available</span>
                    ) : (
                      <span className="text-red-500 bg-red-50 font-semibold px-2 py-1 rounded">Out of Stock</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="text-white hover:text-black font-semibold px-2 py-1 rounded bg-blue-500"
                      onClick={() => {
                        navigate('/admin/items/edit', { state: product });
                      }}
                    >
                      <FaEdit className="inline mr-1" /> Edit
                    </button>
                    <button
                      className="ml-3 text-white hover:text-black font-semibold px-2 py-1 rounded bg-red-500"
                      onClick={() => handleDelete(product.key)}
                    >
                      <FaTrashAlt className="inline mr-1" /> Delete
                    </button>
                    <button
                      className="ml-3 text-white hover:text-black font-semibold px-2 py-1 rounded bg-green-500"
                      onClick={() => handleView(product.key)}
                    >
                      <FaEye className="inline mr-1" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link
        to="/admin/items/add"
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
      >
        <FaCirclePlus className="text-3xl" />
      </Link>
    </div>
  );
}
