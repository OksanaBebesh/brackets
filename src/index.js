module.exports = function check(str, bracketsConfig) {
  return checkAll(str, bracketsConfig).length === 0;
};

const cleaningStr = (str, symbolToCut) => {
  let strClean = "";
  strClean = str.replace(symbolToCut, "");
  return strClean;
};

const checkAll = (str, configRules) => {
  let masksArray = [];
  let finalStr = str;
  configRules.forEach((rule) => {
    let ruleCombine = rule.toString().replace(",", "");
    masksArray.push(ruleCombine);
    finalStr = cleaningStr(finalStr, ruleCombine);
  });

  if (finalStr.length === 0) return "";

  masksArray.forEach((rule) => {
    if (finalStr.includes(rule) === true && finalStr.length > 0) {
      finalStr = cleaningStr(finalStr, rule);
      finalStr = checkAll(finalStr, configRules);
    }
  });
  return finalStr;
};
