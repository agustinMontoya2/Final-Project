import React from 'react'

export default function ReserveCard() {

    // const handleClick = () => {
    //     const confirmCancel = window.confirm(`¿Desea cancelar la reserva del día ${date} a las ${time}hs?\nNo se podrá volver a activar`);
    //     if (confirmCancel) {
    //         postStatus("cancelled"); // Envia el nuevo estado a la base de datos
    //     }
    // };

    return (
        <div>
            <div>
                <p>Fecha: </p>
                <p>Horario: hs</p>
                <p>Cantidad de personas:</p>
                {/* {
                    currentStatus === "cancelled" ? (
                        <p onClick={cancel} className={styles.cancelled} id={styles.status}>
                            CANCELADO
                        </p>
                    ) : (
                        <p onClick={handleClick} className={styles.active} id={styles.status}>
                            ACTIVO
                        </p>
                    )
                } */}
            </div>
        </div>
    );
}
