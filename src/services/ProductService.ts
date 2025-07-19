import { dataSource } from "Src/database/data-source";
import { Product } from "Src/database/entities/Product.entity";
import { DeepPartial, FindOptionsWhere } from "typeorm";

export class ProductService {
  private static readonly productRepository = dataSource.getRepository(Product);

  public static async findMany(options: { page?: number; perPage?: number; search?: string }) {
    const queryBuilder = this.productRepository.createQueryBuilder("products");
    const page = options.page || 1;
    const perPage = options.perPage || 10;

    options.search && queryBuilder.where("products.name ILIKE :search", { name: options.search });
    queryBuilder.offset((page - 1) * perPage);
    queryBuilder.limit(perPage);

    const [products, count] = await queryBuilder.getManyAndCount();
    const totalCount = await this.productRepository.count();

    return {
      products,
      page,
      perPage,
      count,
      totalCount: count,
      totalPages: Math.ceil(totalCount / perPage),
    };
  }

  public static async findById(id: Product["id"]) {
    return await this.productRepository.findOneBy({ id });
  }

  public static async exists(where: FindOptionsWhere<Product>) {
    return await this.productRepository.existsBy(where);
  }

  public static async create(product: DeepPartial<Product>) {
    return await this.productRepository.save(this.productRepository.create(product));
  }

  public static async update(product: Product, updateData: DeepPartial<Product>) {
    return await this.productRepository.save(this.productRepository.merge(product, updateData));
  }

  public static async delete(product: Product) {
    return await this.productRepository.remove(product);
  }
}
