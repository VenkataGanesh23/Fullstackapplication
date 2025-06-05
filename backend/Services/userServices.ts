import UserRepository from "../Repository/userRepository";

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id: number) {
    return this.userRepository.findUserById(id);
  }

  async findAllUsers() {
    return this.userRepository.findAllUsers();
  }

  async signUp(first_name: string, last_name: string, email: string, password: string, dob: string) {
    return this.userRepository.signUp(first_name, last_name, email, password, dob);
  }

  async signIn(email: string, password: string) {
    return this.userRepository.signIn(email, password);
  }
  
  async confirm(token: string) {
    return this.userRepository.confirm(token);
  }

  async requestPasswordReset(email: string) {
    return this.userRepository.requestPasswordReset(email);
  }

  async resetPassword(token: string, password: string) {
    return this.userRepository.resetPassword(token, password);
  }
}

export default UserService;
