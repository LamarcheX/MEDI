import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../UI/card.styles";
import { Input } from "../UI/input.styles";
import { Button } from "../UI/button.styles";
import Modal from "../UI/modal/modal.component";
import styled from "styled-components";
import moment from "moment";

const Capsule = styled.div`
  background-color: #f4f4f4;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 15px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.02);
  }

  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const CapsuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
`;

const CapsuleText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const PreviousAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/citas")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setFilteredAppointments(data);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query === "") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter((app) => {
          return (
            (app.centro_nombre &&
              app.centro_nombre.toLowerCase().includes(query)) ||
            (app.especialista &&
              app.especialista.toLowerCase().includes(query)) ||
            (app.paciente_nombre &&
              app.paciente_nombre.toLowerCase().includes(query))
          );
        })
      );
    }
  };

  const openModal = (appointment) => {
    setModalData(appointment);
    setIsEditing(false);
  };

  const closeModal = () => {
    setModalData(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const updateAppointment = (editedData) => {
    const horaConvertida = moment(editedData.hora, "hh:mm A").format("HH:mm");

    editedData.hora = horaConvertida;

    console.log("Datos convertidos antes de enviar:", editedData);

    fetch(`http://localhost:5000/api/cita/actualizar/${editedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar la cita");
        }
        return res.json();
      })
      .then((data) => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === data._id ? data : appointment
          )
        );
        setIsEditing(false);
        console.log("Cita actualizada con éxito", data);
      })
      .catch((error) => {
        console.error("Error al actualizar la cita:", error);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Citas Registradas</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Buscar por centro, doctor o paciente..."
          value={search}
          onChange={handleSearch}
        />
        <div>
          {filteredAppointments.map((appointment) => (
            <Capsule
              key={appointment._id}
              onClick={() => openModal(appointment)}
            >
              <CapsuleHeader>
                <CapsuleText>{appointment.centro_nombre}</CapsuleText>
                <CapsuleText>{appointment.especialista}</CapsuleText>
                <CapsuleText>{appointment.paciente_nombre}</CapsuleText>
              </CapsuleHeader>
            </Capsule>
          ))}
        </div>
      </CardContent>
      {modalData && (
        <Modal
          onClose={closeModal}
          modalData={modalData}
          isEditing={isEditing}
          updateAppointment={updateAppointment}
          handleEdit={handleEdit}
        />
      )}
    </Card>
  );
};

export default PreviousAppointments;
