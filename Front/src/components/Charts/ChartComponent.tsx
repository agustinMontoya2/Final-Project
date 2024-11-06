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
import { IOrder, ISales } from '@/interfaces/productoInterface';




ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);


const SalesBarChart: React.FC<{ SaleData: ISales }> = ({ SaleData }) => {
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

    useEffect(() => {
        const monthInterval = setInterval(() => {
            const now = new Date().getMonth();
            setCurrentMonth(now);
            setSelectedMonth(now);
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


    salesData.Reserved_tables[selectedMonth] = SaleData.Reserved_tables.filter(res => new Date(res.date).getMonth() === selectedMonth).length;
    salesData.Orders_made[selectedMonth] = SaleData.Orders_made.filter(order => new Date(order.date).getMonth() === selectedMonth).length;
    salesData.Orders_pending[selectedMonth] = SaleData.Orders_pending.filter(order => new Date(order.date).getMonth() === selectedMonth).length;
    salesData.Orders_cancelled[selectedMonth] = SaleData.Orders_cancelled.filter(order => new Date(order.date).getMonth() === selectedMonth).length;
    salesData.Users_total[selectedMonth] = SaleData.Users_total[selectedMonth] ?? 0; 

    console.log(salesData, "aaaaaaaaaaaaaaaaaa")
    console.log(SaleData, "aaaaaaaaaaaaaaaa")


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
    console.log(salesData.Orders_made, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(Number(event.target.value));
    };

    return (
        <div>
            <div>
                <label htmlFor="monthSelect">Select Month: </label>
                <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                    {data.labels.map((label, index) => (
                        <option key={index} value={index}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};


const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`; // For background color
};

const generateRandomBorderColor = () => {
    const r = (20);
    const g = (20);
    const b = (20);
    return `rgba(${r}, ${g}, ${b}, 1)`; // For border color
};


const generateDishesData = (orders: IOrder[]): { [key: string]: number } => {
    return orders.reduce((acc, order) => {
        if (order.orderDetail) { 
            order.orderDetail.productDetails.forEach((detail) => {
                const productName = detail.product?.product_name;
                const quantity = parseFloat(detail.quantity); 

                if (productName) {
                    
                    acc[productName] = (acc[productName] || 0) + quantity;
                }
            });
        }
        return acc;
    }, {} as { [key: string]: number });
};

const GraficoDeTortaPlato: React.FC<{ SaleData: ISales }> = ({ SaleData }) => {
    const dishData = generateDishesData(SaleData.Orders_made || []);
    const dishLabels = Object.keys(dishData);
    const dishValues = Object.values(dishData);

    // Generate a unique color for each dish
    const backgroundColors = dishLabels.map(() => generateRandomColor());
    const borderColors = dishLabels.map(() => generateRandomBorderColor());

    /*
    // Alternatively, use predefined colors (uncomment if needed)
    const predefinedColors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        // Add more colors if needed
    ];

    const predefinedBorderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        // Add more border colors if needed
    ];

    const backgroundColors = dishLabels.map((_, index) => predefinedColors[index % predefinedColors.length]);
    const borderColors = dishLabels.map((_, index) => predefinedBorderColors[index % predefinedBorderColors.length]);
    */

    const data = {
        labels: dishLabels,
        datasets: [
            {
                label: 'Dishes Sold',
                data: dishValues,
                backgroundColor: backgroundColors, 
                borderColor: borderColors, 
                borderWidth: 0.5,
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
        </div>
    );
};


export { SalesBarChart, GraficoDeTortaPlato };