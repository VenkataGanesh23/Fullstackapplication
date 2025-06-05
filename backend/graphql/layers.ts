import { PrismaClient } from "@prisma/client";
import UserRepository from "../Repository/userRepository";
import UserService from "../Services/userServices";
import { userTypeDefs } from "../Schema/userSchema";
import { userResolver } from "../Resolver/userResolver";
import { productTypeDefs } from "../Schema/productSchema";
import { productResolver } from "../Resolver/productResolver";
import { categoryTypeDefs } from "../Schema/categorySchema";
import { categoryResolver } from "../Resolver/categoryResolver";

const prisma = new PrismaClient();

//User

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);



const typeDef = [userTypeDefs, productTypeDefs, categoryTypeDefs];
const resolver = [userResolver, productResolver, categoryResolver];


export {
  prisma,
  userRepository,
  userService,
  typeDef,
  resolver
}