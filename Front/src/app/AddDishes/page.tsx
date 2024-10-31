import React from 'react'
// import AuthValidation from '@/hooks/AuthValidation';
import FormAddDish from '@/views/FormsViews/FormAddDish';

const AddDish:React.FC = () => {

    // const esAdmin = AuthValidation()

    // if (esAdmin) {
    //     return <div> you are not admin, sending you BACK!</div>
    // }

    return (
        <div>
            <FormAddDish />
        </div>
    )
}

export default AddDish;
