let confirmBeforeAdd = false;

function check_location() {
  return (
    window.location.hostname == "vk.com" &&
    window.location.pathname == "/friends" &&
    window.location.search == "?act=find"
  );
}

function 함수명뭐라짓지() {
  const nmut_adds = document.querySelectorAll(".friends_find_user_info");
  const results = [];
  nmut_adds.forEach(value => {
    const add_elem = value.getElementsByClassName("friends_find_user_add")[0];
    const name = value.getElementsByClassName("friends_find_user_name")[0].innerText;
    const profile_link = value.getElementsByClassName("friends_find_user_name")[0].href;
    const mutual = value.getElementsByClassName("friends_find_user_label")[0].innerText;
    results.push({ add_elem, name, profile_link, mutual });
  });
  return results;
}

function add(data) {
  console.log(`%cдобавляю ${data.name} в друзья...`, "font-size: 14px; font-weight: bold; color: #1577FA;");
  data.add_elem.click();
  console.log("Запрос отправлен! -> " + data.profile_link);
}

function skip(data) { console.log(`%cПропуск ${data.name}...`, "font-size: 14px; font-weight: bold; color: red;"); }

async function click_add_link(data) {
  let func = ((confirmBeforeAdd) ? confirm(`Do you want to add ${data.name}?\n${data.mutual}\nprofileLink: ${data.profile_link}`) : true) ? add : skip;
  func(data);
}

async function jinjjaro_add(datas) {
  for (const data of datas) {
    await new Promise(resolve => setTimeout(() => {
      click_add_link(data);
      resolve();
    }, 1000));
  }
  console.log("%cAll Done!",'color: #1577FA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;');
}

window.addEventListener("load", async (event) => {
  if (check_location()) {
    if (confirm("Вы хотите начать использовать Auto Friend Adder?")) {
      console.log('%cVK Friend Adder!', 'color: #1577FA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;');
      confirmBeforeAdd = confirm("Do you want to confirm before adding?");
      alert("Пожалуйста, подождите, пока процесс завершится.");
    	console.log("%cПоехали!", "font-size: 18px; font-weight: bold; color: red;");
      await jinjjaro_add(함수명뭐라짓지());
    }
  }
});