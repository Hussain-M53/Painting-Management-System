create or replace NONEDITIONABLE TRIGGER check_and_update_category
AFTER INSERT
ON Paintings_Rented  
FOR EACH ROW
DECLARE 
no_of_hires number;
BEGIN  
select count(customer_id) into no_of_hires from Paintings_Rented group by (customer_id) having customer_id=:NEW.customer_id;
IF no_of_hires>=15 THEN
    UPDATE Customer set category_id='P' where customer_id=:NEW.customer_id;
ELSIF no_of_hires>=10 THEN
    UPDATE Customer set category_id='G' where customer_id=:NEW.customer_id;
ELSIF no_of_hires>=5 THEN
    UPDATE Customer set category_id='S' where customer_id=:NEW.customer_id;
ELSE
UPDATE Customer set category_id='B' where customer_id=:NEW.customer_id;
END IF;
END;



create or replace TRIGGER mark_unavailable
AFTER INSERT ON Paintings_Rented  
FOR EACH ROW
DECLARE 
BEGIN  
UPDATE PAINTINGS SET AVAILABLE='N' WHERE painting_id = :NEW.painting_id;
END;



create or replace TRIGGER pay_to_owner
AFTER INSERT ON paintings_rented
FOR EACH ROW
DECLARE
painting_price PAINTINGS.rental_price % type;
customer_discount CATEGORY.category_discount % type;
new_owner_payment PAINTINGS.amount_paidto_owner % type;
old_owner_payment PAINTINGS.amount_paidto_owner % type;
hire_date Paintings_Rented.hire_date % type;
return_back_date Paintings_Rented.due_date_back % type;
total_months int;
BEGIN
select RENTAL_PRICE,amount_paidto_owner INTO painting_price,old_owner_payment from PAINTINGS where painting_id = :NEW.painting_id;

select cat.category_discount INTO customer_discount from CUSTOMER c inner join CATEGORY cat ON cat.category_id = c.category_id
WHERE c.customer_id = :NEW.customer_id;

hire_date := :NEW.hire_date;
return_back_date := :NEW.due_date_back;
total_months := CEIL(months_between(return_back_date,hire_date));

new_owner_payment := (painting_price - (painting_price * (customer_discount/100)) )/10;

new_owner_payment := (new_owner_payment * total_months) + old_owner_payment;

UPDATE PAINTINGS SET amount_paidto_owner = new_owner_payment WHERE painting_id  = :NEW.painting_id;
END;




create or replace TRIGGER CHECK_IF_PAINTING_EXCEEDS_6_MONTH_and_add_to_return_table
BEFORE UPDATE
OF RETURN_STATUS
ON Paintings_Rented
DECLARE 
CURSOR paintings_exceeded_6_months IS select p.painting_id as p_id,max(r.due_date_back) as return_date from paintings p inner join paintings_rented r on p.painting_id=r.painting_id where
months_between(sysdate,due_date_back)>6 group by p.painting_id;
CURSOR paintings_already_returned IS SELECT * FROM PAINTINGS_RETURNED;
CURSOR paintings_not_rented_once IS SELECT PAINTING_ID FROM PAINTINGS MINUS
SELECT PAINTING_ID FROM Paintings_Rented MINUS SELECT PAINTING_ID FROM PAINTINGS_RETURNED;
insert_date PAINTINGS.Inserted_At%type;
BEGIN  

<< outer_loop >>
FOR rec_1 in paintings_exceeded_6_months LOOP
<< inner_loop>>
FOR rec_2 in paintings_already_returned LOOP
IF rec_1.p_id=rec_2.painting_id THEN
DELETE FROM PAINTINGS_RETURNED WHERE painting_id=rec_2.painting_id;
END IF;
end loop inner_loop;
end loop outer_loop;


FOR rec in paintings_not_rented_once LOOP

SELECT Inserted_At INTO INSERT_DATE FROM PAINTINGS WHERE PAINTING_ID=rec.PAINTING_ID;
IF (MONTHS_BETWEEN(SYSDATE,INSERT_DATE)>6) THEN
INSERT INTO PAINTINGS_RETURNED VALUES (rec.painting_id,SYSDATE);
UPDATE PAINTINGS SET AVAILABLE='N' WHERE painting_id=rec.painting_id;
END IF;
END LOOP;

FOR rec in paintings_exceeded_6_months loop
INSERT INTO PAINTINGS_RETURNED VALUES (rec.p_id,rec.return_date);
UPDATE PAINTINGS SET AVAILABLE='N' WHERE painting_id=rec.p_id;
END LOOP;
END;