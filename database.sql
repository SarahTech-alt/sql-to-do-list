CREATE TABLE tasks (
	"id" SERIAL PRIMARY KEY,
	"taskItem" varchar(500),
	"status" boolean DEFAULT FALSE);

INSERT into "tasks"
    ("taskItem", "status")
VALUES
    ('walk the dog',false),
    ('do the dishes',false),
    ('water the plants', false),
    ('fix the chair',false),
    ('dust the hall',false);
    