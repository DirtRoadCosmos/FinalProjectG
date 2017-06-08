var pageNames = [
    "French_Revolution",
    "Beyonce",
    "Boston_Red_Sox",
    "The_Cuckoo%27s_Egg",
  ];
var quizPages = [];
var quizViews = [];
var today = new Date();

function setup() {
  createCanvas(800, 400);
  fetchQuizData();
}

function draw() {
  textSize(30);
  if (quizPages.length == pageNames.length) {
    background(255);
    text("ready to play", 40, 40);
    noLoop();
  } else {
    text("loading...", 40, 40);
    noLoop();
  }
}

function fetchQuizData() {
  for (var i = 0; i < pageNames.length; i++) {
    loadJSON("https://en.wikipedia.org/w/api.php?action=query&titles="
    + pageNames[i] + "&prop=pageviews&format=json", processQuizData, "jsonp");
  }
}

function processQuizData(data) {
  for (var p in data.query.pages) {
    var thePage = data.query.pages[p];
    var dates = Object.keys(thePage.pageviews).slice(-7);
    var theViewCount = 0;
    for (var i = 0; i < 7; i++) {
      theViewCount = theViewCount + thePage.pageviews[dates[i]];
    }
    quizPages.push(thePage.title);
    quizViews.push(theViewCount);
    print(thePage.title + ": " + theViewCount);
    break;
  }
  redraw();
}
