create table if not exists zipcode
(	zipCodeId		int				auto_increment primary key
,	zipCode			varchar(25)		not null
,	cityId			int				not null
,	constraint zipcode_cityId foreign key(cityId) references city(cityId)
);