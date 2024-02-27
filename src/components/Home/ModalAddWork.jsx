import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import svgClose from "../../svg/svgClose";
import buttonStyle from "../../exportStyles/buttonStyle";

const ModalAddWork = ({
  number,
  month,
  handleIsWorkOpen,
  isWorkOpen,
  fetchData,
}) => {
  const [additionalStyle, setAdditionalStyle] = useState("-translate-x-full");
  const [trabajoData, setTrabajoData] = useState({
    trabajo: "",
    ubicacion: "",
    cliente: "",
    numero: 0,
    empleados: {
      juan: false,
      mono: false,
      cacho: false,
      joni: false,
      jose: false,
    },
    presupuesto: "",
    comentario: "",
  });

  useEffect(() => {
    if (isWorkOpen === true) {
      setAdditionalStyle("");
    } else {
      setAdditionalStyle("-translate-x-full");
    }
  }, [isWorkOpen]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setTrabajoData((prevData) => ({
        ...prevData,
        empleados: {
          ...prevData.empleados,
          [id]: checked,
        },
      }));
    } else {
      setTrabajoData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const trabajosCollectionRef = collection(
        firestore,
        `trabajos-para-${number}-de-${month}`
      );

      const nuevoTrabajoDocRef = doc(trabajosCollectionRef);

      const trabajoConId = {
        ...trabajoData,
        id: nuevoTrabajoDocRef.id,
      };

      await addDoc(trabajosCollectionRef, trabajoConId);

      fetchData();
      handleIsWorkOpen();
    } catch (error) {
      console.error("Error al agregar trabajo:", error);
    }
  };

  //probar como se puede guardar el id de firebase en id: de arriba

  return (
    <div
      className={`absolute w-full h-screen p-10 top-0 left-0 z-40 ease-out duration-500 bg-grey ${additionalStyle}`}
    >
      <div
        className="top-5 right-5 absolute cursor-pointer"
        onClick={handleIsWorkOpen}
      >
        {svgClose}
      </div>
      <div>
        <h2 className="text-white text-center pb-5">
          {number} de {month}
        </h2>

        <form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-3 text-white w-full text-lg">
            <div className="flex flex-col">
              <label htmlFor="trabajo">Trabajo:</label>
              <input
                required
                className="rounded p-1  text-darkGrey bg-lightGrey"
                type="text"
                id="trabajo"
                value={trabajoData.trabajo}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="ubicacion">Ubicación:</label>
              <input
                required
                className="rounded p-1 text-darkGrey bg-lightGrey"
                type="text"
                id="ubicacion"
                value={trabajoData.ubicacion}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cliente">Nombre del cliente:</label>
              <input
                required
                className="rounded p-1 text-darkGrey bg-lightGrey"
                type="text"
                id="cliente"
                value={trabajoData.cliente}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="numero">Número:</label>
              <input
                required
                className="rounded p-1 text-darkGrey bg-lightGrey"
                type="number"
                id="numero"
                value={trabajoData.numero}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col items-center ">
              <label>Empleados:</label>
              <div className="flex flex-wrap gap-5 bg-lightGrey p-1 justify-center items-center text-darkGrey w-1/2 rounded">
                {Object.entries(trabajoData.empleados).map(([key, value]) => (
                  <div className="flex justify-center gap-1" key={key}>
                    <input
                      className="rounded p-1 text-darkGrey bg-lightGrey"
                      type="checkbox"
                      id={key}
                      checked={value}
                      onChange={handleInputChange}
                    />
                    <label htmlFor={key} className="text-grey">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="presupuesto">Presupuesto:</label>
              <input
                required
                className="rounded p-1 text-darkGrey bg-lightGrey"
                type="text"
                id="presupuesto"
                value={trabajoData.presupuesto}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="comentario">Comentario:</label>
              <textarea
                className="rounded p-1 text-darkGrey bg-lightGrey"
                type="text"
                id="comentario"
                rows="3"
                value={trabajoData.comentario}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" value="">
              <p className={`${buttonStyle("bg-lightGrey", "text-white")}`}>
                Enviar
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddWork;
