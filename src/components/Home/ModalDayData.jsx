import React, { useState, useEffect } from "react";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import svgClose from "../../svg/svgClose";
import buttonStyle from "../../exportStyles/buttonStyle";
import ModalAddWork from "../Home/ModalAddWork";
import { firestore } from "../../firebase";

const ModalDayData = ({
  number,
  month,
  handleIsDayOpen,
  isDayOpen,
  fetchData,
  data,
}) => {
  const [additionalStyle, setAdditionalStyle] = useState("-translate-x-full");
  const [isWorkOpen, setIsWorkOpen] = useState(false);

  useEffect(() => {
    fetchData();

    if (isDayOpen === true) {
      setAdditionalStyle("");
    } else {
      setAdditionalStyle("-translate-x-full");
    }
  }, [isDayOpen]);

  const handleIsWorkOpen = () => {
    setIsWorkOpen(!isWorkOpen);
  };
  //-------------------------------------

  const handleDeleteDocument = async (id) => {
    try {
//se recupera la coleccion
      const snapshot = await getDocs(
        collection(
          firestore,
          `trabajos-para-${number}-de-${month}`
        )
      );
//se compara el id proporcionado con los id de los documentos de snapshot
      const trabajoAEliminar = snapshot.docs.find(
        (trabajo) => trabajo.id === id
      );
//si hay un documento en la coleccion con el mismo id de trabajoAEliminar, se elimina
      if (trabajoAEliminar) {
        const trabajoDocRef = doc(
          collection(
            firestore,
            `trabajos-para-${number}-de-${month}`
          ),
          trabajoAEliminar.id
        );
        await deleteDoc(trabajoDocRef);

        fetchData();
      }
    } catch (error) {
      console.error("Error al eliminar documento:", error);
    }
  };

  return (
    <div
      className={`absolute w-full h-screen p-10 top-0 left-0 z-40 ease-out duration-500 overflow-scroll bg-darkGrey ${additionalStyle}`}
    >
      <div
        className="top-5 right-5 absolute cursor-pointer"
        onClick={handleIsDayOpen}
      >
        {svgClose}
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-white text-center pb-5">
          {number} de {month}
        </h2>
        <div
          className={`${buttonStyle("bg-lightGrey", "text-white")}`}
          onClick={handleIsWorkOpen}
        >
          <p>+ Agregar un trabajo</p>
        </div>
        {isWorkOpen === true && (
          <ModalAddWork
            number={number}
            month={month}
            handleIsWorkOpen={handleIsWorkOpen}
            isWorkOpen={isWorkOpen}
            fetchData={fetchData}
          />
        )}
        <div className="flex flex-col gap-3 pt-10 h-full w-full">
          {data.length > 0 &&
            data.map((trabajo, index) => (
              <div key={index}>
                <div className="bg-lightGrey p-1 rounded text-grey flex flex-col text-lg">
                  <div className="flex gap-1">
                    <p className="font-semibold">trabajo:</p>
                    <p className="text-white">{trabajo.data.trabajo}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold">ubicacion:</p>
                    <p className="text-white">{trabajo.data.ubicacion}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold">Cliente:</p>
                    <p className="text-white">{trabajo.data.cliente}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold">numero:</p>
                    <p className="text-white">{trabajo.data.numero}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold">empleado:</p>
                    {Object.entries(trabajo.data.empleados).map(
                      ([empleado, value]) =>
                        value && (
                          <p
                            className="text-white bg-grey rounded px-1"
                            key={empleado}
                          >
                            {empleado}
                          </p>
                        )
                    )}
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold">presupuesto:</p>
                    <p className="text-white">{trabajo.data.presupuesto}</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold">Comentario:</p>
                    <p className="text-white">{trabajo.data.comentario}</p>
                  </div>
                  <div
                    className="flex justify-end"
                    onClick={() => handleDeleteDocument(trabajo.id)}
                  >
                    <p className={`${buttonStyle("bg-red-500", "text-white")}`}>
                      Eliminar
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModalDayData;
