import { Request, Response } from "express";
import { ProductService } from "Src/services/ProductService";

export class ProductController {
  private static async _index(request: Request, response: Response) {
    const productsWithPagination = await ProductService.findMany({
      page: +request.query.page!,
      perPage: +request.query.perPage!,
      search: request.query.search as string,
    });

    return response.render("home", { layout: "_layout", productsWithPagination });
  }

  private static async _show(request: Request, response: Response) {
    const product = await ProductService.findById(request.params.id);

    if (!product) return response.render("home", { layout: "_layout", errors: [{ message: "Não foi possível visualizar o produto" }] });

    return response.render("home", { layout: "_layout", product });
  }

  private static async _store(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _update(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  private static async _destroy(request: Request, response: Response) {
    throw new Error("Not implemented controller method.");
  }

  public static index = ProductController._index.bind(ProductController);
  public static show = ProductController._show.bind(ProductController);
  public static store = ProductController._store.bind(ProductController);
  public static update = ProductController._update.bind(ProductController);
  public static destroy = ProductController._destroy.bind(ProductController);
}
