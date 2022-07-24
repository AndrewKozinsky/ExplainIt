# Курс английского

## Добавление хоста
Чтобы при разработке можно было обращаться к адресу explain.local для просмотра результата нужно связать IP localhost-а с этим адресом.

Для этого нужно набрать команду
`sudo nano /private/etc/hosts`.

В открывшемся редакторе добавить строку 127.0.0.1 `explain.local`.

Для сохранения нажать Ctrl + O и закрыть файл Ctrl + X.


## Проверка и создание БД
1. Перейдите в контейнер с базой данных: ```docker exec -it explain-db sh```
2. Переключитесь на пользователя postgres ```su postgres```
3. Запустите процесс psql: ```psql```
4. Выведите список баз данных: ```\l```.
5. Если там нет базы данных explain, то создайте её: ```create database explain;```
6. Можно выйти из контейнера дважды или трижды запустив: ```exit```

## Команды взаимодейтвия с БД
1. Соединение с базой данных: `\c explain`
2. Просмотр таблиц в текущей базе данных: `\dt`
3. Просмотр ячеек в текущей базе данных: `\d articles`
4. Для получения значений таблицы нужно использовать обычный SQL: `SELECT * FROM articles;`

## Что делать после изменения моделей Призмы
1. Запустить Докер в стандартном режиме (`docker-compose -f docker-compose-dev.yml up --build`).
2. В prisma/schema.prisma и в prisma/client/schema.prisma в адресе БД поставить хост 0.0.0.0:4001.
3. В контексте папки api запустить `npx prisma migrate dev --name mig_2` чтобы обновить файлы миграций и в БД для разработки.
4. Запустить Докер в режиме тестирования (`docker-compose -f docker-compose-dev.yml -f docker-compose-dev-test.yml up --build`). В prisma_test/schema.prisma в адрес БД поставить хост 0.0.0.0:4001.
5. В prisma_test/schema.prisma и в prisma_test/client/schema.prisma в адресе БД поставить хост 0.0.0.0:4001.
6. В контексте папки api запустить `npx prisma migrate dev --name mig_2 --schema ./prisma_test/schema.prisma` чтобы обновить файлы миграций в БД для тестирования.
7. В prisma/schema.prisma, prisma/client/schema.prisma и в prisma_test/schema.prisma, prisma_test/client/schema.prisma в адресах БД поставить хост db:5432.
8. Перезапустить Докер в нужном режиме.

## Как сделать запросы в БД от имени администратора
В запросе нужно поставить заголовок Admin-Password со значением `ztpmftw4PO`.

## Тестирование API
Перед запуском теста нужно в Докер в сервис api передать переменную WORK_MODE в значении test. Для этого Докер нужно запустить так:
`docker-compose -f docker-compose-dev.yml -f docker-compose-dev-test.yml up --build`.
После этого в Терминале нужно перейти в контекст папки api и там запустить тесты: `npx run test:e2e` 