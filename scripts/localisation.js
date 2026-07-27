const button = document.getElementById("toggle");
const text = document.getElementById("langSelector");

function loadTranslations(language) {
	const spoilerContent = document.getElementById("spoilerContent");
	const spoilerLink = document.getElementById("spoiler-container-a");
	const lang = text.innerText;

	const lunch = document.getElementById("lunch");
	const dinner = document.getElementById("dinner");
	const booze = document.getElementById("booze");

	const lunch_download = document.getElementById("lunch_download");
	const dinner_download = document.getElementById("dinner_download");
	const booze_download = document.getElementById("booze_download");

	if (lunch && dinner) {
		if (language === "zh") {
			lunch.src = "images/Picanhas'Restaurant_menu_lunch_chin.jpg";
			dinner.src = "images/Picanhas'Restaurant_menu_dinner_chin.jpg";
			booze.src = "images/Picanhas'RestaurantHK_menu_booze_eng.png"; //should be chinese, no chinese menu rn
			lunch_download.href = "images/Picanhas'Restaurant_menu_lunch_chin.jpg";
			dinner_download.href = "images/Picanhas'Restaurant_menu_dinner_chin.jpg";
			booze_download.src = "images/Picanhas'RestaurantHK_menu_booze_eng.png"; //should be chinese, no chinese menu rn
		} else {
			lunch.src = "images/Picanhas Menu Lunch -eng.jpg";
			dinner.src = "images/Picanhas Menu Dinner -eng.jpg";
			booze.src = "images/Picanhas'RestaurantHK_menu_booze_eng.png";
			lunch_download.href = "images/Picanhas Menu Lunch -eng.jpg";
			dinner_download.href = "images/Picanhas Menu Dinner -eng.jpg";
			booze_download.src = "images/Picanhas'RestaurantHK_menu_booze_eng.png";
		}
	}

	// Uncomment and fix this if needed
	// if (spoilerContent.classList.contains("active")) {
	//     spoilerLink.innerText = lang === "EN" ? "少" : "LESS ..."; // Change link text
	// } else {
	//     spoilerLink.innerText = lang === "EN" ? "更多" : "MORE ..."; // Change link text
	// }

	fetch(`text/${language}.json`)
		.then((response) => response.json())
		.then((translations) => {
			console.log(translations);
			const elements = document.querySelectorAll("[data-localize]");
			elements.forEach((element) => {
				const key = element.getAttribute("data-localize");
				element.innerText = translations[key];
			});
		})
		.catch((error) => console.error("Error loading translations:", error));
}

function handleClick(language) {
	if (language === "en") {
		text.innerText = "中文";
	} else {
		text.innerText = "EN";
	}
	localStorage.setItem("selectedLanguage", language); // Store
}

text.addEventListener("click", () => {
	if (text.innerText === "EN") {
		handleClick("en");
		loadTranslations("en");
	} else {
		handleClick("zh");
		loadTranslations("zh");
	}
});

// Load default language
window.onload = function () {
	let selectedLanguage = localStorage.getItem("selectedLanguage") || "en"; // Default to English
	console.log(selectedLanguage);
	text.innerText = selectedLanguage === "en" ? "中文" : "EN"; // Update toggle button text
	loadTranslations(selectedLanguage);
};
