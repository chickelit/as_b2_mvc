import { Request, Response } from "express";
import { dataSource } from "Src/database/data-source";
import { ErrorParser } from "Src/helpers/ErrorParser";
import { ProductService } from "Src/services/ProductService";
import z from "zod";

export class DashboardProductController {
  private static async _index(request: Request, response: Response) {
    const productsWithPagination = await ProductService.findMany({
      page: +request.query.page!,
      perPage: +request.query.perPage!,
      search: request.query.search as string,
    });

    return response.render("dashboard/products", { layout: "_layout", productsWithPagination });
  }

  private static async _show(request: Request, response: Response) {
    const product = await ProductService.findById(request.params.id);

    if (!product)
      return response.render("dashboard/products", { layout: "_layout", errors: [{ message: "Não foi possível visualizar o produto" }] });

    return response.render(`dashboard/products`, { layout: "_layout", product });
  }

  private static async _store(request: Request, response: Response) {
    const { data: body, error } = z
      .object({
        name: z.string(),
        descricao: z.string(),
        preco: z.string().transform((value) => parseFloat(value)),
        image: z.string().or(z.undefined()),
      })
      .safeParse(request.body);

    if (error) {
      console.log(error);
      return response.render("dashboard/products/create", { layout: "_layout", errors: ErrorParser.zodToApi(error), form: request.body });
    }

    if (request.file) {
      const base64Image = request.file.buffer!.toString("base64");

      body.image = `data:${request.file.mimetype};base64,${base64Image}`;
    }

    const product = await ProductService.create(body);

    return response.render("dashboard/products/create", { layout: "_layout", product });
  }

  private static async _update(request: Request, response: Response) {
    const product = await ProductService.findById(request.params.id);

    if (!product)
      return response.render("dashboard/products", {
        layout: "_layout",
        errors: [{ message: "Produto não encontrado" }],
      });

    if (request.method.toLowerCase() === "get") {
      return response.render("dashboard/products/edit", { layout: "_layout", product });
    }

    const { data: body, error } = z
      .object({
        name: z.string(),
        descricao: z.string(),
        preco: z.string().transform((value) => parseFloat(value)),
      })
      .safeParse(request.body);

    if (error)
      return response.render("dashboard/products/edit", { layout: "_layout", errors: ErrorParser.zodToApi(error), form: request.body });

    const updatedProduct = await ProductService.update(product, body);

    return response.redirect("/dashboard/products");
  }

  private static async _destroy(request: Request, response: Response) {
    const product = await ProductService.findById(request.params.id);

    if (!product)
      return response.render("dashboard/products", {
        layout: "_layout",
        errors: [{ message: "Produto não encontrado" }],
      });

    const deletedProduct = await ProductService.delete(product);

    return response.render("dashboard/products", { layout: "_layout", deletedProduct: deletedProduct });
  }

  public static index = DashboardProductController._index.bind(DashboardProductController);
  public static show = DashboardProductController._show.bind(DashboardProductController);
  public static store = DashboardProductController._store.bind(DashboardProductController);
  public static update = DashboardProductController._update.bind(DashboardProductController);
  public static destroy = DashboardProductController._destroy.bind(DashboardProductController);
}
