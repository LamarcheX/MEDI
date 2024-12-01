// components/TableFilters/table-filters.styles.jsx
import styled from 'styled-components';

export const FilterSection = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    p {
        margin: 0;
        align-self: center;
    }
`;

export const FilterInput = styled.input`
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    min-width: 200px;
`;

export const FilterSelect = styled.select`
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
`;

// components/TableFilters/table-filters.component.jsx
import PropTypes from 'prop-types';

const TableFilters = ({ filters, onFilterChange }) => {
    const handleFilterChange = (key, value) => {
        onFilterChange({
            ...filters,
            [key]: value
        });
    };

    return (
        <FilterSection>
            <p>Filtros: </p>
            <FilterInput
                id="search"
                type="text"
                placeholder="Buscar por nombre, cedula o servicio..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
            />

            <FilterSelect
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
            >
                <option value="all">Todos los estados</option>
                <option value="reviewed">Revisados</option>
                <option value="pending">Pendientes</option>
                <option value="valid">Válidos</option>
                <option value="invalid">Inválidos</option>
            </FilterSelect>

            <FilterSelect
                id="dateRange"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
                <option value="all">Todas las fechas</option>
                <option value="30days">Últimos 30 días</option>
                <option value="90days">Últimos 90 días</option>
            </FilterSelect>
        </FilterSection>
    );
};

TableFilters.propTypes = {
    filters: PropTypes.shape({
        search: PropTypes.string,
        status: PropTypes.string,
        dateRange: PropTypes.string
    }).isRequired,
    onFilterChange: PropTypes.func.isRequired
};

export default TableFilters;