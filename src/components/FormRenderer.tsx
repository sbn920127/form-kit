import React from 'react';
import { FieldConfig, FormMetadata } from "types/fieldTypes";
import { buildFormDefaults } from "utils/buildFormDefaults";
import { useFormController } from "hooks/useFormController";
import { buildSchemaFromFields } from "utils/buildSchemaFromFields";
import { getRenderableFields } from "utils/getRenderableFields";
import { FieldRenderer } from "renderers/FieldRenderer";

type FormRendererProps = {
    metadata: FormMetadata,
    components: Record<string, React.FC<any>>, // ex: { text: InputField, select: SelectField }
    onSubmit: (values: Record<string, any>) => void,
}

const FormRenderer: React.FC<FormRendererProps> = ({metadata, components, onSubmit}) => {
    const steps = metadata.steps;
    const defaultValues = buildFormDefaults(steps.flatMap(step => step.fields));

    const {
        currentStep,
        currentStepIndex,
        values,
        errors,
        updateValue,
        onNext,
        onBack,
        setFieldError,
        clearErrors
    } = useFormController(steps, defaultValues);

    const handleNext = () => {
        clearErrors()

        const schema = buildSchemaFromFields(currentStep.fields);
        const result = schema.safeParse(values);

        if (!result.success) {
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    setFieldError(err.path[0].toString(), err.message);
                }
            })
            return;
        }

        if (currentStepIndex < steps.length - 1) {
            onNext();
        } else if (onSubmit) {
            onSubmit(values);
        }
    }

    const renderFields = () => {
        const visibleFields = getRenderableFields({
            fields: currentStep.fields,
            values
        })

        return visibleFields.map((field: FieldConfig) => (
            <div key={field.key} style={{marginBottom: '1rem'}}>
                <FieldRenderer field={field} value={values[field.key]}
                               onChange={(val: any) => updateValue(field.key, val)} components={components}/>
                {errors[field.key] && (
                    <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors[field.key]}</div>
                )}
            </div>
        ))
    }


    return (
        <div>
            <h3>{currentStep.title ?? `Step ${currentStepIndex + 1}`}</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleNext()
                }}
            >
                {renderFields()}

                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    {currentStepIndex > 0 && (
                        <button type="button" onClick={onBack}>
                            上一步
                        </button>
                    )}
                    <button type="submit">
                        {currentStepIndex === steps.length - 1 ? '送出' : '下一步'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormRenderer;
