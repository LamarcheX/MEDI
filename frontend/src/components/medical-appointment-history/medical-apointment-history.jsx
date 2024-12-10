import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../UI/card.styles";
import {
  Capsule,
  CapsuleHeader,
  CapsuleText,
  Table,
  TableRow,
  TableLabel,
  TableValue,
  TableContainer,
  TableColumn,
  TableTitle,
  InputField,
  ButtonContainer,
  Button,
} from "./medical-apointment-history-styles";
import { Input } from "../UI/input.styles";
import moment from "moment";
import Swal from "sweetalert2";

const EditableRow = ({ label, value, isEditing, onChange, fieldName }) => (
  <TableRow>
    <TableLabel>{label}</TableLabel>
    <TableValue>
      {isEditing ? (
        <InputField value={value} onChange={(e) => onChange(e, fieldName)} />
      ) : (
        value
      )}
    </TableValue>
  </TableRow>
);

const ROWS_CONFIG = {
  citaInfo: [
    { label: "Especialista", field: "especialista" },
    { label: "Fecha", field: "fecha" },
    { label: "Hora", field: "hora" },
    { label: "Tipo de Servicio", field: "tipo_servicio" },
    { label: "Estado", field: "estado" },
  ],
  pacienteInfo: [
    { label: "Paciente Nombre", field: "paciente_nombre" },
    { label: "Edad", field: "paciente_edad" },
    { label: "Nacionalidad", field: "paciente_nacionalidad" },
    { label: "Cédula", field: "paciente_cedula" },
    { label: "Género", field: "paciente_genero" },
  ],
  infoAdicional: [
    { label: "Dirección", field: "paciente_direccion" },
    { label: "Tipo de Paciente", field: "tipo_paciente" },
    { label: "Solicitante Nombre", field: "solicitante_nombre" },
    { label: "Solicitante Apellido", field: "solicitante_apellido" },
    { label: "Afiliación ARS", field: "afiliacion_ars" },
    { label: "Centro Nombre", field: "centro_nombre" },
  ],
};

const PreviousAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [openAppointmentId, setOpenAppointmentId] = useState(null);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/citas")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setFilteredAppointments(data);
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleSearch = () => {
    const query = search.toLowerCase();
    setFilteredAppointments(
      query
        ? appointments.filter((app) =>
            ["centro_nombre", "especialista", "paciente_nombre"].some(
              (key) => app[key]?.toLowerCase().includes(query)
            )
          )
        : appointments
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleAppointmentDetails = (appointmentId) => {
    setOpenAppointmentId((prevId) =>
      prevId === appointmentId ? null : appointmentId
    );
  };

  const handleEdit = (appointment) => {
    setEditingAppointmentId(appointment._id);
    setEditedAppointment({ ...appointment });
  };

  const handleInputChange = (e, field) => {
    setEditedAppointment((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSaveEdit = () => {
    const updatedHora = moment(editedAppointment.hora, "hh:mm A").format(
      "HH:mm"
    );
    editedAppointment.hora = updatedHora;

    fetch("http://localhost:5000/api/cita/actualizar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedAppointment),
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === data._id ? data : appointment
          )
        );
        setFilteredAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === data._id ? data : appointment
          )
        );
        setEditingAppointmentId(null);
        setEditedAppointment({});
      })
      .catch((error) => console.error("Error al actualizar la cita:", error));
  };

  const handleDelete = (appointmentId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:5000/api/cita/eliminar", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: appointmentId }),
        })
          .then(() => {
            Swal.fire(
              "Eliminada",
              "La cita ha sido eliminada correctamente.",
              "success"
            );
            setAppointments((prevAppointments) =>
              prevAppointments.filter((app) => app._id !== appointmentId)
            );
            setFilteredAppointments((prevAppointments) =>
              prevAppointments.filter((app) => app._id !== appointmentId)
            );
          })
          .catch((error) => {
            console.error("Error al eliminar la cita:", error);
            Swal.fire(
              "Error",
              "Hubo un problema al eliminar la cita. Intenta de nuevo.",
              "error"
            );
          });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Citas Registradas</CardTitle>
      </CardHeader>
      <CardContent>
      <div style={{ marginBottom: "10px" }}>
          <Input
            placeholder="Buscar por centro, doctor o paciente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            onKeyDown={handleKeyPress} 
            
          />
          <Button onClick={handleSearch}>Buscar</Button> 
        </div>
        <div>
          {filteredAppointments.map((appointment) => (
            <div key={appointment._id}>
              <Capsule
                onClick={() => toggleAppointmentDetails(appointment._id)}
              >
                <CapsuleHeader>
                  <CapsuleText>{appointment.centro_nombre}</CapsuleText>
                  <CapsuleText>{appointment.especialista}</CapsuleText>
                  <CapsuleText>{appointment.paciente_nombre}</CapsuleText>
                </CapsuleHeader>
              </Capsule>

              {openAppointmentId === appointment._id && (
                <TableContainer>
                  {Object.entries(ROWS_CONFIG).map(([section, rows]) => (
                    <TableColumn key={section}>
                      <TableTitle>
                        {section === "citaInfo"
                          ? "Info Cita"
                          : section === "pacienteInfo"
                          ? "Info Paciente"
                          : "Info Adicional"}
                      </TableTitle>
                      {rows.map(({ label, field }) => (
                        <EditableRow
                          key={field}
                          label={label}
                          value={
                            field === "fecha"
                              ? moment(appointment[field]).format("DD/MM/YYYY")
                              : appointment[field]
                          }
                          isEditing={editingAppointmentId === appointment._id}
                          onChange={handleInputChange}
                          fieldName={field}
                        />
                      ))}
                    </TableColumn>
                  ))}
                  <ButtonContainer>
                    <Button onClick={() => handleDelete(appointment._id)}>
                      Eliminar cita
                    </Button>
                    {editingAppointmentId !== appointment._id && (
                      <Button onClick={() => handleEdit(appointment)}>
                        Editar cita
                      </Button>
                    )}
                  </ButtonContainer>
                </TableContainer>
              )}

              {editingAppointmentId === appointment._id && (
                <ButtonContainer>
                  <Button onClick={handleSaveEdit}>Guardar cambios</Button>
                  <Button onClick={() => setEditingAppointmentId(null)}>
                    Cancelar
                  </Button>
                </ButtonContainer>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviousAppointments;
