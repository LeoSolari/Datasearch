"use client";
import { fetchUsers, createUser } from "@/redux/slices/userSlice";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.users.status);

  useEffect(() => {
    console.log("Status:", status);
  }, [status]);

  const [usersData, setUsersData] = useState([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    dispatch(fetchUsers())
      .then((response) => {
        // Guarda los datos en el estado local
        setUsersData(response.payload);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [dispatch]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crear un objeto con los datos del nuevo usuario
    const userData = { name, salary };

    try {
      // Despachar la acción para crear un nuevo usuario
      await dispatch(createUser(userData));

      // Limpiar los campos del formulario después de enviar los datos
      setName("");
      setSalary("");

      // Mostrar un mensaje de éxito o realizar otras acciones si es necesario
      console.log("Usuario creado exitosamente");
    } catch (error) {
      // Manejar cualquier error que pueda ocurrir durante la creación del usuario
      console.error("Error al crear usuario:", error);
    }
  };

  console.log(usersData);

  return (
    <div className="py-20">
      <div>
        <p className="text-xl text-center">Datos traidos de BDD</p>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salario:
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={salary}
              onChange={handleSalaryChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Agregar usuario
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4">
        {usersData.map((el) => (
          <div
            key={el.id}
            className="flex justify-around p-8 border rounded-lg"
          >
            <div>
              <p>Nomber</p>
              <p className="text-lg font-semibold">{el.name}</p>
            </div>
            <div>
              <p>Salario</p>
              <p className="text-gray-500">{el.salary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
