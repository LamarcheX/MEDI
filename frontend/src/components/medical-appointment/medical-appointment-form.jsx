import { useState } from 'react';
import { Card, CardContent, CardDateAndTime, CardFooter, CardHeader, CardTitle } from '../UI/card.styles';
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsContentContainer } from '../UI/tabs.styles';
import { Label } from '../UI/label.styles';
import { Input } from '../UI/input.styles';
import { Button } from '../UI/button.styles';
import { defualtFormData } from '../../constants/apointment-form.const';
import ToggleButton from '../UI/toggle-button/toggle-button.component';
import DatePicker from '../UI/date-picker/date-picker.component';

const MedicalAppointmentForm = () => {
  const [formData, setFormData] = useState(defualtFormData);
  const [samePatientVisit, setSamePatientVisit] = useState(true);

  const {
    centro_nombre,
    especialista,
    fecha,
    hora,
    tipo_servicio,
    paciente_nombre,
    paciente_edad,
    paciente_nacionalidad,
    paciente_cedula,
    paciente_genero,
    paciente_direccion,
    solicitante_nombre,
    solicitante_apellido,
    categoria_diagnostico,
    descripcion_diagnostico,
    medicamento,
    nombre_dispensario,
    afiliacion_ars,
    valor_reclamado,
    nss_o_contrato,
    total_reclamaciones
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setSamePatientVisit(!samePatientVisit);
  };

  const disabled = !centro_nombre || !especialista || !fecha || !hora || !tipo_servicio || !paciente_nombre || !paciente_edad || !paciente_nacionalidad || !paciente_cedula || !paciente_genero || !paciente_direccion || !categoria_diagnostico || !descripcion_diagnostico || !medicamento || !nombre_dispensario || !afiliacion_ars || !nss_o_contrato || !total_reclamaciones || !valor_reclamado;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (samePatientVisit) {
      const [solicitante_nombre, solicitante_apellido] = paciente_nombre.split(' ');
      setFormData({ ...formData, solicitante_nombre, solicitante_apellido });
    }
    console.log(formData);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
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

            <TabsContent value="appointment">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TabsContentContainer>
                  <Label htmlFor="centro_nombre">Nombre del centro</Label>
                  <Input
                    id="centro_nombre"
                    placeholder="Nombre del centro"
                    onChange={handleChange}
                    value={centro_nombre}
                    name='centro_nombre'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="especialista">Doctor Especialista</Label>
                  <Input
                    id="especialista"
                    placeholder="Nombre del especialista"
                    onChange={handleChange}
                    value={especialista}
                    name='especialista'
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
                    <Input
                      id="hora"
                      type="time"
                      onChange={handleChange}
                      disabled={!fecha}
                      value={hora}
                      name='hora'
                      min="08:00"
                      max="18:00"
                      step={600}
                    />
                  </TabsContentContainer>
                </CardDateAndTime>
                <TabsContentContainer>
                  <Label htmlFor="tipo_servicio">Tipo de Servicio</Label>
                  <Input
                    id="tipo_servicio"
                    placeholder="Tipo de servicio"
                    onChange={handleChange}
                    value={tipo_servicio}
                    name='tipo_servicio'
                  />
                </TabsContentContainer>
              </div>
            </TabsContent>

            <TabsContent value="patient">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TabsContentContainer>
                  <Label htmlFor="paciente_nombre">Nombre completo</Label>
                  <Input
                    id="paciente_nombre"
                    placeholder="Nombre completo"
                    onChange={handleChange}
                    value={paciente_nombre}
                    name='paciente_nombre'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="paciente_edad">Edad</Label>
                  <Input
                    id="paciente_edad"
                    type="number"
                    placeholder="Edad"
                    onChange={handleChange}
                    value={paciente_edad}
                    name='paciente_edad'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="paciente_nacionalidad">Nacionalidad</Label>
                  <Input
                    id="paciente_nacionalidad"
                    placeholder="Nacionalidad"
                    onChange={handleChange}
                    value={paciente_nacionalidad}
                    name='paciente_nacionalidad'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="paciente_cedula">Numero de cédula</Label>
                  <Input
                    id="paciente_cedula"
                    placeholder="Numero de cédula"
                    onChange={handleChange}
                    value={paciente_cedula}
                    name='paciente_cedula'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="paciente_genero">Genero</Label>
                  <Input
                    id="paciente_genero"
                    placeholder="Genero del paciente"
                    onChange={handleChange}
                    value={paciente_genero}
                    name='paciente_genero'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="paciente_direccion">Dirección del paciente</Label>
                  <Input
                    id="paciente_direccion"
                    placeholder="Dirección del paciente"
                    onChange={handleChange}
                    value={paciente_direccion}
                    name='paciente_direccion'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="same_patient_visit">¿El solicitante es el mismo paciente que asistirá?</Label>
                  <ToggleButton
                    onChange={handleCheckboxChange}
                    isToggled={samePatientVisit}
                    id="same_patient_visit"
                    name="same_patient_visit"
                  />
                </TabsContentContainer>
                {!samePatientVisit && (
                  <>
                    <TabsContentContainer>
                      <Label htmlFor="solicitante_nombre">Nombre del solicitante</Label>
                      <Input
                        id="solicitante_nombre"
                        placeholder="Nombre del solicitante"
                        onChange={handleChange}
                        value={solicitante_nombre}
                        name='solicitante_nombre'
                      />
                    </TabsContentContainer>
                    <TabsContentContainer>
                      <Label htmlFor="solicitante_apellido">Aprellido del solicitante</Label>
                      <Input
                        id="solicitante_apellido"
                        placeholder="Aprellido del solicitante"
                        onChange={handleChange}
                        value={solicitante_apellido}
                        name='solicitante_apellido'
                      />
                    </TabsContentContainer>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="diagnosis">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TabsContentContainer>
                  <Label htmlFor="categoria_diagnostico">Codigo de diagnóstico</Label>
                  <Input
                    id="categoria_diagnostico"
                    placeholder="Codigo de diagnóstico"
                    onChange={handleChange}
                    value={categoria_diagnostico}
                    name='categoria_diagnostico'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="descripcion_diagnostico">Descripcion del diagnóstico</Label>
                  <Input
                    id="descripcion_diagnostico"
                    placeholder="Descripcion del diagnóstico"
                    onChange={handleChange}
                    value={descripcion_diagnostico}
                    name='descripcion_diagnostico'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="medicamento">Medicamentos</Label>
                  <Input
                    id="medicamento"
                    placeholder="Medicamentos"
                    onChange={handleChange}
                    value={medicamento}
                    name='medicamento'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="nombre_dispensario">Nombre de dispensario</Label>
                  <Input
                    id="nombre_dispensario"
                    placeholder="Nombre de dispensario"
                    onChange={handleChange}
                    value={nombre_dispensario}
                    name='nombre_dispensario'
                  />
                </TabsContentContainer>
              </div>
            </TabsContent>

            <TabsContent value="billing">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TabsContentContainer>
                  <Label htmlFor="afiliacion_ars">Afiliación ARS</Label>
                  <Input
                    id="afiliacion_ars"
                    placeholder="¿Cual es su ARS?"
                    onChange={handleChange}
                    value={afiliacion_ars}
                    name='afiliacion_ars'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="nss_o_contrato">Contrato</Label>
                  <Input
                    id="nss_o_contrato"
                    placeholder="Numero de contrato"
                    onChange={handleChange}
                    value={nss_o_contrato}
                    name='nss_o_contrato'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="total_reclamaciones">Total reclamado</Label>
                  <Input
                    id="total_reclamaciones"
                    type="number"
                    placeholder="0.00"
                    onChange={handleChange}
                    value={total_reclamaciones}
                    name='total_reclamaciones'
                  />
                </TabsContentContainer>
                <TabsContentContainer>
                  <Label htmlFor="valor_reclamado">Monto a pagar</Label>
                  <Input
                    id="valor_reclamado"
                    type="number"
                    placeholder="0.00"
                    onChange={handleChange}
                    value={valor_reclamado}
                    name='valor_reclamado'
                  />
                </TabsContentContainer>
              </div>
            </TabsContent>
          </Tabs>

          <CardFooter>
            <Button className="outline">Cancelar</Button>
            <Button
              onClick={handleSubmit}
              disabled={disabled}
            >Guardar Cita</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalAppointmentForm;
