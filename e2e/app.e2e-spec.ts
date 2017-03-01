import { DzdemoPage } from './app.po';

describe('dzdemo App', () => {
  let page: DzdemoPage;

  beforeEach(() => {
    page = new DzdemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
