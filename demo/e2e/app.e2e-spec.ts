import { NgxBarRatingPage } from './app.po';

describe('ngx-bar-rating App', () => {
  let page: NgxBarRatingPage;

  beforeEach(() => {
    page = new NgxBarRatingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
