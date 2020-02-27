create database users;
use users;

create table user_info(phone_number varchar(16) primary key, screen_name varchar(16) UNIQUE);

insert into user_info (phone_number, screen_name) values ("333-444-5555", "HiThere");
insert into user_info (phone_number, screen_name) values ("333-444-5744", "Hekkire");
insert into user_info (phone_number, screen_name) values ("333-444-5216", "Serwrws");

select * from user_info;

-- Check Uniqueness of Name
select * from user_info user_ where user_.screen_name = "Serwrws";

create table posts(Post_ID varchar(16) primary key, foreign key(screen_name) references user_info(screen_name),content varchar(300));

#flag_ctr int DEFAULT 0,likes int DEFAULT 0);

insert into posts (Post_ID, screen_name, content, flag_ctr, likes) values ("A12345166","HiThere","Hi my name is Conan",DEFAULT,DEFAULT);
insert into posts (Post_ID, screen_name, content, flag_ctr, likes) values ("A12555176","HiThere","Hello bro, what's good",DEFAULT,DEFAULT);
insert into posts (Post_ID, screen_name, content, flag_ctr, likes) values ("A15545168","ehhhh","Hi my name is Conan",DEFAULT,DEFAULT);

select * from posts;