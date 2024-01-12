"use client"
import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import * as Yup from "yup"
import { OBTENER_CLIENTES_VENDEDOR_QUERY } from '../clientes/page'
const CREAR_USUARIO_QUERY = gql`
  mutation crearCliente($input: ClienteInput) {
    crearCliente(input: $input) {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`

export default function NuevoCliente() {
  const [mensaje, guardarMensaje] = React.useState(null)
  const router = useRouter()
  const [crearCliente] = useMutation(CREAR_USUARIO_QUERY, {
    update(cache, { data: { crearCliente } }) {
      // Despues de correr el mutation se actualiza el cache con el valor obtenido
      const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_VENDEDOR_QUERY })

      // el cache es inmutable
      cache.writeQuery({
        query: OBTENER_CLIENTES_VENDEDOR_QUERY,
        data: {
          obtenerClientesVendedor: [...(obtenerClientesVendedor || []), crearCliente]
        }
      })
    }
  })


  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      empresa: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es valido').required("El email es obligatorio"),
      nombre: Yup.string().required("El nombre no puede ser vacio"),
      apellido: Yup.string().required("El apellido no puede ser vacio"),
      empresa: Yup.string().required("La empresa no puede ser vacio"),

    }),

    onSubmit: async values => {
      console.log("Values", values)
      try {
        const { data } = await crearCliente({
          variables: {
            input: {
              ...values
            }
          }
        })
        console.log("Data", data)

        router.push("/clientes")

      } catch (error) {
        console.log("error", error.message)
        mostrarMensaje(error.message.replace("GraphQL error: ", ""))
      }
    }
  })

  return (
    <div>

      <h1>Nuevo Cliente</h1>
      {mensaje && (
        <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
          <p>{mensaje}</p>
        </div>
      )}
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-lg'>
          <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                Nombre
              </label>

              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='nombre'
                placeholder='Nombre'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              {formik.errors.nombre && formik.touched.nombre ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                Apellido
              </label>

              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='apellido'
                placeholder='Apellido'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.apellido}
              />
              {formik.errors.apellido && formik.touched.apellido ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p>{formik.errors.apellido}</p>
                </div>
              ) : null}
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>

              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                placeholder='Email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='empresa'>
                Empresa
              </label>

              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='empresa'
                placeholder='empresa'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.empresa}
              />
              {formik.errors.empresa && formik.touched.empresa ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p>{formik.errors.empresa}</p>
                </div>
              ) : null}
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefono'>
                Telefono
              </label>

              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='telefono'
                placeholder='telefono'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
                type='tel'
              />

            </div>
            <button
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'

            >Registrar cliente</button>
          </form>
        </div>
      </div>
    </div>
  )
}
