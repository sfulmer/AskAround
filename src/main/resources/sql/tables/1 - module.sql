create table if not exists module
(	moduleId		int				auto_increment	primary key
,	moduleName		varchar(100)	not null
,	description		varchar(1000)	not null
,	URL				varchar(256)	not null
,	active			bit				not null	default true
,	index Module_ModuleName_idx (ModuleName asc)
);

truncate table module;
call insert_module('Home', 'Main Area selected and shown upon logging into system', 'home', null);
call insert_module('Asset Monitor', 'Area where one can not only Search/View assets, but also post new assets, edit, or remove assets', 'assets', null);
call insert_module('Report', 'Area where one can view, print, or transmit reports', 'report', null);
call insert_module('Administration', 'Adminstration panel for Administrative users to add modules, change colors, add/change/remove users, etc.', 'administration', null);
call insert_module('My Account', 'Area to update ones own account - available for everyone', 'account', null);