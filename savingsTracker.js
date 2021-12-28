var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the Savings Goal Tracker App!\n");

let initAmount = 0;
let totalSum = 0;

rl.question(
  "What savings challege is your prompt for? Press 1 for 10c Challenge or 2 for R5 challege\n",
  function (res) {
    console.log("Option seleccted:", res);
    if (res == 2) {
      console.log("Sorry! Still working on that one!");
      process.exit(0);
    }

    rl.question(
      "\nPlease enter the date for which you wish to know the accumulated amount. Use the format: YYYY-MM-DD\n",
      function (datePrompted) {
        currDate = new Date(datePrompted);
        var startDate = new Date(currDate.getFullYear(), 0, 0);
        var diff = currDate - startDate;
        var oneDay = 1000 * 60 * 60 * 24; //milliseconds * seconds * minutes * hours
        var nthDay = Math.floor(diff / oneDay);
        // console.log("Day" + nthDay, "of 365");

        if (res == 0) {
          console.log("\nSomething went wrong :(");
          process.exit(0);
        }

        while (res != 1 && res != 2) {
          console.log("\nInvalid option, try again!");
          rl.question(
            "\nWhat savings challege is your prompt for? Press 1 for 10c Challenge or 2 for R5 challege\n",
            function (retryRes) {
              res = retryRes;
              rl.close();
            }
          );
        }

        if (res == 1) {
          initAmount = 0.1;
          totalSum = accumulatedSum10c(nthDay);
        } else {
          //   totalSum = accumulatedSumR5(nthDay);
          console.log("\n :(");
        }
        // return totalSum;
        console.log(
          "\nFor the date:",
          datePrompted,
          "the sum accumulated for the\n",
          res == 1 ? "10c" : "R5",
          "savings challenge is: R",
          Math.round(totalSum),
          "\n\nThis is",
          ((totalSum / 6680) * 100).toFixed(2),
          "% through\n\n Well done!"
        );
        rl.pause();
      }
    );
  }
);

// rl.on("psuse", function () {
//   console.log("\nCalculating...");
// });

//10c Challenge Sum
function accumulatedSum10c(currDay) {
  return currDay * ((initAmount + initAmount * currDay) / 2);
}

//R5 Challenge Sum
function accumulatedSumR5(currDay) {
  let currPay = currDay * ((initAmount + initAmount * currDay) / 2);
  return currPay;
}
