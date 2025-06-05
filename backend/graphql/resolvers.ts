import { merge } from "lodash";
import { productResolver } from "../Resolver/productResolver";
import { userResolver } from "../Resolver/userResolver"
import { categoryResolver } from "../Resolver/categoryResolver"

const resolvers = merge(productResolver,userResolver,categoryResolver);

export default resolvers;