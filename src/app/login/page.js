"use client"
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'

const AUTENTICAR_USUARIO = gql`
  mutation AutenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`
const Login = () => {
  const [mensaje, guardarMensaje] = React.useState(null)
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO)

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es valido').required("El email es obligatorio"),
      password: Yup.string().required("El password no puede ser vacio").min(6, "Debe ser de almenos 6 caracteres")
    }),
    onSubmit: async values => {

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              ...values
            }
          }
        })
        console.log("Data", data)
        if (data.autenticarUsuario.token) {
          mostrarMensaje("Autenticando", false)
          localStorage.setItem("token", data.autenticarUsuario.token)
          mostrarMensaje(null, false)
          router.push("/clientes")
        }
      } catch (error) {
        console.log("error", error)
        mostrarMensaje(error.message.replace("GraphQL error: ", ""))
      }
    }
  })
  const mostrarMensaje = (msg, timer = true) => {
    guardarMensaje(msg)
    if (timer) {

      setTimeout(() => {
        guardarMensaje(null)
      }, 3000)
    }
  }
  return (
    <>
      {mensaje && (
        <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
          <p>{mensaje}</p>
        </div>
      )}
      <h1 className='text-center text-2xl text-white font-light'>Login</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form
            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>

              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                placeholder='Email usuario'
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
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>

              <input
                className='shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='Password usuario'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
            </div>
            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900'
              value="Iniciar Sesion"
            />

          </form>
        </div>
      </div>
    </>
  )
}

export default Login