create table if not exists assetstatus
(	assetstatusId		int				auto_increment primary key
,	statusText			varchar(25)		not null
,	description			varchar(1000)	not null default ''
);