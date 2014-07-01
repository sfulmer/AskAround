-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists insert_module $$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE `insert_module`
(	in	sModuleName		varchar(100)
,	in	sDescription	varchar(1000)
,	in	sURL			varchar(256)
,	in	bActive			bit
)
BEGIN
	insert into module
	(	moduleName
	,	description
	,	URL
	,	active
	)
	select	sModuleName
	,		sDescription
	,		sURL
	,		ifnull(bActive, true);

	call get_module_by_id(last_insert_id());
END$$