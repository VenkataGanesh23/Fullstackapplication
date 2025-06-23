import { merge } from "lodash";
import { productResolver } from "../Resolver/productResolver";
import { userResolver } from "../Resolver/userResolver"
import { categoryResolver } from "../Resolver/categoryResolver"
import { cartResolver } from "../Resolver/cartResolver";
import { contentResolver } from "../Resolver/contentResolver";


const resolvers = merge(productResolver,userResolver,categoryResolver,cartResolver,contentResolver);

export default resolvers;