// get arguments from node process
const args = process.argv.slice(2);

// get requested consumption
const consumption = args[0];

// check if consumption parameter is a valid number
// exit program if its not
if (isNaN(consumption))
  console.log(`not a valid consumption argument`) && process.exit();

// sort function
const sortForResult = (a, b) => {
  return parseInt(a.result) - parseInt(b.result);
};

// Calculation model:
// base costs per month 5 € + consumption costs 22 cent/kWh
function baseElectricityTariff(consumption) {
  const annualFee = 5 * 12;
  const costInCent = consumption * 22;
  const costInEur = costInCent / 100;
  return costInEur + annualFee;
}

// Calculation model:
// 800 € for up to 4000 kWh/year and above 4000 kWh/year additionally 30 cent/kWh.
function packagedTariff(consumption) {
  let additionallyUsedCostInCent;
  if (parseInt(consumption) > 4000) {
    const additionallyUsed = consumption - 4000;
    additionallyUsedCostInCent = additionallyUsed * 30;
  } else {
    additionallyUsedCostInCent = 0;
  }
  const additionallyUsedCostInEUR = additionallyUsedCostInCent / 100;
  return additionallyUsedCostInEUR + 800;
}

// compare and print results
function compareAndPrint(consumption) {
  const baseTariffResult = {
    name: "base electricity tariff",
    result: baseElectricityTariff(consumption),
  };
  const packagedTariffResult = {
    name: "package tariff",
    result: packagedTariff(consumption),
  };
  const results = [baseTariffResult, packagedTariffResult].sort(sortForResult);
  results.forEach((result, index) =>
    console.log(`${index + 1}. ${result.name} ${result.result}€/year`)
  );
}

// call compare function
compareAndPrint(consumption);
