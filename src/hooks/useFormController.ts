import { useState } from 'react';
import { FormStep } from "types/fieldTypes";

export const useFormController = (steps: FormStep[], initialValues: Record<string, any> = {}) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [values, setValues] = useState<Record<string, any>>(initialValues)
    const [errors, setErrors] = useState<Record<string, any>>({});

    const currentStep = steps[currentStepIndex];

    const updateValue = (key: string, value: any) => {
        setValues((prev: Record<string, any>) => ({...prev, [key]: value}));
    }

    const onNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(i => i + 1)
        }
    }

    const onBack = () => {
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
        onNext,
        onBack,
        setFieldError,
        clearErrors,
    }
}
