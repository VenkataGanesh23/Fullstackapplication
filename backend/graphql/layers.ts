import { PrismaClient } from "@prisma/client";
import UserRepository from "../Repository/repository";
import UserService from "../Services/services";

const prisma = new PrismaClient();

//User

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

export {
  prisma,
  userRepository,
  userService,
}