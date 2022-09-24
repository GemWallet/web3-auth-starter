const { v4: uuidv4 } = require("uuid");
const express = require("express");
const jwt = require("jsonwebtoken");
const rippleKP = require("ripple-keypairs");

const app = express();
const port = 3000;

const jwtSecret = "some very secret value";

// Serve public folder
app.use(express.static("public"));

// API - Generate a nonce for the message to be signed
app.get("/nonce", (req, res) => {
  const nonce = uuidv4();
  const address = req.query.address;

  const token = jwt.sign({ nonce, address }, jwtSecret, {
    expiresIn: "60s",
  });

  res.json(token);
});

// API - Verify the token
app.post("/verify", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const tempToken = authHeader && authHeader.split(" ")[1];

  if (tempToken === null) {
    return res.sendStatus(403);
  }

  const { address } = await jwt.verify(tempToken, jwtSecret);
  const { signature } = req.query;

  // Verify the signature, tempToken and address match
  const tempTokenHex = (Buffer.from(tempToken, 'utf8')).toString('hex')
  const isVerified = rippleKP.verify(
    tempTokenHex,
    signature,
    address,
  );

  if (isVerified) {
    const token = jwt.sign({ verifiedAddress: address }, jwtSecret, { expiresIn: "1d" });
    res.json({ token });
  } else {
    res.sendStatus(403);
  }
});

// Make the app listen to the port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
