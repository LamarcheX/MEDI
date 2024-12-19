import PropTypes from "prop-types";
import { Button } from "../UI/button.styles";
import { Input } from "../UI/input.styles";
import { FilterSection } from "./citas-filters.styles";

const CitasFilters = ({ filters, onSubmit, onFilterChange }) => {
    const pressedKey = (e) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    const handleFilterChange = (key, value) => {
        onFilterChange({
            ...filters,
            [key]: value
        });
    }
    
    return (
        <FilterSection>
            <p>Filtros:</p>
            <Input
                id="search"
                type="text"
                placeholder="Buscar por paciente, cédula o servicio..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                onKeyDown={pressedKey}
            />
            <Button
                onClick={onSubmit}
            >
                Buscar
            </Button>
        </FilterSection>
    );
};

CitasFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default CitasFilters;
