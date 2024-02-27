import React, { useState, useEffect } from "react";
import ModalDayData from "./ModalDayData";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";

const Day = ({ number, month }) => {
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [data, setData] = useState([]);

  //funcion de recuperar documentos de firebase
  const fetchData = async () => {
    try {
      const trabajosCollectionRef = collection(
        firestore,
        `trabajos-para-${number}-de-${month}`
      );

      const snapshot = await getDocs(trabajosCollectionRef);

//se extrae los datos de los documentos y se le asigna tambien el id
      const documentos = snapshot.docs.map((doc) => ({
          data: doc.data(),
          id:doc.id,
        }));

      setData(documentos);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleIsDayOpen = () => {
    setIsDayOpen(!isDayOpen);
  };

  useEffect(() => {
      fetchData();
  }, [isDayOpen]);
  

  return (
    <div>
      <div
        onClick={handleIsDayOpen}
        className="border-grey rounded-md border-2 h-24 p-1 text-grey hover:scale-105 duration-200 cursor-pointer hover:border-lightGrey hover:shadow-lightGrey hover:shadow-md"
      >
        {number}
        <div>
          {data.length > 0 && (
            <div className="text-white w-full h-full flex justify-center items-center gap-1">
              {data.length}
              <p className="hidden md:block">trabajos</p>
            </div>
          )}
        </div>
      </div>
      {isDayOpen === true && (
        <ModalDayData
          number={number}
          month={month}
          handleIsDayOpen={handleIsDayOpen}
          isDayOpen={isDayOpen}
          fetchData={fetchData}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
};

export default Day;
