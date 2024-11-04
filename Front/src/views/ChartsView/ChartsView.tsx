"use client";
import React, { useEffect } from 'react';
import { SalesBarChart, GraficoDeTortaPlato } from '@/components/Charts/ChartComponent';
import { ISales } from '@/interfaces/productoInterface';
import * as XLSX from 'xlsx';


const getMonthName = (monthIndex: number): string => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
};


const ChartsView = () => {
    //const [salesData, setSalesData] = useState<ISales['SaleData'] | null>(null);
    const saleData: ISales['SaleData'] = {
        Dishes: {
            "fideos con salsa": 20,
            "lentejas": 15,
            "canelones": 10,
        },
        Reserved_tables: 120,
        Orders_made: 300,
        Orders_pending: 50,
        Orders_cancelled: 20,
        Users_total: 1000,
    };

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


    const exportToExcel = () => {
        const currentMonthIndex = new Date().getMonth();
        const currentMonthName = getMonthName(currentMonthIndex);
        const dishesData = Object.entries(saleData.Dishes).map(([dishName, quantity]) => ({
            Dish: dishName,
            Quantity: quantity
        }));


        
        const worksheet = XLSX.utils.json_to_sheet([
            {
                Month: currentMonthName,
                Reserved_Tables: saleData.Reserved_tables,
                Orders_Made: saleData.Orders_made,
                Orders_Pending: saleData.Orders_pending,
                Orders_Cancelled: saleData.Orders_cancelled,
                Users_Total: saleData.Users_total,
            },
            ...dishesData
        ]);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");


        XLSX.writeFile(workbook, `SalesData_${currentMonthName}.xlsx`);
    };


    return (
        <div className="relative">
        <h3 className="p-4 text-lg flex flex-col justify-center items-center">Sell Panel</h3>
        <div className="absolute top-4 right-4">
            <button onClick={exportToExcel} className='m-2 bg-secondary rounded-lg p-2 text-white'>
                Download Sales Data
            </button>
        </div>
        <div className="mt-8">
            <SalesBarChart SaleData={saleData} />
        </div>
        <div className="mt-8 flex flex-col items-center justify-center">
            <GraficoDeTortaPlato SaleData={saleData} />
        </div>
    </div>
    );
};

export default ChartsView;