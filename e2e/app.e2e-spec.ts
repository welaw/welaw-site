import { Welaw.OrgPage } from './app.po';

describe('welaw.org App', () => {
  let page: Welaw.OrgPage;

  beforeEach(() => {
    page = new Welaw.OrgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
