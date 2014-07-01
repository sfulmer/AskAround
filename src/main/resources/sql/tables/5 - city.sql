create table if not exists city
(	cityId			int				auto_increment primary key
,	cityName		varchar(100)	not null
,	stateId			int				not null
,	constraint city_stateId foreign key(stateId) references state(stateId)
);