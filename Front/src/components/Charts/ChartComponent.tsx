import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { ISales } from '@/interfaces/productoInterface';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart: React.FC<{ SaleData: ISales['SaleData'] }> = ({ SaleData }) => {
    // Asumiendo que SaleData tiene un array de fechas en 'dates'
    const salesDates = SaleData.dates.map(dateStr => new Date(dateStr)); // Convertimos las fechas en objetos Date

    // Formateamos las fechas al formato "MES dd/mm/yy"
    const formattedDates = salesDates.map(date =>
        new Intl.DateTimeFormat('es-ES', {
            month: 'short', // Muestra el mes abreviado
            day: '2-digit', 
            year: 'numeric'
        }).format(date)
    );

    const data = {
        labels: formattedDates,  // Fechas en el eje Y
        datasets: [
            {
                label: 'Dishes',
                data: [parseFloat(SaleData.Dishes)],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Reserved Tables',
                data: [SaleData.Reserved_tables],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Orders Made',
                data: [SaleData.Orders_made],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Orders Pending',
                data: [SaleData.Orders_pending],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                label: 'Orders Cancelled',
                data: [SaleData.Orders_cancelled],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Users Total',
                data: [SaleData.Users_total],
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        indexAxis: 'y',  // Cambiamos el eje X al Y para mostrar fechas en Y
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Cantidad',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Mes dd/mm/yy',
                },
                ticks: {
                    autoSkip: false, // Mostrar todas las etiquetas en el eje Y
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Metrics Overview',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default SalesChart;