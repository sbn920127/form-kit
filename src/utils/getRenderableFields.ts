import { FieldConfig } from "types/fieldTypes";

interface GetRenderableFieldsParams {
    fields: FieldConfig<any>[]
    values: Record<string, any>
}

export const getRenderableFields = ({ fields, values}: GetRenderableFieldsParams) => {
    return fields.filter((field: FieldConfig<any> ) => {
        if (typeof field.visible === 'function') {
            return field.visible(values);
        }
        return true;
    })
}
