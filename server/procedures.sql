create or replace PROCEDURE add_artist (
   art_id IN artist.artist_id % type,
   art_name IN artist.artist_name % type,
   art_cob IN artist.country_of_birth%type DEFAULT NULL,
   art_yob IN artist.year_of_birth%type DEFAULT NULL,
   art_yod IN artist.year_of_death%type DEFAULT NULL
) IS 
BEGIN
INSERT INTO ARTIST VALUES(art_id, art_name, art_cob, art_yob,art_yod);
END;

create or replace PROCEDURE add_customer (
   c_id IN customer.customer_id % type,
   c_name IN customer.customer_name % type,
   c_address IN customer.customer_address % type,
   c_category_id IN customer.category_id % type DEFAULT 'B'
) IS 
BEGIN
INSERT INTO CUSTOMER VALUES(c_id, c_name, c_address, c_category_id);
END;


create or replace PROCEDURE add_owner (
   o_id IN owner.owner_id % type,
   o_name IN owner.owner_name % type,
   o_address IN owner.owner_address % type default Null,
   o_telephone IN owner.owner_tel%type
) IS 
BEGIN
INSERT INTO OWNER VALUES(o_id, o_name, o_address, o_telephone);
END;



create or replace PROCEDURE add_painting (
   p_id IN paintings.painting_id % type,
   p_title IN paintings.painting_title % type,
   p_theme IN paintings.theme%type,
   p_rental_price IN paintings.rental_price%type ,
   p_artist_id IN paintings.artist_id%type,
   p_owner_id IN paintings.owner_id%type
) IS 
BEGIN
INSERT INTO PAINTINGS VALUES(p_id, p_title, p_theme, p_rental_price,p_artist_id,p_owner_id,0,'Y',sysdate);
END;

create or replace PROCEDURE add_paintings_rented (
   customer_id IN customer.customer_id % type,
   painting_id IN paintings.painting_id % type,
   hire_date IN paintings_rented.hire_date % type DEFAULT SYSDATE,
   due_date_back IN paintings_rented.due_date_back % type,
   return_status IN paintings_rented.return_status % type DEFAULT 'N'
) IS
BEGIN
INSERT INTO paintings_rented VALUES(customer_id, painting_id, TO_DATE(hire_date,'dd/mm/yyyy'), TO_DATE(due_date_back,'dd/mm/yyyy'), return_status);
END;


create or replace PROCEDURE get_artist_details (
   art_id IN OUT artist.artist_id % type,
   art_name OUT artist.artist_name % type,
   art_country_of_birth OUT artist.country_of_birth % type,
   art_year_of_birth OUT artist.year_of_birth % type,
   art_year_of_death OUT artist.year_of_death % type
) IS BEGIN
select
   artist_id,
   artist_name,
   country_of_birth,
   year_of_birth,
   year_of_death INTO 
   art_id,
   art_name,
   art_country_of_birth,
   art_year_of_birth,
   art_year_of_death
FROM
   Artist
where
   artist_id = art_id;

END;


create or replace PROCEDURE get_artist_paintings_report ( art_id IN artist.artist_id % type) IS 
paintings_rented_rows SYS_REFCURSOR;
BEGIN
OPEN paintings_rented_rows FOR 
select
      p.painting_id,
      p.painting_title,
      p.theme,
      p.rental_price,
      o.owner_id,
      o.owner_name,
      o.owner_tel
  from artist art inner join paintings p on art.artist_id = p.artist_id inner join owner o on o.owner_id = p.owner_id
  WHERE art.artist_id = art_id;

DBMS_SQL.RETURN_RESULT(paintings_rented_rows);
END;



create or replace PROCEDURE get_customer_details (
   c_id IN OUT customer.customer_id % type,
   c_name OUT customer.customer_name % type,
   c_address OUT customer.customer_address % type,
   c_category_id OUT customer.category_id % type,
   c_category_description OUT category.category_description % type,
   c_category_discount OUT category.category_discount % type
) IS BEGIN
select
   cus.customer_id,
   cus.customer_name,
   cus.customer_address,
   cat.category_id,
   cat.category_description,
   cat.category_discount INTO
   c_id,
   c_name,
   c_address,
   c_category_id,
   c_category_description,
   c_category_discount
from
   customer cus
   inner join category cat on cus.category_id = cat.category_id
where
   cus.customer_id = c_id;

END;


create or replace PROCEDURE get_owner_details (
   o_id IN OUT owner.owner_id % type,
   o_name OUT Owner.owner_name % type,
   o_address OUT Owner.owner_address % type,
   o_telephone OUT Owner.owner_tel % type
) IS BEGIN
select
    owner_id,
    owner_name,
    owner_address,
    owner_tel INTO 
    o_id,
    o_name,
    o_address,
    o_telephone
FROM
   Owner
where
   owner_id = o_id;
END;


create or replace PROCEDURE get_painting_details (
   p_id IN OUT paintings.painting_id % type,
   p_title OUT paintings.painting_title % type,
   p_theme OUT paintings.theme % type,
   p_rental_price OUT paintings.rental_price % type,
   p_artist_id OUT paintings.artist_id % type,
   a_artist_name OUT artist.artist_name % type,
   p_owner_id OUT paintings.owner_id  % type,
   o_owner_name OUT owner.owner_name % type
) IS BEGIN
select
    p.painting_id,
    p.painting_title,
    p.theme,
    p.rental_price,
    p.artist_id,
    a.artist_name,
    p.owner_id,
    o.owner_name
    INTO
    p_id,
    p_title,
    p_theme,
    p_rental_price,
    p_artist_id,
    a_artist_name,
    p_owner_id,
    o_owner_name
FROM
   PAINTINGS p inner join Artist a on p.artist_id = a.artist_id inner join OWNER o on o.owner_id = p.owner_id
where
   p.painting_id = p_id;
END;


create or replace PROCEDURE get_paintings_rental_details ( p_id IN paintings.painting_id % type) IS 
paintings_rented_rows SYS_REFCURSOR;
BEGIN
OPEN paintings_rented_rows FOR 
select
   p.painting_id,
   p.painting_title,
   p.theme,
   ren.hire_date,
   ren.due_date_back,
   ren.return_status
from  paintings p inner join paintings_rented ren on p.painting_id  = ren.painting_id
WHERE p.painting_id= p_id;

DBMS_SQL.RETURN_RESULT(paintings_rented_rows);
END;



create or replace PROCEDURE get_rentals_report ( c_id IN customer.customer_id % type) IS 
paintings_rented_rows SYS_REFCURSOR;
BEGIN
OPEN paintings_rented_rows FOR 
select
   p.painting_id,
   p.painting_title,
   p.theme,
   ren.hire_date,
   ren.due_date_back,
   ren.return_status
from customer cus inner join paintings_rented ren on cus.customer_id = ren.customer_id inner join paintings p on p.painting_id = ren.painting_id
WHERE cus.customer_id = c_id;

DBMS_SQL.RETURN_RESULT(paintings_rented_rows);
END;




create or replace PROCEDURE RESUBMIT_PAINTING(
p_id IN PAINTINGS_RETURNED.painting_id%type
)
IS 
BEGIN
UPDATE PAINTINGS SET AVAILABLE='Y' where painting_id=p_id;
DELETE FROM PAINTINGS_RETURNED WHERE painting_id=p_id;
END;



create or replace PROCEDURE return_rented_painting(
p_id IN paintings.painting_id%type
)
IS 
BEGIN
UPDATE paintings_rented SET RETURN_STATUS='Y' where painting_id=p_id;
UPDATE PAINTINGS SET AVAILABLE = 'Y' where painting_id=p_id;
END;


create or replace PROCEDURE return_to_owners_report(o_id OWNER.owner_id % type)
IS
paintings_of_owner SYS_REFCURSOR;
BEGIN
OPEN paintings_of_owner FOR select p_r.painting_id,p.painting_title,p_r.return_date from paintings_returned p_r inner join paintings p on p_r.painting_id=p.painting_id
where p.owner_id=o_id;
DBMS_SQL.RETURN_RESULT(paintings_of_owner);
END;
