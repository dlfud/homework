// const express = require("express");
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

//DB 연결정보 입력
const pool = mysql.createPool({
  host: "localhost",
  user: "sbsst", // 사용자이름
  password: "sbs123414", // 비번
  database: "a9", // 데이터 베이스
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
const port = 3000;

//데이터 받을 준비
app.use(express.json());

const corsOptions = {
  origin: "http://cdpn.io",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());

/* 생성하기 
app.post("/todos", async (req, res) => {
  // const { id } = req.params;
  const { reg_date, perform_date, is_completed, content } = req.body;

  if (!reg_date) {
    res.status(400).json({
      msg: "reg_date required",
    });
    return;
  }
  if (!perform_date) {
    res.status(400).json({
      msg: "perform_date required",
    });
    return;
  }
  if (!is_completed) {
    res.status(400).json({
      msg: "is_completed required",
    });
    return;
  }
  if (!content) {
    res.status(400).json({
      msg: "content required",
    });
    return;
  }

  const [rs] = await pool.query(
    `INSERT INTO todo
    SET reg_date = ?, perform_date = ?, is_completed = ?, content = ?`,
    [reg_date, perform_date, is_completed, content]
  );

  res.json({
    msg: `할일이 생성되었습니다.`,
  });
});
app.listen(port);
*/

/* 삭제하기 
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(`SELECT * FROM todo WHERE id = ?`, [id]);
  if (rows.length == 0) {
    res.status(404).json({
      msg: "not found",
    });
    return;
  }

  const [rs] = await pool.query(`DELETE FROM todo WHERE id = ?`, [id]);

  res.json({
    msg: `${id}번 할일이 삭제되었습니다.`,
  });
});
app.listen(port);
*/

/* 수정하기 
app.patch("/todos/:id", async (req, res) => {
  //const id = req.params.id;
  const { id } = req.params;

  const [rows] = await pool.query(
    `
    SELECT *
    FROM todo
    WHERE id = ?
    `,
    [id]
  );

  if (rows.length == 0) {
    res.status(404).json({
      msg: "not found",
    });
    return;
  }
  //postman에서 데이터 받아옴
  const { perform_date, content } = req.body;
  //받아온데이터가 없으면
  if (!perform_date) {
    res.status(400).json({
      msg: "perform_date required",
    });
    return;
  }

  if (!content) {
    res.status(400).json({
      msg: "content required",
    });
    return;
  }

  const [rs] = await pool.query(
    `
    UPDATE todo
    SET perform_date = ?,
    content = ?
    WHERE id = ?
    `,
    [perform_date, content, id]
  );

  res.json({
    msg: `${id}번 할일이 수정되었습니다.`,
  });
});
// 꼭 포트와 연결해 주기..
app.listen(port);
*/

/* 단건조회 
app.get("/todos/:id", async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  //해킹에 취약하므로 사용하지마
  // const[rows] = await pool.query(// `SELECT * FROM todo WHERE id = ${id}`);
  const [rows] = await pool.query(
    `SELECT * FROM todo 
    WHERE id = ?`,
    [id]
  );
  //데이터가 없으면 메세지 상태코드로도 알려줌
  if (rows.length == 0) {
    res.status(404).json({
      msg: "not found",
    });
    return;
  }
  res.json(rows[0]);
});

app.listen(port);
*/

/* 전체 조회*/
// await이라는 구문을 쓰려면 async 있어야 함
app.get("/todos", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT * FROM todo"
    //article
  );
  res.json(rows);
});

app.listen(port);

/* 라우팅 
app.get("/todos", function (req, res) {
  //콘솔창에 실행됨
  console.log("/todos 요청이 실행되었습니다.");
  res.send("HI!!!");
});

app.listen(port);
*/

/* 애로우 펑션
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/a.html", (req, res) => {
  res.send("HI!");
});

app.get("/b.html", (req, res) => res.send("BYE!"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
*/
