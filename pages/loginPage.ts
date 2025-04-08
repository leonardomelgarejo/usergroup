import { type Page } from '@playwright/test';
import PlaywrightWrapper from '../helper/wrapper/playwrightWrappers';

export default class LoginPage {

  private base: PlaywrightWrapper;

  constructor(private page: Page){
    this.base = new PlaywrightWrapper(page);
  }

  private Elements = {
    swagLabsText: "Swag Labs",
    userNameLocator: "[data-test='username']",
    passwordLocator: "[data-test='password']",
    loginButtonLocator: "[data-test='login-button']",
    productsTitleLocator: "[data-test='title']",
    errorMessageLocator: "[data-test='error']"
  }

  async goto(BASEURL: string){
    await this.base.goto(BASEURL);
  }

  async getSwagLabsText(){
    return await this.base.getByText(this.Elements.swagLabsText);
  }

  async fillUserName(text: string){
    await this.base.fill(this.Elements.userNameLocator, text);
  }

  async fillPassword(text: string){
    await this.base.fill(this.Elements.passwordLocator, text);
  }

  async waitAndClickLoginButton(){
    await this.base.waitAndClick(this.Elements.loginButtonLocator);
  }

  async getProductsText(){
    return await this.base.getTextByLocator(this.Elements.productsTitleLocator);
  }

  async getErrorMessageText(){
    return await this.base.getTextByLocator(this.Elements.errorMessageLocator);
  }

}