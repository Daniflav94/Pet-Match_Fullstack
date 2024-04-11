import { body } from "express-validator";

export const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 6 })
      .withMessage("Insira o nome completo."),
    body("email")
      .isString()
      .withMessage("O email é obrigatório")
      .isEmail()
      .withMessage("Insira um email válido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres"),
    body("cpf").isString().withMessage("O cpf é obrigatório").isLength({min:14, max:14}),
    body("gender").isString().withMessage("O gênero é obrigatório"),
    body("phone")
      .isString()
      .withMessage("O telefone é obrigatório")
      .isLength({min:15, max:15}),
    body("birthdate")
      .isISO8601()
      .withMessage("A data de nascimento é obrigatória"),
    body("cep").isString().withMessage("O cep é obrigatório").isLength({min:9, max:9}),
    body("state").isString().withMessage("O estado é obrigatório"),
    body("city").isString().withMessage("A cidade é obrigatória"),
    body("street").isString().withMessage("A rua é obrigatória"),
    body("neighborhood").isString().withMessage("O bairro é obrigatório"),
  ];
};

export const adminCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório."),
    body("email")
      .isString()
      .withMessage("O email é obrigatório")
      .isEmail()
      .withMessage("Insira um email válido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres"),

    body("cnpj").isString().withMessage("O cnpj é obrigatório").isLength({min:18, max:18}),
    body("cellPhone").isString().withMessage("O telefone é obrigatório").isLength({min:15, max:15}),
    body("phone").optional(),
    body("cep").isString().withMessage("O cep é obrigatório").isLength({min:9, max:9}),
    body("state").isString().withMessage("O estado é obrigatório"),
    body("city").isString().withMessage("A cidade é obrigatória"),
    body("street").isString().withMessage("A rua é obrigatória"),
    body("neighborhood").isString().withMessage("O bairro é obrigatório"),
    body("number").isString().withMessage("O número é obrigatório"),
    body("openingHours")
      .isString()
      .withMessage("O horário de funcionamento é obrigatório"),
  ];
};

export const loginValidation = () => {
  return [
    body("email")
    .isString()
    .withMessage("O email é obrigatório")
    .isEmail()
    .withMessage("Insira um email válido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória")
  ]
}
