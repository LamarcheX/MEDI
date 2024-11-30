import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 90vh;
  box-sizing: border-box;
  position: relative;
`;

const DetailCapsule = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CapsuleTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const CapsuleContent = styled.p`
  font-size: 16px;
  color: #555;
  margin: 10px 0 0;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Modal = ({
  onClose,
  modalData,
  updateAppointment,
  isEditing,
  handleEdit,
}) => {
  const [editedData, setEditedData] = useState(modalData);

  useEffect(() => {
    setEditedData(modalData);
  }, [modalData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    updateAppointment({ _id: editedData._id, ...editedData });
    onClose();
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>Detalles de la Cita</h2>

        <DetailGrid>
          <DetailCapsule>
            <CapsuleTitle>Centro</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="centro_nombre"
                value={editedData.centro_nombre || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.centro_nombre}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Especialista</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="especialista"
                value={editedData.especialista || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.especialista}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Paciente</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="paciente_nombre"
                value={editedData.paciente_nombre || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.paciente_nombre}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Fecha</CapsuleTitle>
            {isEditing ? (
              <input
                type="date"
                name="fecha"
                value={editedData.fecha ? formatDate(editedData.fecha) : ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{formatDate(editedData.fecha)}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Hora</CapsuleTitle>
            {isEditing ? (
              <input
                type="time"
                name="hora"
                value={editedData.hora || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.hora}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Tipo de Servicio</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="tipo_servicio"
                value={editedData.tipo_servicio || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.tipo_servicio}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Cédula del Paciente</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="paciente_cedula"
                value={editedData.paciente_cedula || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.paciente_cedula}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Edad del Paciente</CapsuleTitle>
            {isEditing ? (
              <input
                type="number"
                name="paciente_edad"
                value={editedData.paciente_edad || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.paciente_edad}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Nacionalidad</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="paciente_nacionalidad"
                value={editedData.paciente_nacionalidad || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>
                {editedData.paciente_nacionalidad}
              </CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Género del Paciente</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="paciente_genero"
                value={editedData.paciente_genero || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.paciente_genero}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Dirección del Paciente</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="paciente_direccion"
                value={editedData.paciente_direccion || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.paciente_direccion}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Tipo de Paciente</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="tipo_paciente"
                value={editedData.tipo_paciente || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.tipo_paciente}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Solicitante Nombre</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="solicitante_nombre"
                value={editedData.solicitante_nombre || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.solicitante_nombre}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Solicitante Apellido</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="solicitante_apellido"
                value={editedData.solicitante_apellido || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.solicitante_apellido}</CapsuleContent>
            )}
          </DetailCapsule>

          <DetailCapsule>
            <CapsuleTitle>Afiliación ARS</CapsuleTitle>
            {isEditing ? (
              <input
                type="text"
                name="afiliacion_ars"
                value={editedData.afiliacion_ars || ""}
                onChange={handleInputChange}
              />
            ) : (
              <CapsuleContent>{editedData.afiliacion_ars}</CapsuleContent>
            )}
          </DetailCapsule>
        </DetailGrid>

        {/* Botones de acción */}
        <ModalButtons>
          <Button onClick={onClose}>Cerrar</Button>
          <Button onClick={isEditing ? handleSaveChanges : handleEdit}>
            {isEditing ? "Guardar cambios" : "Editar"}
          </Button>
        </ModalButtons>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
