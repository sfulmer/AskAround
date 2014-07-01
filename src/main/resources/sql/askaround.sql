create schema if not exists askaround;

use askaround;

create user 'askaround'@'localhost' identified by '@bClTw0E';
set password for 'askaround'@'localhost' = Password('@$kAr0UnD 1s M3ln, A1! m!N3');
revoke all on *.* from 'askaround'@'localhost';
grant ALL on askaround.* to 'askaround'@'localhost';
grant select on mysql.proc to 'askaround'@'localhost';
revoke grant option on askaround.* from 'askaround'@'localhost';

/*call insert_new_app_user('Seth', 'Fulmer', 'sfulmer', 'sdf91277');*/

