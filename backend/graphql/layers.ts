import { PrismaClient } from "@prisma/client";
import UserRepository from "../Repository/userRepository";
import UserService from "../Services/userServices";
import CartRepository from "../Repository/cartRepository";
import CartService from "../Services/cartServices";
import { ContentRepository } from "../Repository/contentRepository";
import { ContentService } from "../Services/contentServices";

const prisma = new PrismaClient();

//User

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);

//cart

const cartRepository = new CartRepository(prisma)
const cartService = new CartService(cartRepository)

//content

const contentRepository = new ContentRepository(prisma)
const contentService = new ContentService(contentRepository)

export {
  prisma,
  userRepository,
  userService,
  cartService,
  cartRepository,
  contentService
}