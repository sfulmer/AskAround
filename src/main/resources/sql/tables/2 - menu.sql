create table if not exists menu
(	menuId			int				auto_increment	primary key
,	menuName		varchar(100)	not null
,	description		varchar(1000)	not null
,	moduleid		int				not null
,	orderNumber		int							default 0
,	constraint `menu_module_id` FOREIGN KEY (`moduleId`) REFERENCES `askaround`.`module` (`moduleId`)
);

truncate table menu;
call insert_menu('Home', 'Main Area selected and shown upon logging into system', 1, null);
call insert_menu('Asset Monitor', 'Area where one can not only Search/View assets, but also post new assets, edit, or remove assets', 2, null);
call insert_menu('Report', 'Area where one can view, print, or transmit reports', 3, null);
call insert_menu('Administration', 'Adminstration panel for Administrative users to add modules, change colors, add/change/remove users, etc.', 4, null);
call insert_menu('My Account', 'Area to update ones own account - available for everyone', 5, null);