/*
    Inflacionômetro - Simulação do impacto da inflação nos preços
    Copyright (C) 2014  Estudantes Pela Liberdade

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


var availableFIRs = [
  0.983, //The great deflation period
  1.016, //Average dollar inflation last 5 years
  1.025, //Piso da meta de inflacao
  1.045, //Meta de inflacao
  1.065, //Teto meta inflacao
  1.090, //Media IPCA alimentos ultimos 4 anos (2010-2013)
  1.25, //2012 Argentina Inflation
  1.570, //Anual Inflation on Venezuela Feb/2014
  20.0, //Hiperinflacao ano anterior plano real
  30.0, //Maximo Hiperinflacao 1990
];

var descriptionFIRs = [
  "Deflação do 'The Great Deflation'",
  "Inflação média do Dólar desde 2009",
  "Piso da meta do Banco Central",
  "Meta do Banco Central",
  "Teto da meta do Banco Central",
  "Infl. média de alimentos desde 2010",
  "Infl. anual da Argentina em 2012",
  "Infl. anual da Venezuela",
  "Hiperinfl. antes do Plano Real",
  "Hiperinflação em 1990"
];

var availableYears = [];
for (i=1994; i<=2050; i++) {
  availableYears.push(i);
}

/*var availableYears = [2000, //initialYear
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2025,
    2030,
    2035,
    2040,
    2045,
    2050,
    2055,
    2060,
    2065,
    2070,
    2075,
    2080,
    2085,
    2090,
    2095,
    2100,
    2150,
    2200,
    2250,
    2300];*/

var initialYear = availableYears[0];
var defaultYear = 0;
var defaultFIR = 5;
var selectedYear = defaultYear;
var selectedFIR = defaultFIR;
var fatorCorr94 = 1.269850588;
var userInteractedYear = false;
var userInteractedRate = false;
//IPCA Alimentos e Bebidas de acordo com
//http://www.ibge.gov.br/home/estatistica/indicadores/precos/inpc_ipca/ipca-inpc_201405_3.shtm
var inflationHistory = [
  1.0841, //1995
  1.0171, //1996
  1.0122, //1997
  1.0195, //1998
  1.0814, //1999
  1.032,  //2000
  1.0963, //2001
  1.1947, //2002
  1.0748, //2003
  1.0386, //2004
  1.0199, //2005
  1.0122, //2006
  1.1079, //2007
  1.1111, //2008
  1.0318, //2009
  1.1039, //2010
  1.0718, //2011
  1.0986, //2012
  1.0848  //2013
]

var pages = [
  {
  ID: ".anuncio1",
  width: 2048,
  height: 1536,
  items: [
      //X and Y must be percentage
      //Azeite portugues galo
      {x: 745, y: 355, price: 5.68, highlight: false },
      //Farinha de trigo especial
      {x: 50, y: 800, price: 0.75, highlight: false },
      //Acucar uniao
      {x: 310, y: 760, price: 0.69, highlight: false },
      //Oleo de soja
      {x: 820, y: 960, price: 0.78, highlight: false },
      //Arroz agulinha
      {x: 565, y: 1085, price: 3.19, highlight: false },
      //Feijao carioca
      {x: 620, y: 1290, price: 1.19, highlight: false },
      //Arroz camil (destaque)
      {x: 20, y: 1180, price: 3.28, highlight: true },
      //2a pagina
      //Ervilha
      {x: 1290, y: 165, price: 0.35, highlight: false },
      //Extrato tomate
      {x: 1135, y: 415, price: 0.68, highlight: false },
      //Maionese
      {x: 1580, y: 475, price: 1.59, highlight: false },
      //Fuba Yoki
      {x: 1840, y: 350, price: 0.45, highlight: false },
      //Milho Verde
      {x: 1125, y: 870, price: 0.62, highlight: false },
      //Molho tomate
      {x: 1540, y: 980, price: 0.85, highlight: false },
      //Macarrao instantaneo (oferta)
      {x: 1875, y: 650, price: 0.45, highlight: true },
      //Macarrao com ovos
      {x: 1330, y: 1100, price: 0.88, highlight: false },
    ]
  },
  {
    ID: ".anuncio2",
    width: 2048,
    height: 1536,
    items: [
      //Leite condensado
      {x: 425, y: 340, price: 1.14, highlight: false },
      //Bono
      {x: 777, y: 503, price: 0.69, highlight: false },
      //Achocolatado Mágico
      {x: 237, y: 500, price: 0.99, highlight: false },
      //Creme de leite
      {x: 23, y: 795, price: 0.85, highlight: false },
      //Biscoito agua e sal
      {x: 433, y: 780, price: 0.42, highlight: false },
      //Leite em po
      {x: 535, y: 1005, price: 2.99, highlight: false },
      //Cafe pilao
      {x: 5, y: 1150, price: 2.59, highlight: true },
      //Bombom lacta
      {x: 835, y: 1290, price: 2.68, highlight: false },
      //2a pagina
      //Bolo doce desejo
      {x: 1435, y: 110, price: 11.40, highlight: false },
      //Bisnaguinha
      {x: 1645, y: 156, price: 1.32, highlight: false },
      //Bolo bauduco
      {x: 1580, y: 318, price: 2.28, highlight: false },
      //Pao seven boys
      {x: 1230, y: 628, price: 1.32, highlight: false },
      //Pao de forma wickbold
      {x: 1860, y: 510, price: 1.32, highlight: false },
      //Pao hot-dog
      {x: 1110, y: 870, price: 0.99, highlight: false },
      //Pao de sal (destaque)
      {x: 1880, y: 900, price: 0.05, highlight: true },
      //Pao p/ Hamburguer
      {x: 1085, y: 1280, price: 1.18, highlight: false },
      ]
  },
  {
    ID: ".anuncio3",
    width: 2048,
    height: 1536,
    items: [
      //Pizza Perdigão
      {x: 490, y: 365, price: 3.98, highlight: false },
      //Lasanha Sadia
      {x: 345, y: 495, price: 4.29, highlight: false },
      //Linguica Seara
      {x: 695, y: 735, price: 2.38, highlight: false },
      //Linguica Frango Perdigao
      {x: 341, y: 895, price: 4.90, highlight: false },
      //Salame Italiano Peridgao
      {x: 725, y: 925, price: 8.80, highlight: false },
      //Salsicha Hot-Dog Perdigao A granel
      {x: 718, y: 1110, price: 1.75, highlight: false },
      //Sorvete Kibon Vários Sabores
      {x: 10, y: 1185, price: 5.90, highlight: true },
      
      //Achocolatado Choco Milk
      {x: 1355, y: 125, price: 1.09, highlight: false },
      //Iogurte Danup
      {x: 1060, y: 325, price: 2.08, highlight: false },
      //Chamyto
      {x: 1355, y: 555, price: 1.99, highlight: false },
      //Creme Becel
      {x: 1450, y: 730, price: 3.65, highlight: false },
      //Requeijao Nestle
      {x: 1885, y: 580, price: 1.78, highlight: false },
      //Queijo Prato
      {x: 1320, y: 995, price: 5.38, highlight: false },
      //Pudim Nestle
      {x: 1843, y: 1040, price: 2.96, highlight: false },
      //Suco Laranja Leco
      {x: 1290, y: 1170, price: 1.69, highlight: false },
      //Petit Suisse Paulista
      {x: 1660, y: 1305, price: 1.78, highlight: false },
      //Leite Longa Vida Paulista
      {x: 1870, y: 315, price: 0.59, highlight: true },
      ]
  },
  {
    ID: ".anuncio4",
    width: 2048,
    height: 1536,
    items: [
      //Corimbata
      {x: 795, y: 265, price: 1.38, highlight: false },
      //Camarao vermelho
      {x: 378, y: 490, price: 8.90, highlight: false },
      //Dourado
      {x: 560, y: 550, price: 4.80, highlight: false },
      //Cararao Congelado Costa Sul
      {x: 46, y: 790, price: 1.99, highlight: false },
      //Corvina
      {x: 245, y: 760, price: 1.99, highlight: false },
      //File de Piracuru
      {x: 530, y: 785, price: 9.90, highlight: false },
      //File de Corvina
      {x: 225, y: 1060, price: 1.99, highlight: false },
      //Salmao
      {x: 842, y: 975, price: 8.50, highlight: false },
      //Mandi
      {x: 15, y: 1090, price: 1.99, highlight: false },
      //Porquinho Limpo
      {x: 545, y: 1270, price: 3.99, highlight: false },
      //Tilapia
      {x: 845, y: 1075, price: 1.99, highlight: false },

      
      //Lombo Suino
      {x: 1040, y: 200, price: 5.19, highlight: false },
      //Acem Paleta etc
      {x: 1860, y: 315, price: 2.59, highlight: true },
      //Alcatra
      {x: 1028, y: 555, price: 5.90, highlight: false },
      //Peito Frango Sadia
      {x: 1585, y: 640, price: 2.68, highlight: false },
      //Contrafile Bovino
      {x: 1060, y: 715, price: 5.90, highlight: false },
      //Picanha bovina
      {x: 1395, y: 910, price: 8.90, highlight: false },
      //File de Peito de frango
      {x: 1873, y: 895, price: 4.30, highlight: false },
      //Frango Congelado
      {x: 1475, y: 1235, price: 1.09, highlight: false },
      ]
  }
  ];
function numberEyeCandy(value) {
  var nZeros = Math.floor(Math.log(value)/Math.LN10);
  var stdValue;
  if (nZeros > 0)
    stdValue = value/Math.pow(10, nZeros);
  else
    stdValue = value;
  var unity = "";
  var showDecimals = true;
  var smallNumbersMult = 100;
  //Define how many algarisms to show before and after comma
  if (nZeros % 3 == 0) {
    //A,BC
  } else if (nZeros % 3 == 1) {
    //AB,C
    smallNumbersMult = 10;
    stdValue *= 10;
    nZeros-=1;
  } else if (nZeros % 3 == 2) {
    //ABC
    stdValue *= 100;
    nZeros-=2;
    showDecimals = false;
  }

  //Define the unity
  if (nZeros <= 0) {
    unity = "";
  } else if (nZeros == 3) {
    unity = "mil";
  } else if (nZeros == 6) {
    unity = "mi.";
  } else if (nZeros == 9) {
    unity = "bi.";
  } else if (nZeros == 12) {
    unity = "tri.";
  } else if (nZeros == 15) {
    unity = "quatrilhão";
  } else if (nZeros == 18) {
    unity = "quintilhão";
  } else if (nZeros == 21) {
    unity = "sextilhão";
  } else if (nZeros == 24) {
    unity = "setilhão";
  } else if (nZeros == 27) {
    unity = "octilhão";
  } else if (nZeros == 30) {
    unity = "nonilhão";
  } else if (nZeros == 33) {
    unity = "decilhão";
  } else {
    unity = "x 10<sup>"+nZeros+"</sup>";
  }

  var bigNumbers = Math.floor(stdValue);
  var smallNumbers = "";
  var leadingZeros = "";
  if (showDecimals) {
    smallNumbers = Math.round((stdValue - bigNumbers) * smallNumbersMult);
    if (smallNumbers==smallNumbersMult)
      smallNumbers--;
    if (smallNumbers < 10 && smallNumbersMult==100) {
      leadingZeros = "0";
    }
    bigNumbers += ",";
  } else {
    //smallNumbers += "<BR>";
  }
  return "<span style='vertical-align:top;float:left;'>"+bigNumbers+"</span><p class='tinyText' style='vertical-align:top;white-space:pre;'><span class='smallText'>"+leadingZeros+smallNumbers+"\n</span>"+unity+"</p>";
}


function calcTotalInfl(year) {
  var FIR = availableFIRs[selectedFIR];
  var totalYears = year - initialYear;
  var i = 0;
  var totalInfl = 1.0;
  //Calculate inflation through past history
  while (i < totalYears && i < inflationHistory.length) {
    //Each interaction calculates inflation of year i until year i+1
    //console.log((i+1+initialYear)+": "+inflationHistory[i]);
    totalInfl *= inflationHistory[i];
    i++;
  }
  //Calculate future inflation
  if (totalYears > inflationHistory.length) {
    var totalFutureYears = totalYears - inflationHistory.length;
    totalInfl *= Math.pow(FIR, totalFutureYears);
  }
  return totalInfl;
}

function getPresident() {
  var year = selectedYear + initialYear;
  if (year <= 2002) {
    return "Presidente FHC (PSDB)";
  } else if (year <= 2010) {
    return "Presidente Lula (PT)";
  } else {
    return "Presidente Dilma (PT)";
  }
}

function update() {
  var showPrices = true;
  //Changing the state when the user interacts
  if (selectedYear != defaultYear && !userInteractedYear)
    userInteractedYear = true;

  if (selectedFIR != defaultFIR && !userInteractedRate)
    userInteractedRate = true;

  //Changing the overlay
  if (!userInteractedYear) {
    showPrices = false;
    $(".anuncio").attr("src", "imgs/year_overlay.png");
  } else 
    if (!userInteractedRate && selectedYear > inflationHistory.length) {
      showPrices = false;
      $(".anuncio").attr("src", "imgs/rate_overlay.png");
    }
    else
      $(".anuncio").attr("src", "imgs/void.png");
  
  year = availableYears[selectedYear];
  var totalInfl = calcTotalInfl(year);
  FIR = availableFIRs[selectedFIR];
  //console.log(selectedYear + " <= " + inflationHistory.length);
  if (selectedYear <= inflationHistory.length) {
    $("#FIRDiv").css("display", "none");
    $("#InfoDiv").css("display", "block");
    if (selectedYear == 0) {
      $("#InfoLabel").html("Preços no final de <b>1994</b>");
      $("#InfoLabel2").html("Valores estimados de <a href='http://campograndesantos.wordpress.com/44-%E2%80%93-inflacaoveja-quanto-voce-pagava-por-cada-produto-em-novembro-de-2000/' target='_blank'>encarte</a> de Nov/2000");
    } else {
      $("#InfoLabel").html("IPCA Alimentos no ano <b>" + ((inflationHistory[selectedYear-1]-1)*100).toFixed(2) + "%</b>");
      $("#InfoLabel2").html(getPresident());
    }
  } else {
    $("#FIRLabel").html("<b>" + ((FIR-1)*100).toFixed(2) + "%</b> ("+descriptionFIRs[selectedFIR] + ")");
    $("#FIRDiv").css("display", "block");
    $("#InfoDiv").css("display", "none");
  }

  //Update labels
 $("#yearLabel").html("<b>"+year+"</b>");

  //For each page
  for (var pageIndex in pages) {
    var page = pages[pageIndex];
    var pageDiv = $(page.ID)
    pageDiv.children('.priceTag').remove();
    pageDiv.children('.highlight').remove();
    //labels.append("TESTE");
    //For each item
    for (var itemIndex in page.items) {
      var item = page.items[itemIndex];
      var x = item.x*100/page.width;
      var y = item.y*100/page.height + .25;
      var highlight ="priceTag";
      if (item.highlight) {
        highlight = "highlight";
      }
      var currentPrice = item.price*totalInfl/fatorCorr94;
      newLabelHtml ="<span class='"+highlight+"' style='position: absolute; top: "+y+"%; left: "+x+"%;' title='R$ "+toFixed2(currentPrice)+"'>"+numberEyeCandy(currentPrice)+"</span>";
      //alert(newLabelHtml);
      if (showPrices)
        pageDiv.append(newLabelHtml);
    }
  }

  resizeLabels();
}




function ready() { 
  $('#anuncios').bxSlider({
    prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
    nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
   });
  $('#yearSlider').slider({
    range: "min",
    value: selectedYear,
    min: 0,
    max: availableYears.length-1,
    slide: function (event, ui) {
      //console.log(availableYears[ui.value]);
      selectedYear = ui.value;
      update();
    }
  });
  $('#FIRSlider').slider({
    value: selectedFIR,
    min: 0,
    max: availableFIRs.length-1,
    slide: function (event, ui) {
      //console.log(availableYears[ui.value]);
      selectedFIR = ui.value;
      update();
    }
  });
  $('#VejaLink').click(function() {
    $('html, body').animate({scrollTop: $("#Veja").offset().top}, 500);
  });
  $('#EntendaLink').click(function() {
    $('html, body').animate({scrollTop: $("#Entenda").offset().top}, 1000);
  });
  $('#AjaLink').click(function() {
    $('html, body').animate({scrollTop: $("#Aja").offset().top}, 1000);
  });

  update(); 
  resizeLabels();
}

function scrollFn () {


  var control = $("#control");
  var pageHeight = $("#page1").height();
  var placeholderBegin = $("#PlaceholderBegin");
  var placeholderBeginTop = placeholderBegin.offset().top;
  var placeholderEndTop = placeholderBeginTop + pageHeight + control.height(); 
  
  var scrollTop =  $(window).scrollTop();
  var fixedControlBottom = scrollTop + control.height();
  //console.log(scrollTop + " >= " + placeholderBeginTop + " && " + fixedControlBottom + " < " + placeholderEndTop);
  if ( scrollTop >= placeholderBeginTop && fixedControlBottom < placeholderEndTop){
    //console.log("Appear");
    control.addClass('fixed');
  } else {
    //console.log("Disapear");
    control.removeClass('fixed');
  }
};

$(window).bind('resize', resizeLabels).trigger('resize');
$(document).ready(ready);
//setInterval(scrollFn, 100);
$(window).scroll(scrollFn);
$('body').on('touchmove', scrollFn);

function resizeLabels() {
  //Standard height, for which the body font size is correct
  var preferredWidth = 1000;
  var labelFontSize = 40;
  var highlightFontSize = 45;

  var displayWidth = $(pages[0].ID).width();
  var percentage = displayWidth / preferredWidth;
  var newLabelFontSize = Math.floor(labelFontSize * percentage);
  $(".priceTag").css("font-size", newLabelFontSize);
  $(".priceTag .smallText").css("font-size", Math.floor(newLabelFontSize*0.70));
  $(".priceTag .tinyText").css("font-size", Math.floor(newLabelFontSize*0.3));
  var newHighlightFontSize = Math.floor(highlightFontSize * percentage);
  $(".highlight").css("font-size", newHighlightFontSize);
  $(".highlight .smallText").css("font-size", Math.floor(newHighlightFontSize*0.7));
  $(".highlight .tinyText").css("font-size", Math.floor(newHighlightFontSize*0.3));
}


function toFixed2(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}


