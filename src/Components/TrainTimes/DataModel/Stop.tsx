import { Location } from "./Location";
import { Products } from "./Products";
export interface Stop {
  type: string;
  id: string;
  name: string;
  location: Location;
  products: Products;
}
