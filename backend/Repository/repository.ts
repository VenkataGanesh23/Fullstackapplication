import { responseStatus } from "../src/helper/static";
import { sendConfirmationEmail, sendResetPassword } from "../src/helper/nodeMailer";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const URL = process.env.CLIENT_URL!;

class UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findUserById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      return {
        status: responseStatus(200, "Successfully fetched user"),
        user,
      };
    } catch (error) {
      return this.handleError(error, "Failed to fetch user");
    }
  }

  async findAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        where: { isActive: true },
        orderBy: { id: "asc" },
      });
      return {
        status: responseStatus(200, "Users fetched successfully"),
        users,
      };
    } catch (error) {
      return this.handleError(error, "Failed to fetch users");
    }
  }

  async signUp(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    dob: string
  ) {
    console.log("i am here")
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return {
          status: responseStatus(400, "Email already exists. Please choose a different email."),
        };
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password: encryptedPassword,
          dob,
          isActive: true,
        },
      });
      console.log(newUser)

      // Optional: Send confirmation email logic here if needed
      const token = this.generateJwtToken(newUser.id);
      const url = `${URL}/confirm/${token}`;
      await sendConfirmationEmail(email, url);

      return {
        status: responseStatus(200, "Successfully created new user"),
        user: newUser,
      };
    } catch (error) {
      console.error("SignUp error:", error);
      return this.handleError(error, "Failed to create user");
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user || user.isActive === false) {
        return {
          status: responseStatus(404, "No active user found with this email."),
          token: null,
          user: null,
        };
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return {
          status: responseStatus(401, "Invalid password."),
          token: null,
          user: null,
        };
      }

      const token = this.generateJwtToken(user.id);

      return {
        status: responseStatus(200, "Login successful"),
        token,
        user,
      };
    } catch (error) {
      return this.handleError(error, "Failed to login");
    }
  }

  async confirm(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      const user = await this.prisma.user.findUnique({ where: { id: decoded.userId } });

      if (!user) {
        return { status: responseStatus(400, "Invalid or expired token") };
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { isActive: true },
      });

      return {
        status: responseStatus(200, "User successfully confirmed"),
        user: updatedUser,
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ApolloError("Invalid or expired token.");
      }
      return this.handleError(error, "Failed to confirm user");
    }
  }

  async requestPasswordReset(email: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        return { status: responseStatus(400, "User not found") };
      }

      const token = this.generateJwtToken(user.id, 3600);
      const url = `${URL}/resetpassword/${token}`;

      await sendResetPassword(email, url);

      return {
        status: responseStatus(200, "Password reset link sent successfully"),
      };
    } catch (error) {
      return this.handleError(error, "Failed to send password reset link");
    }
  }

  async resetPassword(token: string, password: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      const user = await this.prisma.user.findUnique({ where: { id: decoded.userId } });

      if (!user) {
        return { status: responseStatus(400, "Invalid or expired token") };
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { password: encryptedPassword },
      });

      return {
        status: responseStatus(200, "Password changed successfully"),
        user: updatedUser,
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return { status: responseStatus(400, "Invalid or expired token") };
      }
      return this.handleError(error, "Failed to reset password");
    }
  }

  // Helper: Generate JWT token
 private generateJwtToken(userId: number, expiresIn?: number): string {
  const options = expiresIn ? { expiresIn } : undefined;
  return jwt.sign({ userId }, JWT_SECRET, options);
}

  // Helper: Standard error handler for Prisma and others
  private handleError(error: unknown, fallbackMessage: string) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { status: responseStatus(500, "Database error occurred. Please try again later.") };
    }
    return { status: responseStatus(500, fallbackMessage) };
  }
}

export default UserRepository;
