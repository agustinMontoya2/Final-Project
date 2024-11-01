import React, { useEffect, useState } from 'react';
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
import { getProductsSalesDB } from '@/Helpers/salesStatus';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart: React.FC<{ SaleData: ISales['SaleData'] }> = ({ SaleData }) => {
    //const [salesData, setSalesData] = useState<ISales['SaleData'] | null>(null);
    // useEffect(() => {
    // const fetchSalesData = async getProductsSalesDB() => {
    //         try {
    //             const data = await ();
    //             setSalesData(data.SaleData); // Guardamos los datos de ventas en el estado
    //             setLoading(false);
    //         } catch (error: any) {
    //             if (error instanceof Error) {
    //         }
    //     };
    //     fetchSalesData();
    // }, []);
    // }

    // if (!salesData) {
    //     return <p>No sales data available</p>;
    // }

    const data = {
        labels: ['Metrics'],
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
        responsive: true,
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