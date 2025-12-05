drop database if exists myWeb;
create database myWeb;

create table user(
uNum int not null primary key,
uName varchar(30) not null
);

insert into user values (0,Bee);

select * from user;