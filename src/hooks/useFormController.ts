import { useState } from 'react';
import { FieldConfig } from "types/fieldTypes";

export type Step = {
    fields: FieldConfig[];
    key: string;
}

export const useFormController = (steps: Step[]) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [values, setValues] = useState<Record<string, any>>({})
    const [errors, setErrors] = useState<Record<string, any>>({});

    const currentStep = steps[currentStepIndex];

    const updateValue = (key: string, value: any) => {
        setValues((prev: Record<string, any>) => ({...prev, [key]: value}));
    }

    const next = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(i => i + 1)
        }
    }

    const back = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((i: number) => i - 1)
        }
    }

    const setFieldError = (key: string, message: string) => {
        setErrors((prev: Record<string, string>) => ({ ...prev, [key]: message }))
    }

    const clearErrors = () => setErrors({})

    return {
        currentStep,
        currentStepIndex,
        values,
        errors,
        updateValue,
        next,
        back,
        setFieldError,
        clearErrors,
    }
}
