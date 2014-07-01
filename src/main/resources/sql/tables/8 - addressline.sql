create table if not exists addressline
(	addressLineId	int				auto_increment primary key
,	addressId		int				not null
,	lineNumber		int				not null
,	addressline		varchar(50)		not null
,	constraint addressline_unique unique (addressId, lineNumber, addressline) 
,	constraint addressline_addressId foreign key(addressId) references address(addressId)
);