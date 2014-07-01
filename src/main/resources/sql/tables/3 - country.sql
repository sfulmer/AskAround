create table if not exists country
(	countryId		int				auto_increment primary key
,	countryName		varchar(100)	not null
,	abbreviation	varchar(25)		not null default ''
);