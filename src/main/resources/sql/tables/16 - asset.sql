create table if not exists asset
(	assetId				int				auto_increment primary key
,	itemNumber			varchar(50)		not null
,	title				varchar(50)		not null
,	description			varchar(1000)	not null
,	appUserId			int				not null
,	postedDate			datetime		not null default CURRENT_TIMESTAMP
,	expirationDate		datetime		not null
,	depreciatedValue	numeric(38, 2)	not null default 0.00
,	retailValue			numeric(38, 2)	not null default 0.00
,	categoryId			int				not null
,	statusId			int				not null
,	imageId				int				not null
,	constraint asset_appUserId foreign key(appUserId) references appUser(appUserId)
,	constraint asset_categoryId	foreign key(categoryId) references category(categoryId)
,	constraint asset_statusId foreign key(statusId) references assetstatus(assetstatusId)
,	constraint asset_imageId foreign key(imageId) references assetImage(assetImageId)
);