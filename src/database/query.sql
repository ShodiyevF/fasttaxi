create database fasttaxi;

create table step(
    step_id int generated always as identity primary key,
    step_status smallint not null,
    step_step smallint not null,
    step_user_telegram_id text not null
);

create table elontaxi(
    taxi_id int generated always as identity primary key,
    taxi_now varchar(120) not null,
    taxi_then varchar(120) not null,
    taxi_count smallint not null,
    taxi_time text not null,
    taxi_owner text not null
);