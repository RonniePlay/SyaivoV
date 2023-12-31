const express = require("express"),
  router = express.Router(),
  pool = require("../service/db"),
  authenticateToken = require("./authentication"),
  fs = require("fs"),
  { promisify } = require("util"),
  multer = require("multer"),
  { v4 } = require("uuid");

const removeFileAsync = promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const newNameFile = v4();
    cb(null, newNameFile + ".jpg");
  },
});

const upload = multer({ storage: storage });

router.get("/:key", async (req, res) => {
  const key = req.params.key;

  try {
    const { rows } = await pool.query(
      `SELECT sc.id, sc.image, sc.name
	FROM subcatalog as sc
	JOIN catalog as c ON sc.catalog_id = c.id
	WHERE c.key_name = '${key}';`
    );

    if (rows.length > 0) return res.status(200).json(rows);
    else return res.status(404).json("Каталогі не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталогів!");
  }
});

router.get("/name/:key", async (req, res) => {
  const key = req.params.key;
  const id = req.query.id;

  try {
    const { rows } = await pool.query(
      `SELECT sc.id, sc.name
	FROM subcatalog as sc
	JOIN catalog as c ON sc.catalog_id = c.id
	WHERE c.key_name = '${key}' AND sc.id = ${id}
  LIMIT 1;`
    );

    if (rows.length > 0) return res.status(200).json(rows[0]);
    else return res.status(404).json("Каталогі не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталогів!");
  }
});

router.get("/only/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM subcatalog WHERE id = ${id} LIMIT 1;`
    );

    if (rows.length > 0) return res.status(200).json(rows[0]);
    else return res.status(404).json("Каталогі не знайдено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка пошуку каталогів!");
  }
});

router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    if (!req.auth) return res.status(401).json("Ви не авторизовані");

    const { name, catalog_key } = req.body;

    if (!req.body) return res.status(404).json("Данні не були введені!");

    try {
      const { rows } = await pool.query(
        `SELECT id
    FROM catalog
    WHERE key_name = '${catalog_key}'
    LIMIT 1;`
      );

      if (rows.length === 0)
        return res.status(404).json("Каталог не знайдено!");

      await pool.query(
        `INSERT INTO subcatalog(
    image, name, catalog_id)
    VALUES ('${req.file.filename}', '${name}', ${rows[0].id});`
      );
      return res.status(201).json("Каталог створено!");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Помилка створення каталога!");
    }
  }
);

router.delete("/:id", authenticateToken, async (req, res) => {
  if (!req.auth) return res.status(401).json("Ви не авторизовані");

  const id = req.params.id;

  if (!id) return res.status(404).json("Каталог не знайдено!");

  try {
    const { rows } = await pool.query(
      `SELECT * FROM subcatalog WHERE id = ${id} LIMIT 1;`
    );

    await pool.query(`DELETE FROM subcatalog WHERE id = ${id};`);

    const filePath = `public/${rows[0].image}`;

    if (fs.existsSync(filePath)) await removeFileAsync(filePath);

    return res.status(200).json("Каталог видалено!");
  } catch (error) {
    console.log(error);
    return res.status(500).json("Помилка видалення каталога!");
  }
});

router.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    if (!req.auth) return res.status(401).json("Ви не авторизовані");

    const id = req.params.id;

    if (!id) return res.status(404).json("Каталог не знайдено!");

    if (!req.body) return res.status(404).json("Данні не були введені!");

    const { name } = req.body;

    try {
      let updateQuery = `UPDATE subcatalog SET 
      name = ${name ? `'${name}'` : null}`;

      if (req.file) {
        const { rows } = await pool.query(
          `SELECT image FROM subcatalog WHERE id = ${id};`
        );
        if (rows.length > 0) {
          const filePath = `public/${rows[0].image}`;

          if (fs.existsSync(filePath)) await removeFileAsync(filePath);

          updateQuery += `,\nimage = '${req.file.filename}'`;
        }
      }

      updateQuery += `\nWHERE id = ${id};`;

      await pool.query(updateQuery);

      return res.status(201).json("Каталог обновлено!");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Помилка обновлення каталога!");
    }
  }
);

module.exports = router;
