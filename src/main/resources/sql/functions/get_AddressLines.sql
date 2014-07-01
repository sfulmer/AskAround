-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
delimiter $$

drop function get_AddressLines$$

create function get_AddressLines(iAddressId int)
returns varchar(10000)
begin
	declare iAddressLineId		int;
	declare sAddressLine		varchar(50);
	declare sAddressLines		varchar(10000)	default '<addresslines>';
	declare bDone				bool 			default false;
	declare iLineNumber			int;
	
	declare cur_addresslist cursor
		for select	AddressLineId
			,		AddressLine.AddressLine
			,		LineNumber
			from	AddressLine
			where	AddressId	=	iAddressId;
	
	declare continue handler for not found set bDone = true;

	open cur_addresslist;

addresslist_loop:
	loop
		fetch	cur_addresslist
		into	iAddressLineId
		,		sAddressLine
		,		iLineNumber;

		if bDone then
			leave addresslist_loop;
		end if;

		set sAddressLines = concat(sAddressLines, '<addressline id=\"', iAddressLineId, '\" linenumber=\"', iLineNumber, '\">', sAddressLine, '</addressline>');
	end loop;

	close cur_addresslist;

	set sAddressLines = concat(sAddressLines, '</addresslines>');

	return(sAddressLines);
end