create table if not exists address
(	addressId		int				auto_increment primary key
,	zipCodeId		int				not null
,	constraint address_zipCodeId foreign key(zipCodeId) references zipcode(zipCodeId)
);