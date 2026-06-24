const express = require("express");

const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;

// Test API
app.get("/", (req, res) => {
  res.send("Melodify API Running");
});

// Get Telegram file URL from file_id
app.get("/song/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
    );

    const data = await response.json();

    if (!data.ok) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = data.result.file_path;

    const fileUrl =
      `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

    res.redirect(fileUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
