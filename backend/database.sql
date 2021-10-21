use dreamchat;

create table if not exists people(
    id int primary key auto_increment,
    username varchar(30) not null,
    password varchar(30) not null,
    email varchar(30) not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null
);

create table if not exists chats(
    id int primary key auto_increment,
    name varchar(30) not null,
    owner_id int not null,
    foreign key(owner_id) references people(id)
);