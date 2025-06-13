import { merge } from "lodash";
import { productResolver } from "../Resolver/productResolver";
import { userResolver } from "../Resolver/userResolver"
import { categoryResolver } from "../Resolver/categoryResolver"
import { cartResolver } from "../Resolver/cartResolver";


const resolvers = merge(productResolver,userResolver,categoryResolver,cartResolver);

export default resolvers;