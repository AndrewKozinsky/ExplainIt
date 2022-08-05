export {}

// Типы для переменных окружения
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number // Порт приложения
			NODE_ENV: 'development' | 'production' | 'test' // Режим работы
        }
    }
}
