export {}

// Типы для переменных окружения
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number // Порт приложения
            WORK_MODE: 'dev' | 'prod' | 'test' // Режим работы
        }
    }
}
