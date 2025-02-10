import * as parse from 'csv-parse';
import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import { notNil, haversine } from '../util';

export interface Airport {
  id: string;
  icao: string | null;
  iata: string | null;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Route {
  line: string;
  source: Airport;
  destination: Airport;
  distance: number;
}

export  class Result {
  hops: Hop[];

  constructor(hops) {
    this.hops = hops;
  }
}

export class Leg {
  leg: number;
  start: string;
  finish: string;
  distance: number;

  constructor(leg, start, finish, distance) {
    this.leg = leg;
    this.start = start;
    this.finish = finish;
    this.distance = distance;
  }
}

export class Hop {
  key: string;
  hops: string[];
  totalDistance: number;

  constructor(key, hops, totalDistance) {
    this.key = key;
    this.hops = hops;
    this.totalDistance = totalDistance;
  }
}



function parseCSV<T extends Readonly<string[]>>(filePath: string, columns: T): Promise<{ [key in T[number]]: string }[]> {
  return new Promise((resolve, reject) => {
    readFile(filePath, (err, data) => {
      if (err) {
        return reject(err);
      }

      parse(data, { columns: Array.from(columns), skip_empty_lines: true, relax_column_count: true }, (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  });
}

export async function loadAirportData(): Promise<Airport[]> {
  const columns = ['airportID', 'name', 'city', 'country', 'iata', 'icao', 'latitude', 'longitude'] as const;
  const rows = await parseCSV(resolvePath(__dirname, './src/data/airports.dat'), columns);

  return rows.map((row) => ({
    id: row.airportID,
    icao: row.icao === '\\N' ? null : row.icao,
    iata: row.iata === '\\N' ? null : row.iata,
    name: row.name,
    location: {
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
    },
  }));
}

export async function loadRouteData(): Promise<Route[]> {
  const airports = await loadAirportData();
  const airportsById = new Map<string, Airport>(airports.map((airport) => [airport.id, airport] as const));

  const columns = ['airline', 'airlineID', 'source', 'sourceID', 'destination', 'destinationID', 'codeshare', 'stops'] as const;
  const rows = await parseCSV(resolvePath(__dirname, './src/data/routes.dat'), columns);

  return rows.filter((row) => row.stops === '0').map((row) => {
    const line = row.airline;
    const source = airportsById.get(row.sourceID);
    const destination = airportsById.get(row.destinationID);

    if (source === undefined || destination === undefined) {
      return null;
    }

    return {
      line,
      source,
      destination,
      distance: haversine(
        source.location.latitude, source.location.longitude,
        destination.location.latitude, destination.location.longitude,
      ),
    }
  }).filter(notNil);
}
