import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableFilters from "../../components/table-filter/table-filter.component";
import ServiceRequestsTable from "../service/another-service";
import { MedicalHistoryWrapper, MedicalHistoryHeader } from "./medical-history.styles";
import { Button } from "../../components/UI/button.styles";
import AddServiceRequestModal from "../../components/modals/add-service-request/add-service-request.component";
import { createHistoryStart, getHistoryByCenterStart } from "../../store/history/history.action";
import { selectHistoryReducer } from "../../store/history/history.selector";
import { selectCurrentCenter } from "../../store/center/center.selector";
import Pagination from "../../components/pagination/pagination.component";

const MedicalHistory = () => {
    const [filters, setFilters] = useState({ search: '', status: 'all', dateRange: 'all' });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const {
        history = [],
        isLoading,
        currentPage,
        totalPages,
        totalResults
    } = useSelector(selectHistoryReducer);
    const center = useSelector(selectCurrentCenter);

    useEffect(() => {
        dispatch(getHistoryByCenterStart({ idCentro: center._id }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredRequests = useMemo(() => {
        return history.filter(request => {
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
    }, [history, filters]);

    const handlePageChange = (page) => {
        const queries = { page }
        dispatch(getHistoryByCenterStart({ idCentro: center._id, queries }));
    };

    const handleSubmission = (data) => {
        const historyData = {
            ...data,
            idCentro: center._id
        };
        dispatch(createHistoryStart({ history: historyData }));
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
                loading={isLoading}
            />
            {totalResults < 1 &&
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalResults={totalResults}
                    onPageChange={handlePageChange}
                />
            }
            <AddServiceRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmission}
            />
        </MedicalHistoryWrapper>
    );
};

export default MedicalHistory;
