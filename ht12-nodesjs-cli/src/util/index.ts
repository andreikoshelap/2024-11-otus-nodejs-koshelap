import {Airport, Hop, Leg, Result, Route} from "../data/data-parser";

const maxLegs = 3;

export function notNil<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
}

export function flatten<T>(value: T[][]): T[] {
    return value.reduce((memo, value) => {
        return [...memo, ...value];
    }, [] as T[]);
}

export function radians(degrees: number): number {
    return degrees * (Math.PI / 180.0);
}

export function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    lat1 = radians(lat1);
    lon1 = radians(lon1);
    lat2 = radians(lat2);
    lon2 = radians(lon2);

    const lat = lat2 - lat1;
    const lon = lon2 - lon1;
    const d = Math.pow(Math.sin(lat * 0.5), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(lon * 0.5), 2);

    const earthRadiusKm = 6371.0088;
    return 2.0 * earthRadiusKm * Math.asin(Math.sqrt(d));
}


export async function getRoutesAsync(
    routes: Route[],
    source: string,
    destination: string,
    leg: number,
    result: Map<string, Hop>,
    legs: Leg[]
): Promise<Hop[] | null> {
    if (leg > maxLegs) {
        return null;
    }

    const newRoutes: Route[] = routes.filter(route => route.source.iata === source);

    for (const route of newRoutes) {
        if (route.destination.iata === destination) {
            let totalDistance = 0;
            legs[leg] = await getLegAsync(leg, source, route.destination.iata, route.distance);
            if (!legs[leg]) {
                return null;
            }

            const legArray: string[] = [];
            let legIndex = legs[1].start;
            legArray.push(legs[1].start);

            for (let i = 1; i < leg; i++) {
                legArray.push(legs[i].finish);
                legIndex = legIndex + legs[i].finish;
                totalDistance += legs[i].distance;
            }

            legArray.push(legs[leg].finish);
            legIndex = legIndex + legs[leg].finish;
            totalDistance += legs[leg].distance;

            const hop = new Hop(legIndex, legArray, totalDistance);
            result.set(legIndex, hop);
            return [...result.values()];
        } else {
            if (leg < maxLegs) {
                legs[leg] = await getLegAsync(leg, source, route.destination.iata, route.distance);
                if (!legs[leg]) {
                    return null;
                }
            }
            const recursiveResult = await getRoutesAsync(routes, route.destination.iata, destination, leg + 1, result, legs);
            if (recursiveResult !== null) {
                return recursiveResult;
            }
        }
    }
    return [...result.values()];
}

function getLeg(leg: number, sourceIata:string, destinationIata: string, distance: number) {
    if(sourceIata == null || destinationIata == null) {
        return null;
    }

    return new Leg(leg, sourceIata, destinationIata, distance);
}

function getLegAsync(leg: number, source: string, destination: string, distance: number): Promise<Leg | null> {
    return Promise.resolve(getLeg(leg, source, destination, distance));
}
