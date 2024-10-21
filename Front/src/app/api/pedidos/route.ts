// src/app/api/pedidos/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
const pedidosSimulados = [
    { id: 1234, detalle: 'Pedido 1: Descripción del pedido', estado: 'pendiente' },
    { id: 1235, detalle: 'Pedido 2: Descripción del pedido', estado: 'completado' },
    { id: 1236, detalle: 'Pedido 3: Descripción del pedido', estado: 'pendiente' },
    { id: 1237, detalle: 'Pedido 4: Descripción del pedido', estado: 'preparando' },
];

return NextResponse.json(pedidosSimulados);
}
