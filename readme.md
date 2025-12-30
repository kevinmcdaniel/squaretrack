### Welcome to SquareTrack
###
###  Your Square Dance Track Everything System.

## DB Initialization

- database uses default user of postgres with provided password.





# sqaureTrack - Your home for all things square...


Key technoligies used:
- Next.js
- Node.js - https://nodejs.org/en/download
- PostgreSQL
- Prisma
- TailwindCSS
__ Shadcn UI
- Docker

## DB initialization using a postgresql database

# connect to postgres.db container
    * first time you will have to exec into the container and create db and users.

1. Start the database container
  a. change .env to only have the db username, db password and db database.  comment out others.
  b. run `docker compose --profile db up -d`
  c. follow steps 2-5 below

2. access shell of container and su to postgres user
  `su - postgres`

3. start postgres process
  `psql`

4. set postgres password in database.
  `postgres=# \password <USERNAME>  {enter key}`
Enter new password for user "<username>":
Enter it again:
(no response when done)

5. create database user (not postgres please)
`postgres=# create user squaretrack login;`
CREATE ROLE
`postgres=# \password squaretrack  {enter key}`
Enter new password for user "<username>":
Enter it again:
(no response when done)

6. grant rights to database (should already exist)
  a. list databases
  `postgres-# \l`  < will list out databases >
  b. create db if needed
  `postgres=# create database squaretrack with owner squaretrack;`
CREATE DATABASE
  c. connect to database
  `postgres=# \c squaretrack`
You are now connected to database "matrix" as user "postgres".
  d. grant all rights on database for it's user.
  `squaredb=# grant all on database squaretrack to squaretrack;`
GRANT
  e. grant all rights on public schema so user can create tables.
  `squaredb=# grant all on schema public to squaretrack;`
GRANT
  f. enable create database?  was needed but thought grant all cover it.
  `squaretrack=# alter user squaretrack createdb;`
ALTER ROLE



## Initialize API container

1. un-comment api section of docker compose
2. verify db user (squarelab) and password are in .env file
3. `docker compose up`
