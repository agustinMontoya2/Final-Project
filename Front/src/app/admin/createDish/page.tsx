
import FormularioMenu from '@/components/FormAddDish/FormAddDish'
import React, { Suspense } from 'react'

const profileAdmin = () => {
return (
    <Suspense  fallback={<div>Loading...</div>}>


    <div>
        <FormularioMenu/>
    </div>
    </Suspense>
)
}

export default profileAdmin
