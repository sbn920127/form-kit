import { FieldConfig } from "types/fieldTypes";

/**
 * 根據欄位設定產出 defaultValues
 * @param fields 欄位設定陣列
 * @returns 表單預設值物件
 */
export const buildFormDefaults = ( fields: FieldConfig<any>[]): Record<string, any> => {
    const defaults: Record<string, any> = {};

    for (const field of fields) {
        defaults[field.key] = field.defaultValue !== undefined ? field.defaultValue : '';
    }

    return defaults;
}
