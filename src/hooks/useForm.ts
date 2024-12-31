import { ChangeEvent, useEffect, useMemo, useState } from 'react';

interface Validation {
    formField: string;
    fn: (value: any) => boolean;
    message: string;
}

interface FormStateProp {
    [key: string]: any;
}

type FormWithValidation<T extends FormStateProp> = {
        [K in keyof T]: T[K]; // Include form fields directly
    } & 
  {
    [K in keyof T & string as `${K}Valid`]?: string | null; // Include validation keys directly
  };

//*   [K in keyof T]  // Iterates over each key in type T
//* as              // Remaps the key to a new name
//* The expression T & string says that only T keys that are string are gonna be taken into account.
//* `${K}Valid` // Creates a new key name by adding "Valid" suffix
//* ?: string | null     // Makes it an optional property that can be string or null

export const useForm = <T extends FormStateProp>( initialForm: T , initialValidations: Validation[] ) => {

    const [formState, setFormState] = useState(initialForm);
    // const [formValidation, setFormValidation] = useState<{ [key: string]: string | null }>({});
    const [formValidation, setFormValidation] = useState<FormWithValidation<T>>({} as FormWithValidation<T>);

    const onInputChange = ( { target }:ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
      setFormState( initialForm );
    }, [initialForm]);
    
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation) ) {
            if ( formValidation[formValue] !== null ) return false;
        }
        return true;
    }, [formValidation]);

    const createValidators = () => {
        const formCheckedValues: { [key: string]: string | null } = {};

        for (const validation of initialValidations) {
            const { formField, fn, message } = validation;
            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : message;
        }

        // console.log(formCheckedValues);
        setFormValidation(formCheckedValues as FormWithValidation<T>);
    }

  return {
    //Properties
    ...formState,
    formState,
    // ...formValidation,
    formValidation,
    ...formValidation,
    //Methods
    setFormState,
    onInputChange,
    isFormValid
  }
}
