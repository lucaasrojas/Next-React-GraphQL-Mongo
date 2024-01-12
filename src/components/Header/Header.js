import React from 'react'
import { gql, useQuery } from "@apollo/client"
import { usePathname, useRouter } from 'next/navigation'


const OBTENER_USUARIO_QUERY = gql`
query obtenerUsuario{
  obtenerUsuario {
    id
    nombre
    apellido
  }
}
`

export default function Header() {
  const router = useRouter()
  const { data, loading, error } = useQuery(OBTENER_USUARIO_QUERY)

  const cerrarSesion = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  if (loading) return null
  if (!loading && !data?.obtenerUsuario) router.push("/login")
  return (
    <div className='flex  justify-between mb-10'>
      <p>{data?.obtenerUsuario?.nombre} {data?.obtenerUsuario?.apellido}</p>
      <button type='button'
        onClick={() => cerrarSesion()}
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'>Cerrar Sesion</button>
    </div>
  )
}
