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

const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`; 
};

const generateRandomBorderColor = () => {
    const r = 20;
    const g = 20;
    const b = 20;
    return `rgba(${r}, ${g}, ${b}, 1)`; 
};

const GraficoDeTortaPlato: React.FC<{ SaleData: ISales }> = ({ SaleData }) => {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

   
    const allDishesData = generateDishesData(SaleData.Orders_made || []);
    const allDishLabels = Object.keys(allDishesData);
    const allDishValues = Object.values(allDishesData);

    
    const filteredDishData = selectedProduct
        ? { [selectedProduct]: allDishesData[selectedProduct] }
        : allDishesData;

    const dishLabels = Object.keys(filteredDishData);
    const dishValues = Object.values(filteredDishData);

    // Generate colors
    const backgroundColors = dishLabels.map(() => generateRandomColor());
    const borderColors = dishLabels.map(() => generateRandomBorderColor());

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

    
    const handleProductFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedProduct(value !== '' ? value : null);
    };

    return (
        <div className="w-full h-full flex flex-row ">
        <div className="mb-4">
                <label htmlFor="productFilter">Filter by Product: </label>
                <select
                    id="productFilter"
                    value={selectedProduct || ''}
                    onChange={handleProductFilterChange}
                >
                    <option value="">All Products</option>
                    {allDishLabels.map((productName, index) => (
                        <option key={index} value={productName}>
                            {productName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-2/4 h-2/4">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};



export default GraficoDeTortaPlato ;