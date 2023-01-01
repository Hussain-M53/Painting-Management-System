
INSERT INTO CATEGORY VALUES (
    'B',0,'Bronze Category'
);
INSERT INTO CATEGORY VALUES (
    'S',5,'Silver Category'
);
INSERT INTO CATEGORY VALUES (
    'G',10,'Gold Category'
);
INSERT INTO CATEGORY VALUES (
    'P',15,'Platinum�Category'
);



INSERT INTO Customer VALUES (
    '1','Ibrahim Sheikh','Gulshan','B'
);
INSERT INTO Customer VALUES (
    '2','Ahmed Tariq','Gulshan','S'
);
INSERT INTO Customer VALUES (
    '3','Vishal Das','Saddar','G'
);
INSERT INTO Customer VALUES (
    '4','Hussain Murtaza','Saddar','P'
);



INSERT INTO ARTIST VALUES (
    '1','Artist One','Pakistan',1970,NULL
);
INSERT INTO ARTIST VALUES (
    '2','Artist Two','Pakistan',1999,NULL
);
INSERT INTO ARTIST VALUES (
    '3','Artist Three','Pakistan',2000,NULL
);


INSERT INTO Owner VALUES (
    '1','Owner one','defense',90076801
);
INSERT INTO Owner VALUES (
    '2','Owner two','defense',90076801
);
INSERT INTO Owner VALUES (
    '3','Owner three','defense',90076801
);
INSERT INTO Owner VALUES (
    '4','Owner four','defense',90076801
);
INSERT INTO Owner VALUES (
    '5','Owner five','defense',90076801
);



INSERT INTO Paintings VALUES (
    '1','Mona Lisa','face',200000,1,1
);
INSERT INTO Paintings VALUES (
    '2','Squid Game','game',15000,2,1
);
INSERT INTO Paintings VALUES (
    '3','Handsome Squidward','face',1000000,3,3
);




INSERT INTO rental_report VALUES (
    '1','1',sysdate,TO_DATE('2023/07/09', 'yyyy/mm/dd'),'N'
);
INSERT INTO rental_report VALUES (
    '1','2',sysdate,TO_DATE('2024/07/19', 'yyyy/mm/dd'),'N'
);
INSERT INTO rental_report VALUES (
    '2','3',TO_DATE('2022/02/10', 'yyyy/mm/dd'),TO_DATE('2022/12/20', 'yyyy/mm/dd'),'Y'
);


