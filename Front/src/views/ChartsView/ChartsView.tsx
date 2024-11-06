"use client"
import React, { useEffect, useState } from 'react';
import  SalesBarChart from '@/components/Charts/ChartComponent';
import { ISales } from '@/interfaces/productoInterface';
import * as XLSX from 'xlsx';
import { getProductsSalesDB } from '@/Helpers/salesStatus';

const getMonthName = (monthIndex: number): string => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
};



const ChartsView = () => {
    const [salesData, setSalesData] = useState<ISales | null>(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const data = await getProductsSalesDB();
                console.log('Fetched sales data:', data);
                setSalesData(data);
            } catch (error: any) {
                if (error instanceof Error) {
                    console.error('Error fetching sales data:', error.message);
                }
            }
        };
        fetchSalesData();
    }, []);

    // if (!salesData) {
    //     return <p>No sales data available</p>;
    // }


    const exportToExcel = () => {
        if (!salesData) return;
    
        const currentMonthIndex = new Date().getMonth();
        const currentMonthName = getMonthName(currentMonthIndex);
    
        const dishesData = Object.entries(salesData.Dishes).map(([dishName, quantity]) => ({
            Dish: dishName,
            Quantity: quantity
        }));
    
        const worksheet = XLSX.utils.json_to_sheet([
            {
                Month: currentMonthName,
                Reserved_Tables: salesData.Reserved_tables.length,  
                Orders_Made: salesData.Orders_made.length,          
                Orders_Pending: salesData.Orders_pending.length,   
                Orders_Cancelled: salesData.Orders_cancelled.length, 
                Users_Total: salesData.Users_total.length,          
            },
            ...dishesData
        ]);
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");
    
        XLSX.writeFile(workbook, `SalesData_${currentMonthName}.xlsx`);
    };
    console.log("salesData", salesData)

    return salesData ? (
        <div className="relative">
            <h3 className="p-4 text-lg flex flex-col justify-center items-center">Sales Panel</h3>
            <div className="absolute top-4 right-4">
                <button onClick={exportToExcel} className='m-2 bg-secondary rounded-lg p-2 text-white'>
                    Download Sales Data
                </button>
            </div>
            <div className="mt-8">
                <SalesBarChart SaleData={salesData} />
            </div>
        </div>
    ) : (
        <p>Loading sales data...</p>
    );
};

export default ChartsView;