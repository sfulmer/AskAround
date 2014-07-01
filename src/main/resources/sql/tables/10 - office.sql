create table if not exists office
(	officeId		int				auto_increment primary key
,	companyId		int				not null
,	addressId		int				not null
,	constraint office_companyId foreign key(companyId) references company(companyId)
,	constraint office_addressId foreign key(addressId) references address(addressId)
);