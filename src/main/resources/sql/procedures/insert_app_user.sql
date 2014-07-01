-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists insert_app_user$$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE `insert_app_user`
(	in	sFirstname	varchar(50)
,	in	sLastname	varchar(50)
,	in	sUsername	varchar(100)
,	in	sPassword	varchar(256)
,	in	iOfficeId	int
)
BEGIN
	insert into appUser
	(	first_name
	,	last_name
	,	LoginInfoId
	,	OfficeId
	)
	select	sFirstName
	,		sLastName
	,		get_or_create_LoginInfoId(sUsername, HEX(AES_ENCRYPT(sPassword, SHA2('Holy Fuck it''s Christmas!', 512))))
	,		iOfficeId;

	call get_app_user_by_id(last_insert_id());
END$$