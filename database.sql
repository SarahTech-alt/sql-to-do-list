CREATE TABLE tasks (
	"id" SERIAL,
	"taskItem" varchar(500),
	"status" boolean);

INSERT into "tasks"
    ("taskItem", "status")
VALUES
    ('walk the dog',false),
    ('do the dishes',false),
    ('water the plants', false),
    ('fix the chair',false),
    ('dust the hall',false);

    CREATE TABLE markedDone (
	"id" SERIAL,
	"taskItem" varchar(500),
	"status" boolean);