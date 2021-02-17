import { WindyData } from '../interfaces/windy';
export default function windy(lat: string | number, long: string | number): Promise<WindyData>;
