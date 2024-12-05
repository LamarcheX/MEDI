import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from '../../components/UI/card.styles';
import {
  TableWrapper,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableCell,
  ExpandableRow,
  ExpandedContentCell
} from '../../components/UI/table.styles.jsx';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  BadgeWrapper,
  HeaderContent,
  InfoBlock,
  InfoHeading,
  InfoItem,
  InfoLabel,
  InfoSection
} from './another-service.styles.jsx';
import { Badge } from '../../components/UI/badge.styles.jsx';
import TripleSpinner from '../../components/UI/triple-spinner.styles.jsx';

const ServiceRequestsTable = ({ serviceRequests = [], loading = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'fecha', direction: 'desc' });
  const [expandedRows, setExpandedRows] = useState(new Set());

  loading ?? <TripleSpinner />;

  if (!serviceRequests || serviceRequests.length === 0) {
    return (
      <Card>
        <CardContent>
          <p style={{ textAlign: 'center', color: '#6b7280' }}>No service requests available</p>
        </CardContent>
      </Card>
    );
  }

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const toggleRow = (_id) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(_id)) {
      newExpandedRows.delete(_id);
    } else {
      newExpandedRows.add(_id);
    }
    setExpandedRows(newExpandedRows);
  };

  const sortedRequests = [...serviceRequests].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Card>
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell onClick={() => handleSort('fecha')}>
                <HeaderContent>
                  Fecha 
                  {sortConfig.key === 'fecha' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </HeaderContent>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('nombrePaciente')}>
                <HeaderContent>
                  Info. del paciente 
                  {sortConfig.key === 'nombrePaciente' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </HeaderContent>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('tipoDeServicio')}>
                <HeaderContent>
                  Detalles del servicio 
                  {sortConfig.key === 'tipoDeServicio' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </HeaderContent>
              </TableHeaderCell>
              <TableHeaderCell onClick={() => handleSort('valorReclamado')}>
                <HeaderContent>
                  Finanzas 
                  {sortConfig.key === 'valorReclamado' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </HeaderContent>
              </TableHeaderCell>
              <TableHeaderCell>
                <HeaderContent>
                  Estatus
                </HeaderContent>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <tbody>
            {sortedRequests.map((request) => (
              <Fragment key={request._id}>
                <TableRow onClick={() => toggleRow(request._id)} open={expandedRows.has(request._id)} key={request._id}>
                  <TableCell>{request.fecha ? new Date(request.fecha).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>
                    <div>
                      <span>{request.nombrePaciente || 'N/A'}</span>
                      <span>Cedula: {request.noCedula}</span>
                      <span>Edad: {request.edad} ({request.rangoDeEdad})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span>Tipo de servicio: {request.tipoDeServicio} </span>
                      <span>Especialista: {request.especialista}</span>
                      <span>Centro: {request.nombreDeDispensario}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span>${request.valorReclamado?.toLocaleString() || 'N/A'}</span>
                      <span>Autorizacion: {request.noAutorizacion}</span>
                    </div>
                  </TableCell>
                  <TableCell last>
                    <span>
                      <BadgeWrapper>
                        <Badge variant={request.revisado ? 'success' : 'secondary'}>
                          {request.revisado ? 'Revisado' : 'Pendiente'}
                        </Badge>
                        <Badge variant={request.validFact ? 'success' : 'destructive'}>
                          {request.validFact ? 'Valido' : 'Invalido'}
                        </Badge>
                        {request.objetado && <Badge variant="destructive">Objectedo</Badge>}
                      </BadgeWrapper>
                      {expandedRows.has(request._id) ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </span>
                  </TableCell>
                </TableRow>
                {expandedRows.has(request._id) && (
                  <ExpandableRow>
                    <ExpandedContentCell colSpan={6}>
                      <InfoSection>
                        <InfoBlock>
                          <InfoHeading>Información Medical</InfoHeading>
                          <InfoItem><InfoLabel>Categoria de diagnóstico:</InfoLabel> {request.categoriaDiagnostico}</InfoItem>
                          <InfoItem><InfoLabel>Descripción:</InfoLabel> {request.descripcionDiagnostico}</InfoItem>
                          <InfoItem><InfoLabel>Medicación:</InfoLabel> {request.medicamento}</InfoItem>
                          <InfoItem><InfoLabel>Tipo de paciente:</InfoLabel> {request.tipoDePaciente}</InfoItem>
                          <InfoItem><InfoLabel>ARS:</InfoLabel> {request.afiliacionArs}</InfoItem>
                        </InfoBlock>
                        <InfoBlock>
                          <InfoHeading>Información Personal</InfoHeading>
                          <InfoItem><InfoLabel>Genero:</InfoLabel> {request.genero}</InfoItem>
                          <InfoItem><InfoLabel>Nacionalidad:</InfoLabel> {request.nacionalidad}</InfoItem>
                          <InfoItem><InfoLabel>Provincia:</InfoLabel> {request.provincia}</InfoItem>
                          <InfoItem><InfoLabel>Direccion:</InfoLabel> {request.direccion}</InfoItem>
                          <InfoItem><InfoLabel>NSS:</InfoLabel> {request.nssOContrato}</InfoItem>
                        </InfoBlock>
                        <InfoBlock>
                          <InfoHeading>Información Adicional</InfoHeading>
                          <InfoItem><InfoLabel>Solicitante:</InfoLabel> {request.solicitante}</InfoItem>
                          <InfoItem><InfoLabel>Nombre del solicitante:</InfoLabel> {request.nombreSolicitante}</InfoItem>
                          {request.observacion && <InfoItem><InfoLabel>Observaciones:</InfoLabel> {request.observacion}</InfoItem>}
                          <div>
                            <Badge variant={request.padresDivorciados ? 'default' : 'secondary'}>
                              {request.padresDivorciados ? 'Padres Divorciados' : 'Padres casados'}
                            </Badge>
                            <Badge variant={request.embarazadas ? 'default' : 'secondary'}>
                              {request.embarazadas ? 'Embarazada' : 'No Embarazada'}
                            </Badge>
                          </div>
                        </InfoBlock>
                      </InfoSection>
                    </ExpandedContentCell>
                  </ExpandableRow>
                )}
              </Fragment>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Card>
  );
};

ServiceRequestsTable.propTypes = {
  serviceRequests: PropTypes.array,
  loading: PropTypes.bool,
};

export default ServiceRequestsTable;
