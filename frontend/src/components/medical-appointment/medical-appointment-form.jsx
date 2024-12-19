import { useState } from 'react';
import { Card, CardContent, CardDateAndTime, CardFooter, CardHeader, CardTitle } from '../UI/card.styles';
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsContentContainer } from '../UI/tabs.styles';
import { Label } from '../UI/label.styles';
import { Input } from '../UI/input.styles';
import { Button } from '../UI/button.styles';
import { appointmentConsts } from '../../constants/apointment-form.const';
import ToggleButton from '../UI/toggle-button/toggle-button.component';
import DatePicker from '../UI/date-picker/date-picker.component';
import TimePicker from '../UI/time-picker/time-picker.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCenter } from '../../store/center/center.selector';
import { createCitaStart } from '../../store/cita/cita.action';

const MedicalAppointmentForm = () => {
  const [formData, setFormData] = useState(appointmentConsts.defualtFields);
  const [samePatientVisit, setSamePatientVisit] = useState(true);
  const center = useSelector(selectCurrentCenter);

  const dispatch = useDispatch();

  // Nombre del centro que se rellena automáticamente con el nombre del centro logueado
  const centro_nombre = formData.centro_nombre || center?.nombre || '';

  const {
    especialista, fecha, hora, tipo_servicio, paciente_nombre,
    paciente_edad, paciente_nacionalidad, paciente_cedula,
    paciente_genero, paciente_direccion, solicitante_nombre,
    solicitante_apellido, categoria_diagnostico,
    descripcion_diagnostico, medicamento, nombre_dispensario,
    afiliacion_ars, valor_reclamado, nss_o_contrato,
    total_reclamaciones
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = () => {
    setSamePatientVisit(!samePatientVisit);
  };

  const disabled = !centro_nombre || !especialista || !fecha || !hora || !tipo_servicio || !paciente_nombre || !paciente_edad || !paciente_nacionalidad || !paciente_cedula || !paciente_genero || !paciente_direccion || !categoria_diagnostico || !descripcion_diagnostico || !medicamento || !nombre_dispensario || !afiliacion_ars || !nss_o_contrato || !total_reclamaciones || !valor_reclamado;

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      centro_nombre: centro_nombre || center?.nombre || '',
    };

    // Si el solicitante es el mismo que el paciente, copio los datos del paciente
    if (samePatientVisit) {
      const [solicitante_nombre, solicitante_apellido] = paciente_nombre.split(' ');
      updatedFormData.solicitante_nombre = solicitante_nombre;
      updatedFormData.solicitante_apellido = solicitante_apellido;
    }

    dispatch(createCitaStart(updatedFormData));

    setFormData(appointmentConsts.defualtFields);
    setSamePatientVisit(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nueva Cita Médica</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="appointment">
          <TabsList>
            <TabsTrigger value="appointment">Cita</TabsTrigger>
            <TabsTrigger value="patient">Paciente</TabsTrigger>
            <TabsTrigger value="diagnosis">Diagnóstico</TabsTrigger>
            <TabsTrigger value="billing">Facturación</TabsTrigger>
          </TabsList>

          {/* Pestaña Cita */}
          <TabsContent value="appointment" columns={1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TabsContentContainer>
                <Label htmlFor="centro_nombre">Nombre del centro</Label>
                <Input
                  placeholder="Nombre del centro"
                  onChange={handleChange}
                  value={centro_nombre}
                  name="centro_nombre"
                  disabled
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="especialista">Doctor Especialista</Label>
                <Input
                  placeholder="Nombre del especialista"
                  onChange={handleChange}
                  value={especialista}
                  name="especialista"
                />
              </TabsContentContainer>
              <CardDateAndTime>
                <TabsContentContainer>
                  <Label htmlFor="fecha">Fecha de Cita</Label>
                  <DatePicker
                    onChange={handleChange}
                    value={fecha}
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="hora">Hora</Label>
                  <TimePicker
                    value={hora}
                    disabled={!fecha}
                    onChange={handleChange}
                  />
                </TabsContentContainer>
              </CardDateAndTime>
              <TabsContentContainer>
                <Label htmlFor="tipo_servicio">Tipo de Servicio</Label>
                <Input
                  placeholder="Tipo de servicio"
                  onChange={handleChange}
                  value={tipo_servicio}
                  name="tipo_servicio"
                />
              </TabsContentContainer>
            </div>
          </TabsContent>

          {/* Pestaña Paciente */}
          <TabsContent value="patient" columns={1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TabsContentContainer>
                <Label htmlFor="paciente_nombre">Nombre completo</Label>
                <Input
                  placeholder="Nombre completo"
                  onChange={handleChange}
                  value={paciente_nombre}
                  name="paciente_nombre"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="paciente_edad">Edad</Label>
                <Input
                  type="number"
                  placeholder="Edad"
                  onChange={handleChange}
                  value={paciente_edad}
                  name="paciente_edad"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="paciente_nacionalidad">Nacionalidad</Label>
                <Input
                  placeholder="Nacionalidad"
                  onChange={handleChange}
                  value={paciente_nacionalidad}
                  name="paciente_nacionalidad"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="paciente_cedula">Numero de cédula</Label>
                <Input
                  placeholder="Numero de cédula"
                  onChange={handleChange}
                  value={paciente_cedula}
                  name="paciente_cedula"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="paciente_genero">Genero</Label>
                <Input
                  placeholder="Genero del paciente"
                  onChange={handleChange}
                  value={paciente_genero}
                  name="paciente_genero"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="paciente_direccion">Dirección del paciente</Label>
                <Input
                  placeholder="Dirección del paciente"
                  onChange={handleChange}
                  value={paciente_direccion}
                  name="paciente_direccion"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="same_patient_visit">¿El solicitante es el mismo paciente que asistirá?</Label>
                <ToggleButton
                  onChange={handleCheckboxChange}
                  isToggled={samePatientVisit}
                  name="same_patient_visit"
                />
              </TabsContentContainer>
              {!samePatientVisit && (
                <>
                  <TabsContentContainer>
                    <Label htmlFor="solicitante_nombre">Nombre del solicitante</Label>
                    <Input
                      placeholder="Nombre del solicitante"
                      onChange={handleChange}
                      value={solicitante_nombre}
                      name="solicitante_nombre"
                    />
                  </TabsContentContainer>
                  <TabsContentContainer>
                    <Label htmlFor="solicitante_apellido">Aprellido del solicitante</Label>
                    <Input
                      placeholder="Aprellido del solicitante"
                      onChange={handleChange}
                      value={solicitante_apellido}
                      name="solicitante_apellido"
                    />
                  </TabsContentContainer>
                </>
              )}
            </div>
          </TabsContent>

          {/* Pestaña Diagnóstico */}
          <TabsContent value="diagnosis" columns={1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TabsContentContainer>
                <Label htmlFor="categoria_diagnostico">Codigo de diagnóstico</Label>
                <Input
                  placeholder="Codigo de diagnóstico"
                  onChange={handleChange}
                  value={categoria_diagnostico}
                  name="categoria_diagnostico"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="descripcion_diagnostico">Descripción</Label>
                <Input
                  placeholder="Descripción del diagnóstico"
                  onChange={handleChange}
                  value={descripcion_diagnostico}
                  name="descripcion_diagnostico"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="medicamento">Medicamento</Label>
                <Input
                  placeholder="Medicamentos recetados"
                  onChange={handleChange}
                  value={medicamento}
                  name="medicamento"
                />
              </TabsContentContainer>
            </div>
          </TabsContent>

          {/* Pestaña Facturación */}
          <TabsContent value="billing" columns={1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TabsContentContainer>
                <Label htmlFor="nombre_dispensario">Nombre dispensario</Label>
                <Input
                  placeholder="Nombre dispensario"
                  onChange={handleChange}
                  value={nombre_dispensario}
                  name="nombre_dispensario"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="afiliacion_ars">Afiliación ARS</Label>
                <Input
                  placeholder="Afiliación ARS"
                  onChange={handleChange}
                  value={afiliacion_ars}
                  name="afiliacion_ars"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="nss_o_contrato">NSS o contrato</Label>
                <Input
                  placeholder="Número de contrato o NSS"
                  onChange={handleChange}
                  value={nss_o_contrato}
                  name="nss_o_contrato"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="total_reclamaciones">Total de reclamaciones</Label>
                <Input
                  placeholder="Total reclamaciones"
                  onChange={handleChange}
                  value={total_reclamaciones}
                  name="total_reclamaciones"
                />
              </TabsContentContainer>
              <TabsContentContainer>
                <Label htmlFor="valor_reclamado">Valor reclamado</Label>
                <Input
                  placeholder="Valor reclamado"
                  onChange={handleChange}
                  value={valor_reclamado}
                  name="valor_reclamado"
                />
              </TabsContentContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={disabled}>Crear Cita</Button>
      </CardFooter>
    </Card>
  );
};

export default MedicalAppointmentForm;
