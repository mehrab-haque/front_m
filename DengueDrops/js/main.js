function back() {
  var x, y;
  x = document.getElementsByClassName("sec1");
  x[0].style.display = "block";
  y = document.getElementsByClassName("sec2");
  y[0].classList.add("d-none");
  window.scrollTo(0, 0);
}

function next() {
  var x, y;
  x = document.getElementsByClassName("sec2");
  y = document.getElementsByClassName("sec3");
  x[0].style.display = "none";
  y[0].classList.remove("d-none");
}

function changePatientTypeDropdown(objDropDown) {
  const ageInputSection = document.getElementById("ageInputSection");
  patientTypeSelected = objDropDown.value;
  // if (patientTypeSelected == "child") {
  //   ageInputSection.style.display = "";
  // } else {
  //   ageInputSection.style.display = "none";
  // }
}
let patientType,
  drop,
  ft,
  inch = 0,
  gender,
  weight,
  systole,
  diastole,
  capillaryRefillTime,
  ageYear = 0,
  ageMonth = 0;
function setPatientInfoTable() {
  var patientTypeText = document.getElementById("patientTypeText");
  var heightText = document.getElementById("heightText");
  var genderText = document.getElementById("genderText");
  var bloodPressureText = document.getElementById("bloodPressureText");
  var ageText = document.getElementById("ageText");
  var capillaryRefillTimeText = document.getElementById(
    "capillaryRefillTimeText"
  );
  var bodyWeightText = document.getElementById("bodyWeightText");
  var dropFactorText = document.getElementById("dropFactorText");

  patientTypeText.innerHTML = patientType.toUpperCase();
  heightText.innerHTML = `${ft} ft ${inch} inch`;
  genderText.innerHTML = gender.toUpperCase();
  bloodPressureText.innerHTML = `${systole}/${diastole}`;
  ageText.innerHTML = `${ageYear}Y ${ageMonth}M`;

  capillaryRefillTimeText.innerHTML = capillaryRefillTime;
  bodyWeightText.innerHTML = weight;
  if (drop != null && drop == 15) {
    dropFactorText.innerHTML = "15 Drop = 1mL";
  } else {
    dropFactorText.innerHTML = "60 Drop = 1mL";
  }
}

function calculate() {
  patientType = document.getElementById("patientType").value;
  drop = parseInt(document.getElementById("drop").value);
  ft = parseInt(document.getElementById("ft").value);
  inch = parseInt(document.getElementById("in").value);
  gender = document.getElementById("gender").value;
  weight = parseFloat(document.getElementById("weight").value);
  systole = parseInt(document.getElementById("systolic").value);
  diastole = parseInt(document.getElementById("diastolic").value);
  capillaryRefillTime = document.getElementById("capillaryRefillTime").value;
  ageYear = parseInt(document.getElementById("ageYear").value);
  ageMonth = parseFloat(document.getElementById("ageMonth").value);
  dpmName = document.getElementById("dpm_name");

  if (isNaN(ageMonth)) {
    ageMonth = 0;
  }
  if (isNaN(inch)) {
    inch = 0;
  }
  if (ageMonth > 12 || ageMonth < 0) {
    alert("Age month must be under 0 to 12");
    return;
  }

  setPatientInfoTable();
  let maintenanceFluidRequirement,
    deficitFluidRequirement,
    degree,
    diff,
    result,
    error,
    error1,
    error2,
    error3,
    ans,
    x,
    y,
    quad,
    dpm,
    height,
    bmi,
    shock;

  error = document.getElementsByClassName("error");
  error1 = document.getElementsByClassName("error-1");
  error2 = document.getElementsByClassName("error-2");
  error3 = document.getElementsByClassName("shock");

  let calculatedIbw = weight; //initialize with weight
  diff = systole - diastole;
  height = 30.48 * ft + 2.54 * inch; // converted to meter
  bmi = weight / Math.pow(height / 100, 2);

  shock = 0;
  if (
    isNaN(weight) ||
    isNaN(systole) ||
    isNaN(diastole) ||
    isNaN(ft) ||
    isNaN(inch)
  ) {
    error[0].classList.remove("d-none");
    if (!error1[0].classList.contains("d-none")) {
      error1[0].classList.add("d-none");
    }
    if (!error2[0].classList.contains("d-none")) {
      error2[0].classList.add("d-none");
    }
    if (!error3[0].classList.contains("d-none")) {
      error3[0].classList.add("d-none");
    }
    return;
  } else if (!error[0].classList.contains("d-none")) {
    error[0].classList.add("d-none");
  }

  if (patientType == "child" && (isNaN(ageYear) || isNaN(ageMonth))) {
    error[0].classList.remove("d-none");
    if (!error1[0].classList.contains("d-none")) {
      error1[0].classList.add("d-none");
    }
    if (!error2[0].classList.contains("d-none")) {
      error2[0].classList.add("d-none");
    }
    if (!error3[0].classList.contains("d-none")) {
      error3[0].classList.add("d-none");
    }
    return;
  }

  if (patientType == "adult") {
    if (bmi > 25) {
      if (gender == "male") {
        let temp = height - 152.4;
        if (temp < 0) {
          temp = 0;
        }
        calculatedIbw = 50 + 0.91 * temp; //(height-152.4) will be min 0
      } else {
        let temp = height - 152.4;
        if (temp < 0) {
          temp = 0;
        }
        calculatedIbw = 45.5 + 0.91 * temp; //(height-152.4) will be min 0
      }
      calculatedIbw = calculatedIbw.toFixed(2);
      ibw = document.getElementsByClassName("ibw");
      ibw[0].classList.remove("d-none");
      document.getElementById("ibw").innerHTML = calculatedIbw; // kg will be added
    } else if (!error2[0].classList.contains("d-none")) {
      error2[0].classList.add("d-none");
    }
    if (bmi <= 25) {
      //if bmi<=25 -> ibw not used for this patient
      ibw = document.getElementsByClassName("ibw");
      ibw[0].classList.remove("d-none");
      // document.getElementById("ibw").innerHTML = calculatedIbw;
      document.getElementById("ibw").innerHTML = "N/A";
    }
  } else if (patientType == "child") {
    let tempAgeMonth = ageYear * 12 + ageMonth;
    let ageMonthInt = parseInt(tempAgeMonth);
    let ageMonthConverted;
    if (tempAgeMonth < 24) {
      ageMonthConverted = Math.round(tempAgeMonth);
    } else {
      if (tempAgeMonth - ageMonthInt == 0.5) {
        ageMonthConverted = tempAgeMonth;
      } else {
        ageMonthConverted = Math.round(tempAgeMonth);
      }
    }

    if (ageMonthConverted < 12) {
      calculatedIbw = (ageMonthConverted+9)/2;
    } else if(ageMonthConverted >= 12 && ageMonthConverted <=84){
      calculatedIbw = (ageMonthConverted/6)+8;
    }else {
      calculatedIbw = (ageMonthConverted/12)*3;
    }

    // let tempHeight = height / 100;
    // let ageMonthStr = ageMonthConverted.toFixed(1);
    // calculatedIbw = bmi_table[gender][ageMonthStr] * Math.pow(tempHeight, 2);

    calculatedIbw = calculatedIbw.toFixed(2);
    let originalIbw=calculatedIbw
    if (calculatedIbw > weight) {
      calculatedIbw = weight;
    }
    

    ibw = document.getElementsByClassName("ibw");
    ibw[0].classList.remove("d-none");
    document.getElementById("ibw").innerHTML = originalIbw;
  }

  if (patientType == "adult" && ageYear <= 18) {
    alert("Age less than 18 not accepted for adult");
    return;
  }

  if (patientType == "child" && ageYear > 18) {
    alert("Age greater than 18 not accepted for child");
    return;
  }

  if (diff <= 20 || capillaryRefillTime == "> 2 sec") {
    shock = 1;
  }

  // if (patientType == "adult") {
  //   if (systole >= 150 || diastole >= 100) {
  //     alert(
  //       "The patient has hypertension. It is better to use clinical judgement. However, a tentative fluid amount can still be suggested."
  //     );
  //   }

  //   if (systole < 90 || diastole < 60) {
  //     shock = 1;
  //   }
  // }

  // if (patientType == "child") {
  //   if (systole >= 120 || diastole >= 80) {
  //     alert(
  //       "The patient has hypertension. It is better to use clinical judgement. However, a tentative fluid amount can still be suggested."
  //     );
  //   }

  //   let ageYearConverted = ageYear + ageMonth / 12;
  //   // For month less than 1
  //   if (
  //     ageYearConverted >= 0 &&
  //     ageYearConverted <= 0.0833333 &&
  //     systole < 60
  //   ) {
  //     shock = 1;
  //   }
  //   // For Infant
  //   else if (
  //     ageYearConverted > 0.0833333 &&
  //     ageYearConverted <= 1 &&
  //     systole < 70
  //   ) {
  //     shock = 1;
  //   }
  //   // For Toddler
  //   else if (
  //     ageYearConverted > 1 &&
  //     ageYearConverted <= 10 &&
  //     systole < 70 + ageYearConverted * 2
  //   ) {
  //     shock = 1;
  //   }
  //   // For Preschool
  //   else if (ageYearConverted > 10 && ageYearConverted <= 18 && systole < 90) {
  //     shock = 1;
  //   }
  // }

  if (shock == 1) {
    error3[0].classList.remove("d-none");
    alert(
      "The patient has narrow pulse pressure. Please use clinical judgement to proceed further"
    );
    return;
  } else if (!error3[0].classList.contains("d-none")) {
    error3[0].classList.add("d-none");
  }

  x = document.getElementsByClassName("sec1");
  x[0].style.display = "none";
  y = document.getElementsByClassName("sec2");
  y[0].classList.remove("d-none");

  // console.log(calculatedIbw);

  if (calculatedIbw <= 10) {
    maintenanceFluidRequirement = calculatedIbw * 100;
  } else if (calculatedIbw <= 20) {
    maintenanceFluidRequirement = 1000 + (calculatedIbw - 10) * 50;
  } else {
    maintenanceFluidRequirement = 1500 + (calculatedIbw - 20) * 20;
  }
  maintenanceFluidRequirement = Math.round(maintenanceFluidRequirement);
  document.getElementById("result").innerHTML = maintenanceFluidRequirement;

  degree = 5;
  deficitFluidRequirement = Math.round(degree * calculatedIbw * 10);
  fl = "Flowrate";
  document.getElementById("flow").innerHTML = fl;
  document.getElementById("deficit-per").innerHTML = degree;
  document.getElementById("deficit-req").innerHTML = deficitFluidRequirement;

  result = Math.round(deficitFluidRequirement + maintenanceFluidRequirement);
  document.getElementById("total").innerHTML = result;

  if (patientType == "child") {
    ans = 1.5 * calculatedIbw;
    let ansRound = Math.round(ans);
    document.getElementById("start").innerHTML = ansRound;
  } else if (patientType == "adult") {
    ans = 40;
    document.getElementById("start").innerHTML = ans;
  }

  dpm = Math.round((ans / 60) * drop);
  document.getElementById("dpm").innerHTML = dpm;
  if (drop == 15) {
    dpmName.innerHTML = "Drops per minute";
  } else {
    dpmName.innerHTML = "micro drops per minute";
  }

  quad = Math.round(ans) * 6;
  document.getElementById("quad").innerHTML = quad;

  showChart(patientType, calculatedIbw, drop);
  window.scrollTo(0, 0);

  return result;
}

const child = [1.5, 3, 5, 7];
const adult = [0.8, 1.6, 2.4, 4]; // old[40, 80, 120, 200]
var i = 0;
function flowRate() {
  let weight = parseInt(document.getElementById("weight").value);
  let condition = document.getElementById("condition").value;
  let oral = parseInt(document.getElementById("oral").value);
  let iv = parseInt(document.getElementById("iv").value);
  let patientType = document.getElementById("patientType").value;
  let drop = parseInt(document.getElementById("drop").value);

  var z, x, total, final;

  z = document.getElementsByClassName("error");
  x = document.getElementsByClassName("flowrate");

  if (isNaN(oral) || isNaN(iv)) {
    z[0].classList.remove("d-none");
    console.log(oral, iv);
    return;
  }
  if (!z[0].classList.contains("d-none")) {
    z[0].classList.add("d-none");
  }

  x[0].classList.remove("d-none");
  x[1].classList.remove("d-none");
  // index       = [0,   1, 2, 3]
  // const child = [1.5, 3, 5, 7];
  // const adult = [0.8, 1.6, 2.4, 4];
  if (condition == "yes") {
    i = i - 1;
    if (i < 0) {
      i = 0;
    }
  } else {
    i = i + 1;
    if (i > 3) {
      i = 3;
    }
  }

  if (patientType == "child") {
    total = child[i] * weight;
  } else {
    total = adult[i];
  }
  final = calculate() - oral - iv;
  dpm = Math.round((total / 60) * drop);

  total = Math.round(total);
  dpm = Math.round(dpm);
  final = Math.round(final);
  document.getElementById("nextFlowRate").innerHTML = total;
  document.getElementById("drops").innerHTML = dpm;
  document.getElementById("final").innerHTML = final;
}

function getApexChartsBase64Image() {
  return new Promise((resolve, reject) => {
    const img = new Image((width = 800), (height = 500));
    const svgElement = document.querySelector(".apexcharts-svg");
    const imageBlobURL =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(svgElement.outerHTML);
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = imageBlobURL;
  });
}

async function handleSaveAsPdfBtn() {
  document.getElementsByClassName("hide-portion1")[0].hidden = true;
  document.getElementsByClassName("hide-portion2")[0].hidden = true;
  document.getElementsByClassName("hide-portion3")[0].hidden = true;

  window.print();

  document.getElementsByClassName("hide-portion1")[0].hidden = false;
  document.getElementsByClassName("hide-portion2")[0].hidden = false;
  document.getElementsByClassName("hide-portion3")[0].hidden = false;

  // var doc = new jsPDF("p", "pt", "letter");
  // // window.scrollTo(0, 0);
  // var patientInfoSection = document.getElementById("patientInfoSection");
  // var resultSection = document.getElementById("resultSection");
  // var options = {
  //   quality: 1,
  // };

  // // Graph
  // doc.addImage(
  //   await getApexChartsBase64Image(),
  //   "JPEG",
  //   100,
  //   50,
  //   0,
  //   0,
  //   "alias2",
  //   "SLOW"
  // );

  // // Patient info table
  // let patientInfoSectionDataUrl = await domtoimage.toJpeg(
  //   patientInfoSection,
  //   options
  // );
  // doc.addImage(patientInfoSectionDataUrl, "JPEG", 100, 350, 0, 0);

  // // Result table
  // doc.addPage();
  // let resultSectionDataUrl = await domtoimage.toJpeg(resultSection, options);
  // doc.addImage(resultSectionDataUrl, "JPEG", 100, 50, 0, 0);

  // doc.save("IVfluid Result.pdf");
}
