-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_or_create_LoginInfoId$$

CREATE DEFINER=`sfulmer`@`localhost` FUNCTION `get_or_create_LoginInfoId`
(	sUsername	varchar(100)
,	sPassword	varchar(256)
)
returns int
BEGIN
	if exists(
		select 	LoginInfoId
		from	LoginInfo
		where	UserName	=	sUsername
		and		sPassword	=	HEX(AES_ENCRYPT(sPassword, SHA2('Holy Fuck it''s Christmas!', 512))))
	then
		return(
			select 	LoginInfoId
			from	LoginInfo
			where	UserName	=	sUsername
			and		sPassword	=	HEX(AES_ENCRYPT(sPassword, SHA2('Holy Fuck it''s Christmas!', 512))));
	else
		insert into LoginInfo
		(	username
		,	passcode
		)
		select	sUsername
		,		HEX(AES_ENCRYPT(sPassword, SHA2('Holy Fuck it''s Christmas!', 512)));

		return(last_insert_id());
	end if;
END$$