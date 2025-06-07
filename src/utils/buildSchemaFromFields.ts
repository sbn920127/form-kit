import { z } from 'zod';
import { FieldConfig } from "types/fieldTypes";

/**
 * 根據欄位設定產出 Zod schema，用於表單驗證
 * @param fields 欄位設定陣列
 * @returns Zod schema
 */
export const buildSchemaFromFields = (fields: FieldConfig<any>[]): z.ZodObject<any> => {
    const shape: Record<string, any> = {};

    for (const field of fields) {
        if (field.validation) {
            shape[field.key] = field.validation;
        }
    }

    return z.object(shape);
}
