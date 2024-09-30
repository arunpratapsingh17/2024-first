const shareData = require("./share.json");
const persons = shareData.Expenses[0].personShare.map(
  (person) => person.personName
);

const finalOweShare = {};
persons.forEach((person) => {
  finalOweShare[person] = {};
  persons.forEach((otherPerson) => {
    if (otherPerson !== person) {
      finalOweShare[person][otherPerson] = 0;
    }
  });
});

const calculateShareForEachExpense = (expense) => {
  const sharedBy = expense.personShare.filter(
    (person) => person.hasShare
  ).length;
  const shareAmount = expense.Amount / sharedBy;
  expense.personShare.forEach((person) => {
    if (person.hasShare) {
      if (expense.paid_by === person.personName) {
        finalOweShare[expense.paid_by][person.personName] = 0;
      } else
        finalOweShare[expense.paid_by][person.personName] =
        parseFloat((finalOweShare[expense.paid_by][person.personName] + shareAmount).toFixed(2));
    }
  });
};

const shareCalculator = () => {
  shareData.Expenses.forEach((expense) => {
    calculateShareForEachExpense(expense);
  });
  console.log("finalOweShare final", finalOweShare);
  //  calculateShareForEachExpense(expense);
};
shareCalculator();
