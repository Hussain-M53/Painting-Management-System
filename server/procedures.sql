CREATE
OR REPLACE PROCEDURE get_rental_report (
   no IN VARCHAR2,
   c_name OUT customer.customer_name % type,
   c_address OUT customer.customer_address % type,
   c_category_id OUT customer.category_id % type,
   c_category_description OUT category.category_description % type,
   c_category_discount OUT category.category_discount % type,
   c_painting_id OUT paintings.painting_id % type,
   c_painting_title OUT paintings.painting_title % type,
   c_painting_theme OUT paintings.theme % type,
   c_hire_date OUT rental_report.hire_date % type,
   c_due_date_back OUT rental_report.due_date_back % type,
   c_return_status OUT rental_report.return_status % type
) IS BEGIN
select
   cus.customer_name,
   cus.customer_address,
   cat.category_id,
   cat.category_description,
   cat.category_discount,
   p.painting_id,
   p.painting_title,
   p.theme,
   ren.hire_date,
   ren.due_date_back,
   ren.return_status INTO c_name,
   c_address,
   c_category_id,
   c_category_description,
   c_category_discount,
   c_painting_id,
   c_painting_title,
   c_painting_theme,
   c_hire_date,
   c_due_date_back,
   c_return_status
from
   customer cus
   inner join rental_report ren on cus.customer_no = ren.customer_no
   inner join category cat on cus.category_id = cat.category_id
   inner join category cat on cat.category_id = cus.category_id
   inner join paintings p on p.painting_id = ren.painting_id
WHERE
   cus.customer_no = no;

END;


CREATE OR REPLACE PROCEDURE add_customer (
   no IN customer.customer_no % type,
   c_name IN customer.customer_name % type,
   c_address IN customer.customer_address % type,
   c_category_id IN customer.category_id % type DEFAULT 'B'
) IS BEGIN
INSERT INTO
   customer
values
(no, c_name, c_address, c_category_id);

END;

CREATE OR REPLACE PROCEDURE get_customer_info (
   no IN Varchar2,
   c_name OUT customer.customer_name % type,
   c_address OUT customer.customer_address % type,
   c_category_id OUT customer.category_id % type,
   c_category_description OUT category.category_description % type,
   c_category_discount OUT category.category_discount % type
) IS BEGIN
select
   cus.customer_name,
   cus.customer_address,
   cat.category_id,
   cat.category_description,
   cat.category_discount INTO c_name,
   c_address,
   c_category_id,
   c_category_description,
   c_category_discount
from
   customer cus
   inner join category cat on cus.category_id = cat.category_id
where
   cus.customer_no = no;

END;

CREATE OR REPLACE PROCEDURE get_artist_info (
   no IN Varchar2,
   a_name OUT artist.artist_name % type,
   a_country_of_birth OUT artist.country_of_birth % type,
   a_year_of_birth OUT artist.year_of_birth % type,
   a_year_of_death OUT artist.year_of_death % type
) IS BEGIN
select
   artist_name,
   country_of_birth,
   year_of_birth,
   year_of_death INTO a_name,
   a_country_of_birth,
   a_year_of_birth,
   a_year_of_death
FROM
   Artist
where
   artist_id = no;

END;

CREATE OR REPLACE PROCEDURE get_owner_info (
   no IN varchar2,
   o_name OUT Owner.owner_name % type,
   o_address OUT Owner.owner_adress % type
) IS BEGIN
select
   owner_name,
   owner_adress INTO o_name,
   o_address
FROM
   Owner
where
   owner_id = no;

END;