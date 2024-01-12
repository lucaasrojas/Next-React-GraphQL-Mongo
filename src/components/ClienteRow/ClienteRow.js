import { OBTENER_CLIENTES_VENDEDOR_QUERY } from "@/app/clientes/page";
import { gql, useMutation } from "@apollo/client";
import React from "react";
import Swal from "sweetalert2";

const ELIMINAR_CLIENTE_QUERY = gql`
  mutation eliminarCliente($id:ID!){
    eliminarCliente(id:$id)
  }
`;

function ClienteRow({ cliente }) {
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE_QUERY, {
    update(cache) {
      const { obtenerClientesVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_VENDEDOR_QUERY,
      });
      cache.writeQuery({
        query: OBTENER_CLIENTES_VENDEDOR_QUERY,
        data: {
          obtenerClientesVendedor: obtenerClientesVendedor.filter(
            (clienteActual) => clienteActual.id !== cliente.id
          ),
        },
      });
    },
  });
  const handleDeleteClient = (id) => {
    Swal.fire({
      title: "Desea eliminar el cliente?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarCliente({
            variables: {
              id,
            },
          });
          console.log("DELETE DATA", data);
          Swal.fire({
            title: "Eliminado!",
            text: data?.eliminarCliente,
            icon: "success",
          });
        } catch (error) { }
      }
    });
  };

  const handleEditClient = () => {

  }
  return (
    <tr key={cliente.id}>
      <td className="border px-4 py-2">
        {cliente.nombre} {cliente.apellido}
      </td>
      <td className="border px-4 py-2">{cliente.empresa}</td>
      <td className="border px-4 py-2">{cliente.email}</td>
      <td className="border px-4 py-2">
        <button
          className="bg-red-800 p-1 text-white rounded"
          onClick={() => handleDeleteClient(cliente.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <button
          className="bg-red-800 p-1 text-white rounded"
          onClick={() => handleEditClient(cliente.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>

        </button>
      </td>
    </tr>
  );
}

export default ClienteRow;
