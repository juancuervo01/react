/* eslint-disable camelcase */
import react from '@/assets/lista.png'
import { format } from 'date-fns'
import { useState, React } from 'react'
import SimpleSpinner from '../spinners/SimpleSpinner'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export default function ListCard({ idproducto, idproveedor, precio, nombre_producto, fecha_creacion, count, handleTakeOff, handleDelete, nombre_proveedor }) {
  const formattedDate = format(fecha_creacion.toDate(), 'dd MMMM yyyy')
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  count = 1

  const handleConfirm = () => {
    setLoading(true)
    handleTakeOff(idproducto, { setLoading, setConfirm })
  }

  const handleCancel = () => {
    setConfirm(false)
  }

  return (
    <div className="flex justify-between bg-white">
      <div className="flex gap-4">
        <img src={react} width="100" height="60" />
        <div>
          <p>Nombre: {nombre_producto}</p>
          <p>Id Producto: {idproducto}</p>
          <p>Fecha de Creación: {formattedDate}</p>
          <p>Precio: {precio}</p>
          <p>Poveedor: {nombre_proveedor}</p>
        </div>
      </div>

      {confirm ? (
        <div className="flex gap-2">
          <button
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white px-2 py-1"
            onClick={handleConfirm}
          >
            {loading ? <SimpleSpinner /> : 'Confirmar'}
          </button>
          <button
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <>
          {count >= 1 && (
            <div className="flex flex-row px-2">
              <button onClick={() => navigate(`/edit-product/${idproducto}`)} className=" mr-5 bg-green-500 hover:bg-green-600 rounded-lg px-2 py-1 rounded-lg flex items-center">
                Editar Producto
                <AiOutlineEdit className="ml-1" size={30} />
              </button>

              <button onClick={() => handleDelete(idproducto)} className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-2 py-1 rounded-lg flex items-center">
                Eliminar Producto
                <AiOutlineDelete className="ml-1" size={30} />
              </button>
            </div>
          )}
        </>

      )}
    </div>
  )
}
