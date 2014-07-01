create table if not exists category
(	categoryId			int				auto_increment primary key
,	categoryName		varchar(	100)	not null
,	description			varchar(1000)	not null default ''
,	parentCategoryId	int				null
,	constraint category_parentId foreign key (parentCategoryId) references category(categoryId)
);