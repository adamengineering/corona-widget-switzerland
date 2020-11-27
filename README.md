# Corona Inzidenz Widget für iOS (Scriptable)
COVID-19 Inzidenz-Widget für die Schweiz (Kanton + Bezirke + Trend + Graph)

Widget zeigt die Inzidenz, tägl. neue Fälle, sowie den Verlauf für eine bestimmte Anzahl Tage an.

![IMG_3006](https://github.com/adamengineering/corona-widget-switzerland/blob/main/screenshot.jpg?raw=true)

# Features

* _Inzidenz_ + Trend für Kanton und Bezirk
* Im Bezirk wird die _Inzidenz_ und Einwohnerzahl ausgegeben
* Diagram für _Neue tägl. Fälle_ je Kanton
* wird kein Parameter für den Bezirk mitgegeben, erscheinen Summen für Spital, Intensivstation, Ventilator und Todesfälle
* ...

# Installation

**Manuell**
* Safari öffnen: https://raw.githubusercontent.com/adamengineering/corona-widget-switzerland/main/swiss_incidence.js
* Skripttext kopieren
* Scriptable öffnen, kopierten Skripttext als neues Scriptablescript einfügen oder altes erstzen.

# Konfiguration

* Die allgemeine Konfiguration erfolgt mittels **WidgetParameter**:

![IMG_3006](https://github.com/adamengineering/corona-widget-switzerland/blob/main/widgetparameter.jpg?raw=true)

## Parameter für Kanton und Bezirke

Das Widget erkennt den Kanton anhand der offiziellen Abkürzung für den Kantonsnamen: Aargau = AG, Thurgau = TG, Zürich = ZH, usw.
Das Widget erlaubt auch die Ausgabe der Werte für das Fürstentum Liechtenstein mit der Abürzung FL
=> Das Fürstentum Liechtenstein ist ein eigenständiges Land und nicht ein Kanton der Schweiz

In einigen Kantonen sind auch Informationen zu den einzelnen Bezirken verfügbar

Aargau =>
Aarau = 1901, Baden = 1902, Bremgarten = 1903, Brugg = 1904, Kulm = 1905, Laufenburg = 1906, Lenzburg = 1907, Muri = 1908, Rheinfelden = 1909, Zofingen = 1910, Zurzach = 1911

Bern =>
Jura bernois = 241, Biel = 242, Seeland = 243, Oberaargau = 244, Emmental = 245, Bern-Mittelland = 246, Thun = 247, Obersimmental-Saanen = 248, Frutigen-Niedersimmental = 249, Interlaken-Oberhasli = 250

Basel Land =>
Arlesheim = 1301, Laufen = 1302, Liestal = 1303, Sissach = 1304, Waldenburg = 1305

Freiburg =>
Broye = 1001, Glane = 1002, Greyerz = 1003, Saane = 1004, See = 1005, Sense = 1006, Vivisbach = 1007

Graubünden =>
Albula = 1841, Bernina = 1842, Engiadina = 1843, Imboden = 1844, Landquart = 1845, Maloja = 1846, Moesa = 1847, Plessur = 1848, Prättigau/Davos = 1849, Surselva = 1850, Viamala = 1851

Sankt Gallen =>
St.Gallen = 1721, Rorschach = 1722, Rheintal = 1723, Werdenberg = 1724, Sarganserland = 1725, See-Gaster = 1726, Toggenburg = 1727, Wil = 1728

Solothurn =>
Gäu = 1101, Thal = 1102, Bucheggberg = 1103, Dorneck = 1104, Gösgen = 1105, Wasseramt = 1106, Lebern = 1107, Olten = 1108, Solothurn = 1109, Thierstein = 1110

Schwyz =>
Einsiedeln = 501, Gersau = 502, Höfe = 503, Küssnacht = 504, March = 505, Schwyz = 506

Thurgau =>
Arbon = 2011, Frauenfeld = 2012, Kreuzlingen = 2013, Münchwilen = 2014, Weinfelden = 2015

Wallis =>
Brig = 2301, Conthey = 2302, Entremont = 2303, Goms = 2304, Leuk = 2306, Martigny = 2307, Monthey = 2308, Raron = 2309, St-Maurice = 2310, Sierre = 2311, Sion = 2312, Visp = 2313

Zürich =>
Affoltern = 101, Andelfingen = 102, Bülach = 103, Dielsdorf = 104, Hinwil = 105, Horgen = 106, Meilen = 107, Pfäffikon = 108, Uster = 109, Winterthur = 110, Dietikon = 111, Zürich = 112

**Beispiele**

* AG, 1901
* TG, 2011
* ZH, 101 
