create database fasttaxi;

drop table if exists steps;
create table steps(
    step_id int generated always as identity primary key,
    step_status smallint not null,
    step_step smallint not null,
    step_user text not null
);

drop table if exists elontaxi;
create table elontaxi(
    taxi_id int generated always as identity primary key,
    taxi_unique_id text unique,
    taxi_now varchar(120),
    taxi_then varchar(120),
    taxi_count smallint,
    taxi_time text,
    taxi_owner text,
    taxi_status smallint default 1
);