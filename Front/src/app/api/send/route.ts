import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend("re_XjW31q9K_2q7NCnHsZrujqCe7qWB57AKt");

export async function POST(req: any, res: NextApiResponse) {
    try {
        const { name, email, msg, address, telephone, position, date, file } = await req.json();
        const title = [name, email, telephone, address, position, date, file].filter(Boolean).length > 4
        ? "Nueva postulacion para trabajar"
        : "Nuevo mensaje de contacto";
        const reason = [name, email, telephone, address, position, date].filter(Boolean).length > 4
        ? "CV"
        : "Contacto";
        console.log(name, email, msg, address);
        const data = await resend.emails.send({
            from: 'Club Fellini - Bar <onboarding@resend.dev>',
            to: ['santiagocelis2004@gmail.com'],
            subject: `${reason}`,
            html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                        <h2 style="color: #333;">${title}</h2>
                        ${name ? `<p><strong>Nombre:</strong> ${name}</p><hr style="border: 1px solid #ccc;">` : ''}
                        ${email ? `<p><strong>Email:</strong> ${email}</p><hr style="border: 1px solid #ccc;">` : ''}
                        ${msg ? `<p><strong>Mensaje:</strong> ${msg}</p><hr style="border: 1px solid #ccc;">` : ''}
                        ${telephone ? `<p><strong>Teléfono:</strong> ${telephone}</p><hr style="border: 1px solid #ccc;">` : ''}
                        ${address ? `<p><strong>Dirección:</strong> ${address}</p><hr style="border: 1px solid #ccc;">` : ''}
                        ${position ? `<p><strong>Puesto de interés:</strong> ${position}</p><hr style="border: 1px solid #ccc;">` : ''}
                        ${date ? `<p><strong>Fecha de postulación:</strong> ${date}</p><hr style="border: 1px solid #ccc;">` : ''}
                        ${file ? `<p><strong>Archivo:</strong> ${file}</p><hr style="border: 1px solid #ccc;">` : ''}
                    </div>
                `
        });

        console.log(data);

        return NextResponse.json(
            { message: "Email Sent" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error" },
            { status: 500 }
        );
    }
};
