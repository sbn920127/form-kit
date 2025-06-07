import React from 'react';
import { FieldConfig } from "types/fieldTypes";

export type ComponentMap = {
    [type: string]: React.ComponentType<any>
}

interface FieldRendererProps {
    field: FieldConfig<any>
    value: any;
    onChange: (value: any) => void;
    components: ComponentMap;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
    field,
    value,
    onChange,
    components
}) => {
    const Component = components[field.type];

    if (!Component) {
        return <div style={{ color: 'red' }}>Unknown field type: {field.type}</div>
    }

    return (
        <Component
            {...field.props}
            value={value}
            onChange={onChange}
        />
    );
};
