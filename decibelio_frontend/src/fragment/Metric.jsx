import React, { useEffect, useState } from 'react';
import { peticionGet } from '../utilities/hooks/Connection';
import { mensajesSinRecargar } from '../utilities/Mensajes';

const Metric = () => {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = 'tu-token-api';

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await peticionGet(token, 'metric');
                if (data.code === 200) {
                    setMetrics(data.info || []);
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
    }, []);

    if (loading) return <p>Cargando métricas...</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Métricas registradas</h2>
            {metrics.length === 0 ? (
                <p>No hay métricas registradas.</p>
            ) : (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Valor</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th>Sensor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metrics.map((metric) => (
                            <tr key={metric.id}>
                                <td>{metric.id}</td>
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
            )}
        </div>
    );
};

export default Metric;