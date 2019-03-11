import csv
import math
from mpmath import *
mp.dps = 6
from multiprocessing import Pool
import geohash
import random
import statistics
from tqdm import tqdm
#from haversine import haversine

processes = 8 # CHANGE PROCESSES
geohashthreshold = 7
samplefraction = 10 # CHANGE FRACTION

def notblacklisted(crime):
    return not crime[2] in blacklist

blacklist = [1002,3111,3205,3206,3501,3502,3503,3831,3207,3201,3006,3018,2407]

def hav(theta):
    return sin(fdiv(theta,2))*sin(fdiv(theta,2))

def havcomplex(lat1, lon1, lat2, lon2):
    return fadd(hav(fsub(lat2,lat1)),
                fmul(fmul(cos(lat2),hav(fsub(lon2,lon1))),cos(lat1)))

# TODO: Consider switching this a symbol.
radius = mpf(6371000)
# https://www.movable-type.co.uk/scripts/latlong.html
def haversine(lat1, lon1, lat2, lon2):
    lat1 = radians(lat1)
    lat2 = radians(lat2)
    lon1 = abs(radians(lon1))
    lon2 = abs(radians(lon2))
    return float(fmul(fmul(asin(sqrt(havcomplex(lat1, lon1, lat2, lon2))),2),radius))

with open("crime-edited.csv") as crimefile:
    reader = csv.reader(crimefile)
    crimelist = list(reader)[1:]

    with open("light-edited.csv") as streetlampfile:
        reader2 = csv.reader(streetlampfile)
        totallamplist = list(reader2)[1:]
        cells = {}

        for lamp in totallamplist:
            try:
                lamplat = float(lamp[0])
                lamplon = float(lamp[1])
                geocode = geohash.encode(lamplat,lamplon,precision=geohashthreshold)
                if geocode not in cells:
                    cells[geocode] = [[],[]]
                cells[geocode][0].append([lamplat,lamplon])
            except ValueError:
                pass

        for crime in crimelist:
            try:
                crimelat = float(crime[1])
                crimelon = float(crime[2])
                crimecat = int(crime[0])
                geocode = geohash.encode(crimelat,crimelon, precision=geohashthreshold)
                if geocode not in cells:
                    cells[geocode] = [[],[]]
                cells[geocode][1].append([crimelat,crimelon,crimecat])
            except ValueError:
                pass

        sampledcells = {}

        for cell in cells:
            lamps = cells[cell][0]
            crimes = cells[cell][1]
            crimes = list(filter(notblacklisted,crimes))
            sampledcrimes = random.sample(crimes, math.floor(len(crimes)/samplefraction))
            sampledcells[cell] = [lamps, sampledcrimes] # Third field is a summary field.

        with open("/tmp/out.csv",'w') as out:
            out.write("geocode, centerlat, centerlon, errorlat, errorlon, crimes, lamps, maxd, mind, mediand \n")
            for geocode in tqdm(sampledcells):
                cell = sampledcells[geocode]

                crimestolamp = []
                lamps = cell[0]
                crimes = cell[1]
                if len(crimes) == 0 or len(lamps) == 0:
                    crimestolamp = [0]
                else:
                    for crime in cell[1]:
                        def finddistance(lamp):
                            return haversine(crime[0],crime[1],lamp[0],lamp[1])

                        with Pool(processes=processes) as pool:
                            if len(lamps) > 0:
                                distancestocrime = pool.map(finddistance, lamps)
                                mindistancetocrime = min(distancestocrime)
                                crimestolamp.append(mindistancetocrime)

                numcrimes = len(crimes)*samplefraction
                numlamps = len(lamps)
                maxdistance = max(crimestolamp)
                mindistance = min(crimestolamp)
                median = statistics.median(crimestolamp)
                centerlat, centerlon, errorlat, errorlon = geohash.decode_exactly(geocode)
                out.write(str(geocode)); out.write(',')
                out.write(str(centerlat)); out.write(',')
                out.write(str(centerlon)); out.write(',')
                out.write(str(errorlat)); out.write(',')
                out.write(str(errorlon)); out.write(',')
                out.write(str(numcrimes)); out.write(',')
                out.write(str(numlamps)); out.write(',')
                out.write(str(maxdistance)); out.write(',')
                out.write(str(mindistance)); out.write(',')
                out.write(str(median))
                out.write("\n")
