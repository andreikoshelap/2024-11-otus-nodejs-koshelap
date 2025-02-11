import * as express from 'express';
import * as morgan from 'morgan';

import {notNil, flatten, getRoutesAsync} from '../util';
import {Airport, Hop, loadAirportData, loadRouteData, Result, Route} from '../data/data-parser';

export async function createApp() {
  const app = express();

  const airports = await loadAirportData();
  const airportsByCode = new Map<string, Airport>(
    flatten(airports.map((airport) => [
      airport.iata !== null ? [airport.iata.toLowerCase(), airport] as const : null,
      airport.icao !== null ? [airport.icao.toLowerCase(), airport] as const : null,
    ].filter(notNil)))
  );

  const routes:Route[] =  await loadRouteData();

  app.use(morgan('tiny'));

  app.get('/health', (_, res) => res.send('OK'));
  app.get('/airports/:code', (req, res) => {
    const code = req.params['code'];
    if (code === undefined) {
      return res.status(400).send('Must provide airport code');
    }

    const airport = airportsByCode.get(code.toLowerCase());
    if (airport === undefined) {
      return res.status(404).send('No such airport, please provide a valid IATA/ICAO code');
    }

    return res.status(200).send(airport);
  });

  app.get('/routes/:source/:destination', (req, res) => {
    const source = req.params['source'];
    const destination = req.params['destination'];
    if (source === undefined || destination === undefined) {
      return res.status(400).send('Must provide source and destination airports');
    }
    const sourceAirport = airportsByCode.get(source.toLowerCase());
    const destinationAirport = airportsByCode.get(destination.toLowerCase());
    if (sourceAirport === undefined || destinationAirport === undefined) {
      return res.status(404).send('No such airport, please provide a valid IATA/ICAO codes');
    }

    getRoutesAsync(routes, source, destination, 1, new Map(), []).then((hopes) => {
      const distance: number = hopes.map(hope=> hope.totalDistance).reduce((min, current) =>{
        return current < min ? current : min;
      });
      const hops: string[][] = hopes.map(hope=>hope.hops);
      return res.status(200).send({
        source,
        destination,
        distance,
        hops,
      });
    });

  });

  return app;
}
