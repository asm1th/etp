export const rules = {
    required : (message: string, minLength?: number, minLenMessage?: any) => ({
        minLength: {
            value: minLength,
            message: minLenMessage || "Поле должно быть длинее "+minLength+" символов"
        },
        required: "Поле обязательно для заполнения",
    })
}