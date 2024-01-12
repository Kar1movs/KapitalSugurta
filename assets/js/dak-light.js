let darkMode = localStorage.getItem("dark-mode");
const darkModeToggle = document.querySelector(".mode-theme-js");
let svgNone = document.querySelectorAll(".svg-none");
let saveToggle = document.querySelector(".dark-mode input[type='checkbox']");
const wrapper = document.querySelector(":root");

const enableDarkMode = () => {
    document.documentElement.classList.add("dark-mode");
    document.documentElement.classList.remove("light-mode");
    wrapper.setAttribute("data-theme", "dark");
    darkModeToggle.classList.add("active");
    saveToggle.setAttribute("checked", "true");

    for (let i = 0; i < svgNone.length; i++) {
        const element = svgNone[i];
        element.style.display = "none";
    }

    localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
    document.documentElement.classList.add("light-mode");
    document.documentElement.classList.remove("dark-mode");
    wrapper.setAttribute("data-theme", "light");
    darkModeToggle.classList.remove("active");
    saveToggle.setAttribute("checked", "false");
    for (let i = 0; i < svgNone.length; i++) {
        const element = svgNone[i];
        element.style.display = "block";
    }

    localStorage.setItem("dark-mode", null);
};

if (darkMode === 'enabled') {
    enableDarkMode();
}


function enableScroll() {
    window.onscroll = function () {
    };
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");

    if (darkMode !== 'enabled') {
        enableDarkMode();
        /*disableScroll();*/
    } else {
        disableDarkMode();
    }
});
/* ************************************************************ */