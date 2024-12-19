import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent, CardTitle } from "../UI/card.styles";
import {
  Capsule,
  CapsuleHeader,
  CapsuleText,
  TableRow,
  TableLabel,
  TableValue,
  TableContainer,
  TableColumn,
  TableTitle,
  InputField,
  ButtonContainer
} from "./medical-apointment-history-styles";
import moment from "moment";
import TripleSpinner from "../UI/triple-spinner.styles";
import CitasFilters from "../citas-filters/citas-filters.component";
import { useDispatch } from "react-redux";
import { deleteCitaStart, updateCitaStart } from "../../store/cita/cita.action";
import { Button } from "../UI/button.styles";

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

const PreviousAppointments = ({ citas, loading }) => {
  const [filters, setFilters] = useState({ search: "" });
  const [openAppointmentId, setOpenAppointmentId] = useState(null);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState({});

  const dispatch = useDispatch();

  const handleFilterSubmit = (data) => {
    console.log("Filtering appointments with data:", data);
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

    dispatch(updateCitaStart(editedAppointment));
  };

  const handleDelete = (appointmentId) => {
    console.log("Trying to delete appointment with id:", appointmentId);
    dispatch(deleteCitaStart(appointmentId));
  };

  if (loading) {
    return <TripleSpinner />;
  } else if (!citas.length) {
    return <p>No hay citas registradas.</p>;
  } else {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Citas Registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <CitasFilters
            filters={filters}
            onFilterChange={setFilters}
            onSubmit={handleFilterSubmit}
          />
          <div>
            {citas.map((appointment) => (
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
  }
};

PreviousAppointments.propTypes = {
  citas: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

EditableRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
};

export default PreviousAppointments;
