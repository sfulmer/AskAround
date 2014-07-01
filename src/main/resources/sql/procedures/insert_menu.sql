-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists insert_menu $$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE `insert_menu`
(	in	sName			varchar(100)
,	in	sDescription	varchar(1000)
,	in	iModuleId		varchar(256)
,	in	iOrderNumber	int
)
BEGIN
	insert into menu
	(	menuName
	,	description
	,	moduleId
	,	orderNumber
	)
	select	sName
	,		sDescription
	,		iModuleId
	,		ifnull(iOrderNumber, 0);

	call get_menu_by_id(last_insert_id());
END$$