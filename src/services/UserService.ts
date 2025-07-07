import { dataSource } from "Src/database/data-source";
import { User } from "Src/database/entities/User.entity";
import { DeepPartial, FindOptionsWhere } from "typeorm";

export class UserService {
  private static readonly userRepository = dataSource.getRepository(User);

  public static async findById(id: User["id"]) {
    return await this.userRepository.findOneBy({ id });
  }

  public static async findByEmail(email: User["email"]) {
    return await this.userRepository.findOneBy({ email });
  }

  public static async exists(where: FindOptionsWhere<User>) {
    return await this.userRepository.existsBy(where);
  }

  public static async create(user: DeepPartial<User>) {
    return await this.userRepository.save(this.userRepository.create(user));
  }
}
