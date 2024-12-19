import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal.styles';
import { Button } from '../../UI/button.styles';
import { Input } from '../../UI/input.styles';
import { Label } from '../../UI/label.styles';
import { defualtFields } from '../../../constants/mock';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../UI/card.styles';
import { Tabs, TabsColumnItem, TabsContent, TabsContentContainer, TabsList, TabsTrigger } from '../../UI/tabs.styles';
import ToggleButton from '../../UI/toggle-button/toggle-button.component';

const AddServiceRequestModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState(defualtFields);

    const { fecha, especialista, tipoDeServicio,
        nombrePaciente, edad, nacionalidad, noCedula,
        genero, solicitante, nombreSolicitante,
        direccion, tipoDePaciente, afiliacionArs,
        categoriaDiagnostico, descripcionDiagnostico,
        medicamento, provincia,
        observacion, nssOContrato, noAutorizacion,
        valorReclamado, totalDeReclamaciones, revisado,
        validFact, objetado
    } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Definir los campos que deben ser convertidos a números
        const numericFields = ["valorReclamado", "totalDeReclamaciones", "edad", "ano"];

        // Definir los campos que deben ser convertidos a booleanos
        const booleanFields = ["padresDivorciados", "fiscalia", "embarazadas", "revisado", "validFact", "objetado"];

        let newValue = value;

        // Convertir a número si el campo está en numericFields
        if (numericFields.includes(name)) {
            newValue = value === '' ? 0 : parseInt(value);
        }

        // Convertir a booleano si el campo está en booleanFields
        if (booleanFields.includes(name)) {
            newValue = value === 'true' || value === true;
        }

        // Si el campo es fecha, extraer el año y el mes
        if (name === 'fecha') {
            const date = new Date(value);
            const ano = date.getFullYear();
            const mes = date.toLocaleString('default', { month: 'long' });

            setFormData(prev => ({
                ...prev,
                [name]: value,
                ano,
                mes
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: newValue
            }));
        }
    };

    const handleToggle = (field) => () => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const submitForm = () => {
        const submitFormData = {
            ...formData,
        };

        onSubmit(submitFormData);
        onClose();
        // setFormData(defaultFormFields);
    };

    if (!isOpen) return null;

    return (
        <Modal>
            <Card>
                <CardHeader>
                    <CardTitle>Agregar Nueva Solicitud de Servicio</CardTitle>
                    <Button onClick={onClose} variant="ghost">X</Button>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue={"personal-information"}>
                        <TabsList columns={4}>
                            <TabsTrigger value={"personal-information"}>Informacion Personal</TabsTrigger>
                            <TabsTrigger value={"medical-information"}>Informacion Medica</TabsTrigger>
                            <TabsTrigger value={"additional-information"}>Informacion Adicional</TabsTrigger>
                            <TabsTrigger value={"billing"}>Informacion de Facturacion</TabsTrigger>
                        </TabsList>

                        <TabsContent value={"personal-information"}>
                            <TabsColumnItem>
                                <TabsContentContainer>
                                    <Label htmlFor={"nombrePaciente"}>Nombre del Paciente</Label>
                                    <Input
                                        id={"nombrePaciente"}
                                        name={"nombrePaciente"}
                                        placeholder='Nombre del Paciente'
                                        value={nombrePaciente}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"noCedula"}>Cedula</Label>
                                    <Input
                                        id={"noCedula"}
                                        name={"noCedula"}
                                        placeholder='Cadula'
                                        value={noCedula}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"edad"}>Edad</Label>
                                    <Input
                                        id={"edad"}
                                        name={"edad"}
                                        placeholder='Edad'
                                        value={edad}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"genero"}>Genero</Label>
                                    <Input
                                        id={"genero"}
                                        name={"genero"}
                                        placeholder='Genero'
                                        value={genero}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"nacionalidad"}>Nacionalidad</Label>
                                    <Input
                                        id={"nacionalidad"}
                                        name={"nacionalidad"}
                                        placeholder='Nacionalidad'
                                        value={nacionalidad}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                            </TabsColumnItem>
                            <TabsColumnItem>
                                <TabsContentContainer>
                                    <Label htmlFor={"provincia"}>Provincia</Label>
                                    <Input
                                        id={"provincia"}
                                        name={"provincia"}
                                        placeholder='Provincia'
                                        value={provincia}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"direccion"}>Direccion</Label>
                                    <Input
                                        id={"direccion"}
                                        name={"direccion"}
                                        placeholder='Direccion'
                                        value={direccion}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"nssOContrato"}>NSS o Contrato</Label>
                                    <Input
                                        id={"nssOContrato"}
                                        name={"nssOContrato"}
                                        placeholder='NSS o Contrato'
                                        value={nssOContrato}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"afiliacionArs"}>ARS</Label>
                                    <Input
                                        id={"afiliacionArs"}
                                        name={"afiliacionArs"}
                                        placeholder='ARS'
                                        value={afiliacionArs}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                            </TabsColumnItem>
                        </TabsContent>

                        <TabsContent value={"medical-information"} columns={2}>
                            <TabsColumnItem>
                                <TabsContentContainer>
                                    <Label htmlFor={"fecha"}>Fecha</Label>
                                    <Input
                                        id={"fecha"}
                                        name={"fecha"}
                                        placeholder='Fecha'
                                        value={fecha}
                                        type="date"
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"tipoDeServicio"}>Tipo de Servicio</Label>
                                    <Input
                                        id={"tipoDeServicio"}
                                        name={"tipoDeServicio"}
                                        placeholder='Tipo de Servicio'
                                        value={tipoDeServicio}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"especialista"}>Especialista</Label>
                                    <Input
                                        id={"especialista"}
                                        name={"especialista"}
                                        placeholder='Especialista'
                                        value={especialista}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"categoriaDiagnostico"}>Categoria de Diagnostico</Label>
                                    <Input
                                        id={"categoriaDiagnostico"}
                                        name={"categoriaDiagnostico"}
                                        placeholder='Categoria de Diagnostico'
                                        value={categoriaDiagnostico}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                            </TabsColumnItem>
                            <TabsColumnItem>
                                <TabsContentContainer>
                                    <Label htmlFor={"descripcionDiagnostico"}>Descripcion de Diagnostico</Label>
                                    <Input
                                        id={"descripcionDiagnostico"}
                                        name={"descripcionDiagnostico"}
                                        placeholder='Descripcion de Diagnostico'
                                        value={descripcionDiagnostico}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"medicamento"}>Medicamento</Label>
                                    <Input
                                        id={"medicamento"}
                                        name={"medicamento"}
                                        placeholder='Medicamento'
                                        value={medicamento}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"tipoDePaciente"}>Tipo de Paciente</Label>
                                    <Input
                                        id={"tipoDePaciente"}
                                        name={"tipoDePaciente"}
                                        placeholder='Tipo de Paciente'
                                        value={tipoDePaciente}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                            </TabsColumnItem>
                        </TabsContent>

                        <TabsContent value={"additional-information"} columns={1}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <TabsContentContainer>
                                    <Label htmlFor={"solicitante"}>Solicitante</Label>
                                    <Input
                                        id={"solicitante"}
                                        name={"solicitante"}
                                        placeholder='Solicitante'
                                        value={solicitante}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"nombreSolicitante"}>Nombre del Solicitante</Label>
                                    <Input
                                        id={"nombreSolicitante"}
                                        name={"nombreSolicitante"}
                                        placeholder='Nombre del Solicitante'
                                        value={nombreSolicitante}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"observacion"}>Observacion</Label>
                                    <Input
                                        id={"observacion"}
                                        name={"observacion"}
                                        placeholder='Observacion'
                                        value={observacion}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <ToggleButton
                                        label={"¿Padres Divorciados?"}
                                        onChange={handleToggle("padresDivorciados")}
                                        isToggled={formData.padresDivorciados}
                                        name="padresDivorciados"
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <ToggleButton
                                        label={"¿Embarazada?"}
                                        onChange={handleToggle("embarazadas")}
                                        isToggled={formData.embarazadas}
                                        name="embarazadas"
                                    />
                                </TabsContentContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value={"billing"} columns={2}>
                            <TabsColumnItem>
                                <TabsContentContainer>
                                    <Label htmlFor={"noAutorizacion"}>No. Autorizacion</Label>
                                    <Input
                                        id={"noAutorizacion"}
                                        name={"noAutorizacion"}
                                        placeholder='No. Autorizacion'
                                        value={noAutorizacion}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"valorReclamado"}>Valor Reclamado</Label>
                                    <Input
                                        id={"valorReclamado"}
                                        name={"valorReclamado"}
                                        placeholder='Valor Reclamado'
                                        value={valorReclamado}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <Label htmlFor={"totalDeReclamaciones"}>Total de Reclamaciones</Label>
                                    <Input
                                        id={"totalDeReclamaciones"}
                                        name={"totalDeReclamaciones"}
                                        placeholder='Total de Reclamaciones'
                                        value={totalDeReclamaciones}
                                        onChange={handleChange}
                                    />
                                </TabsContentContainer>
                            </TabsColumnItem>
                            <TabsColumnItem>
                                <TabsContentContainer>
                                    <ToggleButton
                                        label={"Revisado"}
                                        onChange={handleToggle("revisado")}
                                        isToggled={revisado}
                                        name="revisado"
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <ToggleButton
                                        label={"¿Factura valida?"}
                                        onChange={handleToggle("validFact")}
                                        isToggled={validFact}
                                        name="validFact"
                                    />
                                </TabsContentContainer>
                                <TabsContentContainer>
                                    <ToggleButton
                                        label={"¿Objetado?"}
                                        onChange={handleToggle("objetado")}
                                        isToggled={objetado}
                                        name="objetado"
                                    />
                                </TabsContentContainer>
                            </TabsColumnItem>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={submitForm}
                    >Agregar</Button>
                    <Button
                        onClick={onClose}
                        className="outline"
                    >Cancelar</Button>
                </CardFooter>
            </Card>
        </Modal>
    );
};

AddServiceRequestModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
};

export default AddServiceRequestModal;