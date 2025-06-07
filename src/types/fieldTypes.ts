import { ZodTypeAny } from 'zod'

export type FieldType =
    | 'text'
    | 'number'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'custom' // 可自訂擴充

export type FieldConfig<T = any> = {
    key: string
    type: FieldType | string // 支援自訂 type
    props?: T // 傳給元件的 props
    defaultValue?: any
    validation?: ZodTypeAny
    visible?: (values: Record<string, any>) => boolean
    disabled?: boolean | ((values: Record<string, any>) => boolean)
    readOnly?: boolean | ((values: Record<string, any>) => boolean)
    layout?: {
        grid?: { xs?: number; sm?: number; md?: number }
        className?: string
        [key: string]: any
    }
}

export type FormStep = {
    stepKey: string
    title?: string
    fields: FieldConfig[]
}

export type FormMetadata = {
    steps: FormStep[]
}
