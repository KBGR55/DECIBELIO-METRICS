import React, { useEffect, useState } from 'react';
import { peticionGet } from '../utilities/hooks/Connection';
import { mensajesSinRecargar } from '../utilities/Mensajes';

const Metric = () => {
    const [metrics, setMetrics] = useState([]);
    const [filteredMetrics, setFilteredMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const metricsPerPage = 10;
    const token = 'tu-token-api';

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await peticionGet(token, `metric/paginated?page=${currentPage}&limit=${metricsPerPage}`);
                if (data.code === 200) {
                    setMetrics(data.info || []);
                    setFilteredMetrics(data.info || []);
                    setTotalPages(data.pagination.totalPages || 1);
                } else {
                    mensajesSinRecargar('No se pudieron cargar las métricas', 'error', 'Error');
                }
            } catch (error) {
                console.error('Error al obtener métricas:', error);
                mensajesSinRecargar('Error en el servidor al obtener métricas', 'error', 'Error');
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [currentPage]); 

    const changePage = (num) => {
        if (num > 0 && num <= totalPages) setCurrentPage(num);
    };

    const currentMetrics = filteredMetrics;

    if (loading) {
        return (
            <div className="text-center mt-4">
                <p>Cargando métricas...</p>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="azul-oscuro mb-4 text-center fw-bold">Métricas registradas</h2>

            {currentMetrics.length === 0 ? (
                <p>No hay métricas registradas.</p>
            ) : (
                <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-dark">
                            <tr>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Valor</th>
                                <th>Latitud</th>
                                <th>Longitud</th>
                                <th>Sensor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMetrics.map((metric) => (
                                <tr key={metric.id}>
                                    <td>{metric.date}</td>
                                    <td>{metric.time}</td>
                                    <td>{metric.value}</td>
                                    <td>{metric.geoLatitude}</td>
                                    <td>{metric.geoLongitude}</td>
                                    <td>{metric.sensorExternalId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {totalPages > 1 && (
                <nav className="mt-3">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                            <button className="page-link" onClick={() => changePage(currentPage - 1)}>Anterior</button>
                        </li>
                        <li className="page-item disabled">
                            <span className="page-link">
                                Página {currentPage} de {totalPages}
                            </span>
                        </li>
                        <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                            <button className="page-link" onClick={() => changePage(currentPage + 1)}>Siguiente</button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Metric;