import React, { useState, useEffect } from "react";
import { db } from "../conexion/firebase";
import { collection, addDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AddProduct() {
  const [product, setProduct] = useState({
    id: null,
    codigo: "",
    categoria: "",
    descripcion: "",
    imagen: null,
    precio: "",
    stock: "",
    titulo: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [muestraImages, setMuestraImages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.item) {
      setProduct(location.state.item);
    }
  }, [location.state]);

  const handleProductChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, imagen: file });
  };

  const notify = () => {
    toast.error("Este producto ya existe!", {
      position: "top-center",
    });
  };

  const handleMuestraImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    const updatedMuestraImages = [...muestraImages];
    updatedMuestraImages[index] = files[0];
    setMuestraImages(updatedMuestraImages);
  };

  const uploadMuestraImages = async (producto_id) => {
    const storage = getStorage();
    for (let i = 0; i < muestraImages.length; i++) {
      const image = muestraImages[i];
      if (image) {
        const storageRef = ref(storage, `imagenes_muestra/${image.name}`);
        await uploadBytes(storageRef, image);
        const imagen = await getDownloadURL(storageRef);

        await addDoc(collection(db, "imagenes"), {
          producto_id: producto_id,
          imagen: imagen,
        });
      }
    }
  };

  const checkCodigoExists = async (codigo) => {
    const q = query(collection(db, "productos"), where("codigo", "==", codigo));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const codigoExists = await checkCodigoExists(product.codigo);

      if (codigoExists && !product.id) {
        setError("El código del producto ya existe. Elige otro código.");
        notify(); // Mostrar notificación si el código ya existe
        return;
      }

      let imageUrl = product.imagen;

      if (typeof product.imagen === "object") {
        const storage = getStorage();
        const storageRef = ref(storage, `imagenes/${product.imagen.name}`);
        await uploadBytes(storageRef, product.imagen);
        imageUrl = await getDownloadURL(storageRef);
      }

      let productId;
      if (product.id) {
        await updateDoc(doc(db, "productos", product.id), {
          ...product,
          imagen: imageUrl,
        });
        productId = product.id;
        setMessage("Producto actualizado exitosamente");
      } else {
        const newProduct = await addDoc(collection(db, "productos"), {
          ...product,
          imagen: imageUrl,
        });
        productId = newProduct.id;
        setProduct({ ...product, id: productId });
        setMessage("Producto agregado exitosamente");
      }

      if (muestraImages.length > 0) {
        await uploadMuestraImages(productId);
      }

      navigate("/productos");
    } catch (error) {
      console.error("Error al guardar el producto: ", error);
      setMessage("Error al guardar el producto");
    }
  };

  return (
    <div className="add-product-container">
      <h2>{product.id ? "Editar Producto" : "Agregar Producto"}</h2>
      <form onSubmit={handleProductSubmit} className="product-form">
        <label>
          Código
          <input
            type="text"
            name="codigo"
            onChange={handleProductChange}
            value={product.codigo}
            placeholder="Código del producto"
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <label>
          Categoría
          <select
            name="categoria"
            onChange={handleProductChange}
            value={product.categoria}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Eléctricos">ELECTRICO</option>
            <option value="Mecánicos">MECANICA</option>
            <option value="Electrónicos">ELECTRONICA</option>
            <option value="Aspersión">ASPERSIÓN</option>
            <option value="Hidráulicos">HIDRAULICA</option>
          </select>
        </label>
        <label>
          Descripción
          <input
            type="text"
            name="descripcion"
            onChange={handleProductChange}
            value={product.descripcion}
            placeholder="Descripción del producto"
            required
          />
        </label>
        <label>
          Título del Producto
          <input
            type="text"
            name="titulo"
            onChange={handleProductChange}
            value={product.titulo}
            placeholder="Título del producto"
            required
          />
        </label>
        <label>
          Precio
          <input
            type="number"
            name="precio"
            onChange={handleProductChange}
            value={product.precio}
            placeholder="Precio"
            required
          />
        </label>
        <label>
          Stock
          <input
            type="number"
            name="stock"
            onChange={handleProductChange}
            value={product.stock}
            placeholder="Cantidad en stock"
            required
          />
        </label>
        <label>
          Imagen del Producto
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <label>
          Imágenes de Muestra
          {[0, 1, 2].map((index) => (
            <input
              key={index}
              type="file"
              accept="image/*"
              onChange={(e) => handleMuestraImageChange(e, index)}
            />
          ))}
        </label>

        <button type="submit">
          {product.id ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
