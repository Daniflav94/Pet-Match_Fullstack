import { body } from "express-validator";

export const petCreateValidation = () => {
  return [
    body("type").isString().withMessage("O tipo é obrigatório."),
    body("name").isString().withMessage("O campo nome é obrigatório."),
    body("age").isString().withMessage("O campo idade é obrigatório."),
    body("gender").isString().withMessage("O campo gênero é obrigatório."),
    body("size").isString().withMessage("O campo tamanho é obrigatório."),
    body("personality")
      .isArray()
      .withMessage("O campo personalidade é obrigatório."),
  ];
};
