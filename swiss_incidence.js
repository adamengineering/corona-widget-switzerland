// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: calendar;
//
// Datasource provided by: Specialist Unit for Open Government Data Canton of Zurich
// http://open.zh.ch/internet/justiz_inneres/ogd/de/daten.html
// https://github.com/apfeuti/covid19-rest
// https://docs.scriptable.app/script/
//
// iOS 14 Widget for Switzerland adopted by adam engineering
// Thanks to @rphl (https://github.com/rphl) 
// and @tzschies (https://github.com/tzschies)
// and @kevinkub (https://gist.github.com/kevinkub/46caebfebc7e26be63403a7f0587f664)
// for their previous fantastic work. 
//
// THE SCRIPT IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SCRIPT OR THE USE OR OTHER DEALINGS IN THE SCRIPT.
//
// The following districts are available in some cantons
//
// AG: Aarau = 1901, Baden = 1902, Bremgarten = 1903, Brugg = 1904, Kulm = 1905, Laufenburg = 1906, Lenzburg = 1907, Muri = 1908, Rheinfelden = 1909, Zofingen = 1910, Zurzach = 1911
// BE: Jura bernois = 241, Biel = 242, Seeland = 243, Oberaargau = 244, Emmental = 245, Bern-Mittelland = 246, Thun = 247, Obersimmental-Saanen = 248, Frutigen-Niedersimmental = 249, Interlaken-Oberhasli = 250
// BL: Arlesheim = 1301, Laufen = 1302, Liestal = 1303, Sissach = 1304, Waldenburg = 1305
// FR: Broye = 1001, Glane = 1002, Greyerz = 1003, Saane = 1004, See = 1005, Sense = 1006, Vivisbach = 1007
// GR: Albula = 1841, Bernina = 1842, Engiadina = 1843, Imboden = 1844, Landquart = 1845, Maloja = 1846, Moesa = 1847, Plessur = 1848, Prättigau/Davos = 1849, Surselva = 1850, Viamala = 1851
// SG: St.Gallen = 1721, Rorschach = 1722, Rheintal = 1723, Werdenberg = 1724, Sarganserland = 1725, See-Gaster = 1726, Toggenburg = 1727, Wil = 1728
// SO: Gäu = 1101, Thal = 1102, Bucheggberg = 1103, Dorneck = 1104, Gösgen = 1105, Wasseramt = 1106, Lebern = 1107, Olten = 1108, Solothurn = 1109, Thierstein = 1110
// SZ: Einsiedeln = 501, Gersau = 502, Höfe = 503, Küssnacht = 504, March = 505, Schwyz = 506
// TG: Arbon = 2011, Frauenfeld = 2012, Kreuzlingen = 2013, Münchwilen = 2014, Weinfelden = 2015
// VS: Brig = 2301, Conthey = 2302, Entremont = 2303, Goms = 2304, Leuk = 2306, Martigny = 2307, Monthey = 2308, Raron = 2309, St-Maurice = 2310, Sierre = 2311, Sion = 2312, Visp = 2313
// ZH: Affoltern = 101, Andelfingen = 102, Bülach = 103, Dielsdorf = 104, Hinwil = 105, Horgen = 106, Meilen = 107, Pfäffikon = 108, Uster = 109, Winterthur = 110, Dietikon = 111, Zürich = 112
//

class SwissIncidenceWidget {

    constructor() {
        this.mainURL = "https://raw.githubusercontent.com/openZH/covid_19/master/fallzahlen_kanton_total_csv_v2/COVID19_Fallzahlen"
        this.districtURL = "https://raw.githubusercontent.com/openZH/covid_19/master/fallzahlen_bezirke/"
        this.previousDaysToShow = 24;
        this.cantonFromAbbr = {'AG': 'Aargau','AI': 'Appenzell AI','AR': 'Appenzell AR','BL': 'Basel-Land','BS': 'Basel-Stadt','BE': 'Bern','FL': 'Liechtenstein','FR': 'Freiburg','GE': 'Géneve','GL': 'Glarus','GR': 'Graubünden','JU': 'Jura','LU': 'Luzern','NE': 'Neuenburg','NW': 'Nidwalden','OW': 'Obwalden','SG': 'St.Gallen','SH': 'Schaffhausen','SZ': 'Schwyz','SO': 'Solothurn','TI': 'Ticino','TG': 'Thurgau','UR': 'Uri','VD': 'Vaudt','VS': 'Valais','ZG': 'Zug','ZH': 'Zürich'};
        this.populationFromAbbr = {'AG': 678207,'AI': 16145,'AR': 55445,'BL': 288132,'BS': 194766,'BE': 1034977,'FL': 38749,'FR': 321783,'GE': 504128,'GL': 40590,'GR': 199021,'JU': 73584,'LU': 409557,'NE': 176496,'NW': 43087,'OW': 38115,'SG': 507697,'SH': 81991,'SZ': 160480,'SO': 273194,'TI': 351491,'TG': 278727,'UR': 36694,'VD': 805098,'VS': 345525,'ZG': 126837,'ZH': 1520968};
    }

    async run() {
        let widget = await this.createWidget()
        //widget.backgroundColor = new Color("#330000");
        if (!config.runsInWidget) {
          await widget.presentSmall()
        }
        Script.setWidget(widget)
        Script.complete()
    }

    async createWidget(items) {
        // Get the Data
        let data = await this.getData()

        // Basic widget setup
        let list = new ListWidget()
        list.refreshAfterDate = new Date(Date.now() + 12*60*60*1000) // refresh every 12 hours
        list.setPadding(0, 0, 0, 0)
        let textStack = list.addStack()
        textStack.setPadding(14, 14, 0, 14)
        textStack.layoutVertically()
        textStack.topAlignContent()
        
        // Header
        let header = textStack.addText("🦠 Inzidenz".toUpperCase())
        header.font = Font.mediumSystemFont(14)
        textStack.addSpacer()

        if(data.error) {
            // Error handling
            let loadingIndicator = textStack.addText(data.error.toUpperCase())
            textStack.setPadding(14, 14, 14, 14)
            loadingIndicator.font = Font.mediumSystemFont(13)
            loadingIndicator.textOpacity = 0.5
            let spacer = textStack.addStack()
            spacer.addSpacer();
          } else {
            // Main stack for value and area name
            let length = data.timeline.length
            let casesToday = data.timeline[length-1]
            let casesYesterday7 = data.timeline[length-2]
            let sumLast7Days = data.timeline[length-1] + data.timeline[length-2] + data.timeline[length-3] + data.timeline[length-4]+ data.timeline[length-5] + data.timeline[length-6] + data.timeline[length-7]
            data.incidence = Math.round(parseFloat(sumLast7Days) * (100000 / this.populationFromAbbr[data.cantonID]))
            data.trend = (casesToday == casesYesterday7) ? '→' : (casesToday > casesYesterday7) ? '↑' : '↓';
            let incidenceStack = textStack.addStack()
            incidenceStack.addText(this.cantonFromAbbr[data.cantonID])
            let valueStack = incidenceStack.addStack()
            incidenceStack.layoutVertically()
            let incidenceValueLabel = valueStack.addText(data.incidence + data.trend)
            incidenceValueLabel.font = Font.boldSystemFont(24)
            const color = data.incidence >= 100 ? new Color("9e000a") : data.incidence >= 50 ? Color.red() : data.incidence >= 35 ? Color.yellow() : Color.green();
            incidenceValueLabel.textColor = color;
            
            // Chip for displaying district data or details      
            valueStack.addSpacer()
            let stateStack = valueStack.addStack()
            var stateText = ""
            if (data.city != "?ID?") {
                stateText = stateStack.addText(data.city + "\n" + data.cases + " @" + "\n" + data.population)
            } else {
                stateText = stateStack.addText("Hosp:"+ data.hospitalized + "\n" + "ICU:" + data.icu + "\n" + "Vent:" + data.vent + "\n" + "Dec:" + data.deceased)
            }        
            stateStack.backgroundColor = new Color('888888', .5)
            stateStack.cornerRadius = 4
            stateStack.setPadding(2, 2, 2, 2)
            stateText.font = Font.mediumSystemFont(9)
            stateText.textColor = Color.white()

            // Chart
            valueStack.addSpacer()
            let chart = new LineChart(400, 120, data.timeline).configure((ctx, path) => {
                ctx.opaque = false;
                ctx.setFillColor(new Color("888888", .4));
                ctx.addPath(path);
                ctx.fillPath(path);
            }).getImage();
            let chartStack = list.addStack()
            chartStack.setPadding(0, 0, 0, 0)
            let img = chartStack.addImage(chart)
            img.applyFittingContentMode()
          }
        return list
    }

    async getData() {
        try {
            let IDs = await this.getDataID()
            let cantonID = IDs.cantonID
            let districtID = IDs.districtID
                        
            if (cantonID) {
                var apiURL = this.mainURL+"_Kanton_"+cantonID+"_total.csv"
                if (cantonID == "FL") {
                    apiURL = this.mainURL+"_FL_total.csv"
                }
                //console.error(apiURL)
                let currentData = await new Request(apiURL).loadString()
                let currentDataLines = currentData.split("\n")
                let lines = currentDataLines.length
                var linesToUse = this.previousDaysToShow
                if (linesToUse > lines) {
                    linesToUse = lines
                }

                var days = [""]
                for (var i = 0; i < linesToUse; i++) {
                    days[i] = currentDataLines[lines-(2+i)].split(",")
                }

                var timeline = [0]
                for (i = 0; i < linesToUse-1; i++) {
                    timeline[i] = days[22-i][4]-days[23-i][4]
                }

                let tested = (parseInt(days[0][3]) > 0) ? parseInt(days[0][3]) : 0
                let confirmed = (parseInt(days[0][4]) > 0) ? parseInt(days[0][4]) : 0
                let hospitalized = (parseInt(days[0][5]) > 0) ? parseInt(days[0][5]) : 0
                let icu = (parseInt(days[0][6]) > 0) ? parseInt(days[0][6]) : 0
                let vent = (parseInt(days[0][7]) > 0) ? parseInt(days[0][7]) : 0
                let released = (parseInt(days[0][8]) > 0) ? parseInt(days[0][8]) : 0
                let deceased = (parseInt(days[0][9]) > 0) ? parseInt(days[0][9]) : 0
                var cityName = "?ID?"
                var population = 0
                var cases = 0

                if (districtID) {
                    let districtURL = this.districtURL + "fallzahlen_kanton_"+cantonID+"_bezirk.csv"
                    let allDistricts = await new Request(districtURL).loadString()
                    let allDistrictsLines = allDistricts.split("\n")
                    const data = await this.dataForDistrict(allDistrictsLines, districtID)
                    if (data["error"]) {
                        console.error(data["error"])
                    } else {
                        cityName = data["cityName"]
                        population = data["population"]
                        cases = data["cases"]
                    }
                }

                return {
                    cantonID: cantonID,
                    districtID: districtID,
                    city: cityName,
                    population: population,
                    tested: tested,
                    confirmed: confirmed,
                    hospitalized: hospitalized,
                    icu: icu,
                    vent: vent,
                    released: released,
                    deceased: deceased,
                    cases: cases,
                    timeline: timeline
                }
            }
            return { error: "Error missing CantonID in Widget!" };
        } catch(e) {
            return { error: "Error while getting Canton Data!" };
        }
    }

    async getDataID() {
        try {
            if(args.widgetParameter) {
                const components = args.widgetParameter.split(",")
                return {
                    cantonID: components[0],
                    districtID: components.length >= 2 ? components[1] : null,
                }                
            } else {
                return { cantonID: 'AG', districtID: '1901' }
            }
        } catch(e) {
            return null;
        }
    }

    async dataForDistrict(data, districtID) {
        const header = data[0]
        var cityName = "Unknown"
        var population = 0
        var cases = 0
        var i = 0
        for (i = 0; i < data.length-1; i++) {
            const components = data[i].split(",")
            if (components[0] === districtID) {
                //console.error(components)
                cityName = components[1]
                cityName = cityName.replace("\"", "")
                cityName = cityName.replace("\"", "")
                cityName = cityName.replace("Bezirk ","")
    
                let indexPopulation = this.getIndexForColumn(header,"Population")
                population = components[indexPopulation]
                if (components[7] > 0) {
                    cases = components[7]
                }
                if (components[8] > 0) {
                    cases = components[8]
                }
            }
        }
        return {
            cityName: cityName,
            population: population,
            cases: cases,
        }
    }

    getIndexForColumn(header, description) {
        var lines = header.split(",")
        for (var i = 0; i < lines.length; i++) {
            if (lines[i] == description) {
                return i
            }
        }
        return 6
    }

}

class LineChart {

    constructor(width, height, values) {
      this.ctx = new DrawContext()
      this.ctx.size = new Size(width, height)
      this.values = values;
    }
    
    _calculatePath() {
      let maxValue = Math.max(...this.values);
      let minValue = Math.min(...this.values);
      let difference = maxValue - minValue;
      let count = this.values.length;
      let step = this.ctx.size.width / (count - 1);
      let points = this.values.map((current, index, all) => {
          let x = step*index
          let y = this.ctx.size.height - (current - minValue) / difference * this.ctx.size.height;
          return new Point(x, y)
      });
      return this._getSmoothPath(points);
    }
        
    _getSmoothPath(points) {
      let path = new Path()
      path.move(new Point(0, this.ctx.size.height));
      path.addLine(points[0]);
      for(var i = 0; i < points.length-1; i ++) {
        let xAvg = (points[i].x + points[i+1].x) / 2;
        let yAvg = (points[i].y + points[i+1].y) / 2;
        let avg = new Point(xAvg, yAvg);
        let cp1 = new Point((xAvg + points[i].x) / 2, points[i].y);
        let next = new Point(points[i+1].x, points[i+1].y);
        let cp2 = new Point((xAvg + points[i+1].x) / 2, points[i+1].y);
        path.addQuadCurve(avg, cp1);
        path.addQuadCurve(next, cp2);
      }
      path.addLine(new Point(this.ctx.size.width, this.ctx.size.height))
      path.closeSubpath()
      return path;
    }
    
    configure(fn) {
      let path = this._calculatePath()
      if(fn) {
        fn(this.ctx, path);
      } else {
        this.ctx.addPath(path);
        this.ctx.fillPath(path);
      }
      return this.ctx;
    }
  
  }
  
  await new SwissIncidenceWidget().run();
