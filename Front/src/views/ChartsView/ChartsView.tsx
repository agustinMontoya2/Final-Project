"use client"
import SalesChart from '@/components/Charts/ChartComponent';
import { ISales } from '@/interfaces/productoInterface';
import React, { useState, useEffect } from 'react';


const ChartsView = () => {
    const saleData: ISales['SaleData'] = {
        Dishes: '500',
        Reserved_tables: 120,
        Orders_made: 300,
        Orders_pending: 50,
        Orders_cancelled: 20,
        Users_total: 1000,
    };
    // En un caso real, puedes obtener estos datos de una API
    useEffect(() => {
        // Aquí podrías hacer una llamada a una API para obtener los datos de ventas
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Panel de Ventas</h1>
            <div className="mt-8">
                <SalesChart SaleData={saleData} />
            </div>
        </div>
    );
};

export default ChartsView;