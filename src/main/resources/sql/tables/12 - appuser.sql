create table if not exists AppUser
(	AppUserId		int				auto_increment	primary key
,	SignupDate		datetime		not null default CURRENT_TIMESTAMP
,	FirstName		varchar(50)		not null
,	LastName		varchar(50)		not null
,	OfficeId		int				null
,	LoginInfoId		int				not null
,	index AppUser_Name_idx (last_name asc, first_name asc)
,	index AppUser_OfficeId_idx (OfficeId asc)
,	index AppUser_SignupDate_idx (SignupDate asc)
,	unique index AppUser_LoginInfoId_Unique (LoginInfoId asc)
,	constraint AppUser_OfficeId foreign key(OfficeId) references Office (OfficeId) on delete no action on update no action
,	constraint AppUser_LoginInfoId foreign key(LoginInfoId) references LoginInfo (LoginInfoId) on delete no action on update no action
);