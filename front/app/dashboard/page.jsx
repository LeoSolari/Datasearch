'use client'
import React, { useState, useEffect } from "react";

const Page = () => {
  // Lista de usuarios
  const initialUsers = [
    { id: 1, name: "Juan", permissions: { mapa: false, archivoDigital: false, pozos: true } },
    { id: 2, name: "María", permissions: { mapa: false, archivoDigital: true, pozos: false } },
    { id: 3, name: "Pedro", permissions: { mapa: true, archivoDigital: false, pozos: false } },
    { id: 4, name: "Laura", permissions: { mapa: false, archivoDigital: false, pozos: false } },
    { id: 5, name: "Carlos", permissions: { mapa: false, archivoDigital: false, pozos: true } }
  ];

  // Estado para almacenar la lista de usuarios
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    // Verificar si los permisos de Pedro y María están en el almacenamiento local
    const mariaPermissions = JSON.parse(localStorage.getItem("mariaPermissions"));
    const pedroPermissions = JSON.parse(localStorage.getItem("pedroPermissions"));

    // Si existen, actualizar los permisos de María y Pedro en el estado
    if (mariaPermissions) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === 2 ? { ...user, permissions: mariaPermissions } : user
        )
      );
    }
    if (pedroPermissions) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === 3 ? { ...user, permissions: pedroPermissions } : user
        )
      );
    }
  }, []);

  // Función para manejar el cambio de permisos
  const handlePermissionChange = (userId, permission) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, permissions: { ...user.permissions, [permission]: !user.permissions[permission] } } : user
      )
    );
  };

  // Actualizar el almacenamiento local cuando cambian los permisos de María y Pedro
  useEffect(() => {
    localStorage.setItem("mariaPermissions", JSON.stringify(users.find(user => user.id === 2)?.permissions));
    localStorage.setItem("pedroPermissions", JSON.stringify(users.find(user => user.id === 3)?.permissions));
  }, [users]);

  return (
    <div className="p-24">
      <h1 className="text-center text-4xl mb-8 font-bold">Permisos de Usuarios</h1>
      <p className="text-center text-lg text-gray-700 mb-8">Esta es una pantalla de administradores</p>
      <div className="max-w-md mx-auto">
        {users.map(user => (
          <div key={user.id} className="mb-4 bg-white rounded shadow-md p-4">
            <h2 className="text-xl mb-2 font-bold">{user.name}</h2>
            <div className="flex items-center">
              <label className="mr-2">Mapa:</label>
              <input
                type="checkbox"
                checked={user.permissions.mapa}
                onChange={() => handlePermissionChange(user.id, "mapa")}
                className="mr-4"
              />
              <label className="mr-2">Archivo Digital:</label>
              <input
                type="checkbox"
                checked={user.permissions.archivoDigital}
                onChange={() => handlePermissionChange(user.id, "archivoDigital")}
                className="mr-4"
              />
              <label className="mr-2">Pozos:</label>
              <input
                type="checkbox"
                checked={user.permissions.pozos}
                onChange={() => handlePermissionChange(user.id, "pozos")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
