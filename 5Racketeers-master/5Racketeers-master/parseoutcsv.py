import csv
import json
JSON_OUTPUT = "giveittome.js"

with open('/home/mathias/Downloads/data.csv') as csvfile:
    reader = csv.reader(csvfile)
    sumfile = list(reader)[1:]
    sumlist = {}
    for sum in sumfile:
        geocode = sum[0]
        centerlat = sum[1]
        centerlon = sum[2]
        errorlat = sum[3]
        errorlon = sum[4]
        crimes = sum[5]
        lamps = sum[6]
        maxdist = sum[7]
        mindist = sum[8]
        mediandist = sum[9]
        geocodedata = []
        geocodedata.append(float(centerlat))
        geocodedata.append(float(centerlon))
        geocodedata.append(float(errorlat))
        geocodedata.append(float(errorlon))
        geocodedata.append(float(crimes))
        geocodedata.append(float(lamps))
        geocodedata.append(float(maxdist))
        geocodedata.append(float(mindist))
        geocodedata.append(float(mediandist))
        sumlist[geocode] = geocodedata;

    with open(JSON_OUTPUT, 'w') as jsonfile:
        jsonfile.write("var cells = ")
        jsonfile.write(json.dumps(sumlist))
        jsonfile.write(";")
