import { ML1OPBSPage } from './app.po';

describe('m-l1-opbs App', function() {
  let page: ML1OPBSPage;

  beforeEach(() => {
    page = new ML1OPBSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
