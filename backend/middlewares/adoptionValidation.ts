import { body } from "express-validator";

export const adoptionCreateValidation = () => {
  return [
    body("liveIn").isString().withMessage("O campo tipo de residência é obrigatório."),
    body("children").isBoolean().withMessage("O campo possui crianças é obrigatório."),
    body("isFirstPet").isBoolean().withMessage("O campo primeiro pet é obrigatório."),
    body("pets").isBoolean().withMessage("O campo possui outros animais é obrigatório."),
    
  ];
};
