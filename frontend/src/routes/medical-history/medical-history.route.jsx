import { useMemo, useState } from "react";
import TableFilters from "../../components/table-filter/table-filter.component";
import { MOCK_SERVICE_REQUESTS } from "../../constants/mock"
import ServiceRequestsTable from "../service/another-service";
import { MedicalHistoryWrapper, MedicalHistoryHeader } from "./medical-history.styles";
import { Button } from "../../components/UI/button.styles";
import AddServiceRequestModal from "../../components/modals/add-service-request/add-service-request.component";

const MedicalHistory = () => {
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        dateRange: 'all'
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [serviceRequested, setServiceRequested] = useState(MOCK_SERVICE_REQUESTS);

    const filteredRequests = useMemo(() => {
        return serviceRequested.filter(request => {
            const searchMatch = filters.search.toLowerCase() === '' ||
                request.nombrePaciente?.toLowerCase().includes(filters.search.toLowerCase()) ||
                request.noCedula?.toLowerCase().includes(filters.search.toLowerCase()) ||
                request.tipoDeServicio?.toLowerCase().includes(filters.search.toLowerCase());

            const statusMatch = filters.status === 'all' ||
                (filters.status === 'reviewed' && request.revisado) ||
                (filters.status === 'pending' && !request.revisado) ||
                (filters.status === 'valid' && request.validFact) ||
                (filters.status === 'invalid' && !request.validFact);

            let dateMatch = true;
            if (filters.dateRange !== 'all') {
                const requestDate = new Date(request.fecha);
                const today = new Date();
                const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
                const ninetyDaysAgo = new Date(today.setDate(today.getDate() - 90));

                dateMatch = filters.dateRange === '30days' ?
                    requestDate >= thirtyDaysAgo :
                    filters.dateRange === '90days' ?
                        requestDate >= ninetyDaysAgo :
                        true;
            }

            return searchMatch && statusMatch && dateMatch;
        });
    }, [serviceRequested, filters]);

    const handleAddServiceRequest = (newRequest) => {
        console.log(newRequest);
        setServiceRequested(prevRequests => [newRequest, ...prevRequests]);
    };

    return (
        <MedicalHistoryWrapper>
            <h1>Historial Medico</h1>
            <MedicalHistoryHeader>
                <TableFilters
                    filters={filters}
                    onFilterChange={setFilters}
                />
                <Button
                    title="Exportar"
                    buttonType="main"
                    onClick={() => setIsModalOpen(true)}
                >+ Agregar</Button>
            </MedicalHistoryHeader>
            <ServiceRequestsTable
                serviceRequests={filteredRequests}
                loading={false}
            />
            <AddServiceRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddServiceRequest}
            />
        </MedicalHistoryWrapper>
    );
};

export default MedicalHistory;
