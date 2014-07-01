-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_login_by_credentials$$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE get_login_by_credentials
(	in	sUsername	varchar(100)
,	in	sPasscode	varchar(256)
)
BEGIN
	select	LoginInfoId		as LoginInfoId
	,		username		as UserName
	,		convert(AES_DECRYPT(UNHEX(passcode), SHA2('Holy Fuck it''s Christmas!', 512)) using utf8) as Passcode
	from	LoginInfo
	where	Username	=	sUsername
	and		Passcode	=	HEX(AES_ENCRYPT(sPasscode, SHA2('Holy Fuck it''s Christmas!', 512)));
END$$