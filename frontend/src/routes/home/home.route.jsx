import { useDispatch, useSelector } from "react-redux";
import PreviousAppointments from "../../components/medical-appointment-history/medical-apointment-history";
import MedicalAppointmentForm from "../../components/medical-appointment/medical-appointment-form"
import { selectCitaReducer } from "../../store/cita/cita.selector";
import { useEffect } from "react";
import { getCitasStart } from "../../store/cita/cita.action";
import Pagination from "../../components/pagination/pagination.component";
import { pagination } from "../../constants/pagination";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCitasStart({payload: pagination}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        citas = [],
        isLoading,
        currentPage,
        totalPages,
        totalResults
    } = useSelector(selectCitaReducer);

    const handlePageChange = (page) => {
        const queries = { page };
        dispatch(getCitasStart({ queries }));
    };

    return (
        <div>
            <MedicalAppointmentForm />
            <PreviousAppointments
                citas={citas}
                loading={isLoading}
            />
            {totalPages > 1 &&
                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalResults={totalResults}
                onPageChange={handlePageChange}
                />
            }
        </div>
    );
};

export default Home
