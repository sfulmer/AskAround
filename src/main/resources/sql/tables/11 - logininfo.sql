create table if not exists logininfo
(	LoginInfoId		int 			auto_increment primary key
,	UserName		varchar(100)	not null
,	Passcode		varchar(256)	not null
,	unique index LoginInfo_UserName_Unique (UserName asc)
,	index LoginInfo_UserId_idx (UserId asc)
);