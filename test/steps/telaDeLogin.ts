import { Given, When, Then } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";
import Assert from "../../helper/wrapper/assert";
import { timeout } from "../../helper/globalConfig";

let loginPage: LoginPage;
let assert: Assert;

Given('que o usuário está na tela de login', { timeout: timeout }, async function () {
  loginPage = new LoginPage(fixture.page);
  assert = new Assert(fixture.page);
  await loginPage.goto(process.env.BASEURL);
  await loginPage.getSwagLabsText();
});

When('preenche o usuário correto', { timeout: timeout }, async function () {
  await loginPage.fillUserName(process.env.USER_NAME);
});

When('preenche o usuário incorreto', { timeout: timeout }, async function () {
  await loginPage.fillUserName("usuario-incorreto");
});

When('preenche a senha correta', { timeout: timeout }, async function () {
  await loginPage.fillPassword(process.env.PASSWORD);
});

When('preenche a senha incorreta', { timeout: timeout }, async function () {
  await loginPage.fillPassword("senha-incorreta");
});

When('clica no botão login', { timeout: timeout }, async function () {
  await loginPage.waitAndClickLoginButton();
});

Then('a página inicial é acessada', { timeout: timeout }, async function () {
  const titleTest = await loginPage.getProductsText();
  assert.assertElementContains(titleTest, "Productsx");
  // assert.assertElementContains(titleTest, "Products");
});

Then('uma mensagem de erro é apresentada', { timeout: timeout }, async function () {
  const errorMessage = await loginPage.getErrorMessageText();
  assert.assertElementContains(errorMessage, "Username and password do not match any user in this service");
});