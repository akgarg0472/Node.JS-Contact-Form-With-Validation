const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect(process.env.DB__CONNECTION__URI)
  .then(() => {
    console.log(chalk.bgWhite.black("Connection established with database"));
  })
  .catch((err) => {
    console.log(
      chalk.bgRed.whiteBright(
        `Connection to database failed.\nReason: ${err.message}`
      )
    );
  });
