/* import AppointmentForm from "../../components/appointment-form/appointment-form.component"
import HistoriaClinica from "../../components/medical-history/medical-history.component" */
import MedicalAppointmentForm from "../../components/medical-appointment/medical-appointment-form"


const Home = () => {
    return (
        <div>
            <h3>Home Page</h3>
            <MedicalAppointmentForm />
            {/* <AppointmentForm />
            <HistoriaClinica /> */}
        </div>
    );
};

export default Home
