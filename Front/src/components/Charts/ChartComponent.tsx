import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    ChartOptions,
} from 'chart.js';
import { ISales } from '@/interfaces/productoInterface';


ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);


const SalesBarChart: React.FC<{ SaleData: ISales['SaleData'] }> = ({ SaleData }) => {

    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());


    useEffect(() => {
        const monthInterval = setInterval(() => {
            const now = new Date().getMonth();
            setCurrentMonth(now);
        }, 1000 * 60 * 60 * 24);

        return () => clearInterval(monthInterval);
    }, []);


    const salesData: { [key: string]: number[] } = {
        Reserved_tables: Array(12).fill(0),
        Orders_made: Array(12).fill(0),
        Orders_pending: Array(12).fill(0),
        Orders_cancelled: Array(12).fill(0),
        Users_total: Array(12).fill(0),
    };


    salesData.Reserved_tables[currentMonth] = SaleData.Reserved_tables;
    salesData.Orders_made[currentMonth] = SaleData.Orders_made;
    salesData.Orders_pending[currentMonth] = SaleData.Orders_pending;
    salesData.Orders_cancelled[currentMonth] = SaleData.Orders_cancelled;
    salesData.Users_total[currentMonth] = SaleData.Users_total;

    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Reserved Tables',
                data: salesData.Reserved_tables,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Orders Made',
                data: salesData.Orders_made,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Orders Pending',
                data: salesData.Orders_pending,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
            {
                label: 'Orders Cancelled',
                data: salesData.Orders_cancelled,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
            {
                label: 'Total Clients',
                data: salesData.Users_total,
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Opciones del gráfico
    const options: ChartOptions<'bar'> = {
        responsive: true,
        scales: {
            x: {
                stacked: false,
                title: {
                    display: true,
                    text: 'Months',
                },
            },
            y: {
                stacked: false,
                title: {
                    display: true,
                    text: 'Amount',
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


const GraficoDeTortaPlato: React.FC<{ SaleData: ISales['SaleData'] }> = ({ SaleData }) => {

    const dishLabels = Object.keys(SaleData.Dishes);
    const dishData = Object.values(SaleData.Dishes);

    const data = {
        labels: dishLabels,
        datasets: [
            {
                label: 'Dishes Sold',
                data: dishData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Dishes Sold in the Month',
            },
        },
    };

    return (
        <div className="w-96 h-96">
            <Doughnut data={data} options={options} />
        </div>)

};

export { SalesBarChart, GraficoDeTortaPlato };