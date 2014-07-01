create table if not exists assetImage
(	assetImageId		int				auto_increment primary key
,	imageName			varchar(100)	not null
,	description			varchar(1000)	not null default ''
,	width				int				not null
,	height				int				not null
,	imageData			blob			not null
,	check(width > 0)
,	check(height > 0)
);