const schedule = [
  ["A", "A", "A", "A", "A"],
  ["B", "B", "B", "B", "B"],
  ["E", "C", "D", "C", "E"],
  ["E", "C", "D", "C", "D"],
  ["D", "D", "E", "E", "C"],
  ["특강", "특강", "특강", "특강", "특강"],
];

let number = localStorage.getItem("number") | "";
if (list4[number]) {
  draw();
  document.querySelector("#back").style.backgroundImage =
    "url(" + number + ".jpg" + ")";
}
document.querySelector("form").addEventListener("submit", (el) => {
  el.preventDefault();
  number = el.target.number.value;
  if (number.length == 4)
    number = number[0] + "0" + number[1] + number[2] + number[3];

  if (!list4[number]) {
    const a = Object.keys(student).filter((el) => {
      return student[el] == number;
    });
    if (a[0]) number = a[0];
    else return;
    console.log(number);
  }
  localStorage.setItem("number", number);
  draw();
});

function draw() {
  const set4 = document.querySelectorAll(".set4-tr td");
  const set2 = document.querySelectorAll(".set2-tr td");
  const subject2 = document.querySelectorAll(" .subject2-tr td");
  const subject4 = document.querySelectorAll(" .subject4-tr td");
  const teacher4 = document.querySelectorAll(".teacher4-tr td");
  const teacher2 = document.querySelectorAll(".teacher2-tr td");

  document.querySelector(".name").innerHTML =
    number + " / 이름: " + student[number];

  //4단위
  subject4.forEach((sub, index) => {
    sub.innerHTML = list4[number][set4[index].innerText];
  });
  teacher4.forEach((tch, index) => {
    const a = whoTeacher(subject4[index].innerText, set4[index].innerText);
    tch.innerHTML = "<span>" + a + "</span>" + "<br/>" + where[a];
  });
  //2단위
  subject2.forEach((sub, index) => {
    if (list4[number][set2[index].innerText + "특강"]) {
      sub.innerHTML = list4[number][set2[index].innerText + "특강"];
    }
  });
  teacher2.forEach((tch, index) => {
    if (
      list4[number][set2[index].innerText + "특강"] &&
      list4[number][set2[index].innerText + "특강"] != "자습2"
    )
      tch.innerHTML =
        "<span>" +
        whoTeacher(set2[index].innerText + "특강", set2[index].innerText) +
        "</span>" +
        "<br/>" +
        where[
          whoTeacher(set2[index].innerText + "특강", set2[index].innerText)
        ];
    else tch.innerHTML = "";
  });

  const scheTr = document.querySelectorAll("#own-schedule tr");
  let now = new Date();
  let day = now.getDay();
  let healthCnt = 0;
  scheTr.forEach((tr, i) => {
    if (i != 0) {
      const td = tr.querySelectorAll("td");
      td.forEach((td, j) => {
        if (j != 0) {
          let a = schedule[i - 1][j - 1];
          if (a.length == 1) {
            if (list4[number][a]) {
              const div = document.createElement("div");
              div.innerHTML =
                list4[number][a] +
                "<br/>" +
                "(" +
                whoTeacher(list4[number][a], a) +
                "T)";
              div.title = "위치: " + where[whoTeacher(list4[number][a], a)];
              td.innerText = "";
              td.append(div);
              td.classList.add(a);
              if (day == j) td.classList.add("today");
            }
          }
          if (a.length == 2) {
            if (list4[number]["미적분특강"] == "참여") {
              td.innerHTML =
                "미적분특강" + "<br/>" + "(" + whoTeacher("미적분특강") + "T)";
              td.title = "위치: " + where[whoTeacher(list4[number][a], a)];
              if (day == j) td.classList.add("today");
            } else if (list4[number]["한능검특강"] == "참여") {
              td.innerHTML =
                "한능검특강" + "<br/>" + "(" + whoTeacher("한능검특강") + "T)";
              td.title = "위치: " + where[whoTeacher(list4[number][a], a)];
              if (day == j) td.classList.add("today");
            } else {
              td.innerHTML =
                "자습2" + "<br/>" + "(" + whoTeacher("자습2") + "T)";
              td.title = "위치: " + where[whoTeacher(list4[number][a], a)];
              if (day == j) td.classList.add("today");
            }
            td.classList.add("AA");
          }
        }
      });
    }
  });
}

function whoTeacher(sub, set) {
  if (teacher[sub]) return teacher[sub];
  if (teacher[sub + set]) return teacher[sub + set];
  console.log("errrrrorrrrr", sub, set);
  return undefined;
}

//Object.keys(list4).forEach(key=>{
//number = key;
//draw();
//})

const remainTime = document.querySelector("#hi");

function diffDay() {
  let masTime = new Date("2023-3-23");
  if (number == 20807) {
    masTime = new Date("2023-7-31");
  }
  const todayTime = new Date();

  const diff = masTime - todayTime;

  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  const diffSec = Math.floor((diff / 1000) % 60);
  const diffMS = Math.floor((diff / 100) % 60);

  if (number == 20807) {
    remainTime.innerText = `사관까지 ${diffDay}일${diffHour}시간${diffMin}분${diffSec}초`;
  } else {
    remainTime.innerText = `3모까지 ${diffDay}일${diffHour}시간${diffMin}분${diffSec}초`;
  }
}

diffDay();
setInterval(diffDay, 1000);
