create table if not exists state
(	stateId			int				auto_increment primary key
,	stateName		varchar(100)	not null
,	abbreviation	varchar(25)		not null default ''
,	countryId		int				not null
,	constraint state_countryId foreign key(countryId) references country(countryId)
);