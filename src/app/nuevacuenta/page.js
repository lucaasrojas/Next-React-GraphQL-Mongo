"use client"
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { useMutation, gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'


const NUEVA_CUENTA = gql`
  mutation ($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      apellido
      creado
      email
      id
      nombre
    }
  }
`

const NuevaCuenta = () => {
  const [mensaje, guardarMensaje] = React.useState(null)

  const [nuevoUsuario] = useMutation(NUEVA_CUENTA)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string().email('El email no es valido').required("El email es obligatorio"),
      password: Yup.string().required("El password no puede ser vacio").min(6, "Debe ser de almenos 6 caracteres")
    }),
    onSubmit: async values => {
      console.log("Enviando", values)
      try {

        const { data } = await nuevoUsuario({
          variables: { // Prop de la funcion
            input: { // Nombre que se le pone en  el gql
              ...values

            }
          }
        })
        console.log("DATA", data)
        if (data.nuevoUsuario.id) {
          guardarMensaje(`Se creo el usuario: ${data.nuevoUsuario.nombre}`)
          setTimeout(() => {
            guardarMensaje(null)
            router.push('/login')
          }, 3000)
        }
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error: ", ""))
        setTimeout(() => {
          guardarMensaje(null)
        }, 3000)
      }
    }
  })

  const mostrarMensaje = () => {
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{mensaje}</p>
      </div>
    )
  }

  return (
    <>
      {mensaje && mostrarMensaje()}
      <h1 className='text-center text-2xl text-white font-light'>Crear nueva cuenta</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form
            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nombre'>
                Nombre
              </label>
              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='nombre'
                placeholder='Nombre usuario'
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.nombre ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p>{formik.errors.nombre}</p>
              </div>
            ) : null}
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='apellido'>
                Apellido
              </label>
              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='apellido'
                placeholder='Apellido usuario'
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.apellido ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p>{formik.errors.apellido}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                placeholder='Email usuario'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.email ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='Password usuario'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.errors.password ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
              value="Crear cuenta"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default NuevaCuenta