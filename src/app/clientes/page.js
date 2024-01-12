"use client"
import ClienteRow from "@/components/ClienteRow/ClienteRow"
import { gql, useQuery } from "@apollo/client"
import { useRouter } from "next/navigation"
import React from "react"

export const OBTENER_CLIENTES_VENDEDOR_QUERY = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`

const Clientes = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_VENDEDOR_QUERY)
  console.log("CLIENTES", data, loading)
  if (loading) return <p>Cargando...</p>
  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

      <button onClick={() => router.push("/nuevocliente")} className='bg-blue-800 w-full sm:w-auto  text-sm rounded py-1 px-2 text-white shadow-md'> Nuevo Cliente</button>

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
            <th className="w-1/5 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {
            data?.obtenerClientesVendedor && data?.obtenerClientesVendedor.map((cliente) => (
              <ClienteRow
                key={cliente.id}
                cliente={cliente}
              />

            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Clientes