var projectList;
var iosLink;
var androidLink;
var pcLink;

function FetchData() {
  return fetch("https://opensheet.elk.sh/1RY5JCg4WrsETn6vzrRp27dch2V9zgx1kI3xBLnaymWY/ProjectList")
      .then(res => res.json())
      .then(list => { 
        projectList = list;
        //ValidateData();
        ShowProjectInfo(1);
      })
      .catch(err => console.error("Error reading JSON:", err));       
}

function ValidateData() {
  projectList.forEach(item => {
      var packageName = item.packageName;
      var storeUrl = "/api/app-info?appId=" + packageName;
      fetch(storeUrl)
      .then(res => res.json())
      .then(data => {
        document.querySelector('#icon').src = data.icon;
        item.projectName = data.title;
        item.ratting = data.ratting;
       });
    }
  ); 
}

function ShowProjectInfo(id) { 
  if (!projectList) {
    console.warn("Data hasn't ready!");
    return;
  }
  projectList.forEach(item => {
    if(item.id == id) {
      document.getElementById("id_ProjectName").textContent = item.projectName;
      document.getElementById("id_ProjectDescription").textContent = item.description;
      iosLink = item.iosLink;
      androidLink = item.androidLink;
      RunShowInfoAnim();
      RunShowBannerAnim();
    }
    }
  );   
  SetActiveMiniIcon(id);                                   
}

function RunShowInfoAnim() {
  let element = document.getElementById("character__content");
  if(element == null)
      return;
  element.classList.remove('fade_in_anim');
  element.classList.add('fade_in_anim');
  element.addEventListener('animationend', () => {
    element.classList.remove('fade_in_anim');
  });
}

function RunShowBannerAnim() {
  let element = document.getElementById("character__person");
  if(element == null)
      return;
  element.classList.remove('fade_in_anim');
  element.classList.remove('character_move_in_anim');
  element.classList.add('fade_in_anim');
  element.classList.add('character_move_in_anim');
  element.addEventListener('animationend', () => {
    element.classList.remove('fade_in_anim');
    element.classList.remove('character_move_in_anim');
  });
}

function SetActiveMiniIcon(id) {
  projectList.forEach(item => {
    let element = document.getElementById("character_page_mini_icon_"+item.id);
    if(element == null)
      return;
    if(item.id == id) {
      element.classList.add('swiper-slide-thumb-active');
      element.classList.remove('swiper-slide-active');
    }
    else {
      element.classList.add('swiper-slide-active');
      element.classList.remove('swiper-slide-thumb-active');
    }
    }
  );   
}


function OpenStoreLink(deviceType) {
  if(deviceType == DeviceType.IOS) {
    OpenLink(iosLink,"_blank")
  }
  else if(deviceType == DeviceType.Android) {
    OpenLink(androidLink,"_blank")
  }
}
// Target: _blank, _self
function OpenLink(link, target) {
  if(isNullEmptyOrWhitespace(link)) {
    return;
  }
  window.open(link,target)
}

const DeviceType = Object.freeze({
  IOS: "ios",
  Android: "android",
  Pc: "pc",
})

function isNullEmptyOrWhitespace(value) {
  return value === null || (typeof value === 'string' && value.trim() === '') || value == undefined;
}
