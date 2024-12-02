import PropTypes from 'prop-types';
import styled from 'styled-components';

// Card-related components
const CardWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;
`;

const CardHeader = styled.div`
  padding: 16px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CardContent = styled.div`
  padding: 24px;
  background: white;
`;

// Badge component
const BadgeWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  margin-right: 8px;
  color: ${({ variant }) => (variant === 'success' ? '#16a34a' : variant === 'secondary' ? '#6b7280' : variant === 'destructive' ? '#dc2626' : '#fff')};
  background-color: ${({ variant }) =>
        variant === 'success' ? '#d1fae5' :
            variant === 'secondary' ? '#f3f4f6' :
                variant === 'destructive' ? '#fee2e2' : '#4b5563'};
`;

// Section and Field Styles
const SectionWrapper = styled.div`
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLabel = styled.label`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 4px;
`;

const FieldValue = styled.p`
  font-size: 1rem;
  color: #374151;
`;

// Special Conditions Styles
const SpecialConditionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

// Main Component
const ServiceRequestDetails = ({ serviceRequest = {} }) => {
    if (!serviceRequest) {
        return (
            <CardWrapper>
                <CardContent>
                    <p style={{ textAlign: 'center', color: '#6b7280' }}>No service request data available</p>
                </CardContent>
            </CardWrapper>
        );
    }

    const sections = [
        {
            title: "Patient Information",
            fields: [
                { label: "Patient Name", value: serviceRequest.nombrePaciente },
                { label: "Age", value: serviceRequest.edad },
                { label: "Age Range", value: serviceRequest.rangoDeEdad },
                { label: "Gender", value: serviceRequest.genero },
                { label: "Nationality", value: serviceRequest.nacionalidad },
                { label: "ID Number", value: serviceRequest.noCedula },
                { label: "Patient Type", value: serviceRequest.tipoDePaciente },
                { label: "ARS Affiliation", value: serviceRequest.afiliacionArs },
                { label: "NSS/Contract", value: serviceRequest.nssOContrato }
            ]
        },
        {
            title: "Service Information",
            fields: [
                {
                    label: "Date",
                    value: serviceRequest.fecha ? new Date(serviceRequest.fecha).toLocaleDateString() : null
                },
                { label: "Month", value: serviceRequest.mes },
                { label: "Year", value: serviceRequest.ano },
                { label: "Specialist", value: serviceRequest.especialista },
                { label: "Service Type", value: serviceRequest.tipoDeServicio },
                { label: "Dispensary Name", value: serviceRequest.nombreDeDispensario }
            ]
        },
        {
            title: "Medical Information",
            fields: [
                { label: "Diagnostic Category", value: serviceRequest.categoriaDiagnostico },
                { label: "Diagnostic Description", value: serviceRequest.descripcionDiagnostico },
                { label: "Medication", value: serviceRequest.medicamento }
            ]
        },
        {
            title: "Requestor Information",
            fields: [
                { label: "Requestor", value: serviceRequest.solicitante },
                { label: "Requestor Name", value: serviceRequest.nombreSolicitante },
                { label: "Address", value: serviceRequest.direccion },
                { label: "Province", value: serviceRequest.provincia }
            ]
        },
        {
            title: "Financial Information",
            fields: [
                { label: "Authorization Number", value: serviceRequest.noAutorizacion },
                {
                    label: "Claimed Value",
                    value: serviceRequest.valorReclamado ? `$${serviceRequest.valorReclamado.toLocaleString()}` : null
                },
                { label: "Total Claims", value: serviceRequest.totalDeReclamaciones }
            ]
        }
    ];

    return (
        <CardWrapper>
            <CardHeader>
                <CardTitle>Service Request Details</CardTitle>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <BadgeWrapper variant={serviceRequest.revisado ? "success" : "secondary"}>
                        {serviceRequest.revisado ? "Reviewed" : "Pending Review"}
                    </BadgeWrapper>
                    <BadgeWrapper variant={serviceRequest.validFact ? "success" : "secondary"}>
                        {serviceRequest.validFact ? "Valid" : "Invalid"} Invoice
                    </BadgeWrapper>
                    <BadgeWrapper variant={serviceRequest.objetado ? "destructive" : "success"}>
                        {serviceRequest.objetado ? "Objected" : "Not Objected"}
                    </BadgeWrapper>
                </div>
            </CardHeader>
            <CardContent>
                <div style={{ marginTop: '24px' }}>
                    {sections.map((section, index) => (
                        <SectionWrapper key={index}>
                            <SectionTitle>{section.title}</SectionTitle>
                            <FieldGrid>
                                {section.fields.map((field, fieldIndex) => (
                                    <FieldWrapper key={fieldIndex}>
                                        <FieldLabel>{field.label}</FieldLabel>
                                        <FieldValue>{field.value || "Not provided"}</FieldValue>
                                    </FieldWrapper>
                                ))}
                            </FieldGrid>
                        </SectionWrapper>
                    ))}

                    {serviceRequest.observacion && (
                        <SectionWrapper>
                            <SectionTitle>Additional Information</SectionTitle>
                            <FieldWrapper>
                                <FieldLabel>Observations</FieldLabel>
                                <FieldValue>{serviceRequest.observacion}</FieldValue>
                            </FieldWrapper>
                        </SectionWrapper>
                    )}

                    <SectionWrapper>
                        <SectionTitle>Special Conditions</SectionTitle>
                        <SpecialConditionsWrapper>
                            <BadgeWrapper variant={serviceRequest.padresDivorciados ? "default" : "secondary"}>
                                {serviceRequest.padresDivorciados ? "Parents Divorced" : "Parents Not Divorced"}
                            </BadgeWrapper>
                            <BadgeWrapper variant={serviceRequest.embarazadas ? "default" : "secondary"}>
                                {serviceRequest.embarazadas ? "Pregnant" : "Not Pregnant"}
                            </BadgeWrapper>
                        </SpecialConditionsWrapper>
                    </SectionWrapper>
                </div>
            </CardContent>
        </CardWrapper>
    );
};

ServiceRequestDetails.propTypes = {
    serviceRequest: PropTypes.object
};

export default ServiceRequestDetails;
