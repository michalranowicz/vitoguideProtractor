import { browser, by, element, ExpectedConditions} from 'protractor';

function entryToDemoMode(){
    const DemoButton = element(by.id('gtm_run-demo-btn'));
    browser.wait(ExpectedConditions.presenceOf(DemoButton), 5000);
    DemoButton.click();
    browser.sleep(1000)
}

function openSideMenu(){
    const menuButton = element(by.css('vi-sidenav-button'));
    browser.wait(ExpectedConditions.presenceOf(menuButton), 5000);
    menuButton.click();
    browser.sleep(1000)
};
function clickSideMenuItem(item){
    const sideNavSettingItem = element(by.xpath(`//a[@href="/${item}"]`));
        sideNavSettingItem.click();
};
function getAllInstalationItems (){
    element.all(by.css('app-installation-item')).count().then(function (count: number){
        return count
    });
};
function filterWorkingButtonNumber(){
    element(by.css('app-chip-filter[data-at-filter=working] div span + span')).getText().then(function(text){
        return text
    });
}
function exitDemoMode (){
    const exitDemo = element(by.css('button[gtm=onGoToPage]'));
    exitDemo.click()
}

describe('Test strony startowej Vitoguide.com', () => {
    beforeAll(()=>{
        browser.waitForAngularEnabled(false);
        browser.get('https://vitoguide.viessmann.com/home');
        ///
        //the code doesn't locate the element in the shadow DOM at this point. To continue, click the Accept button.
        ///

        browser.waitForAngular('false');
        // const acceptCookiesButton = element(by.deepCss('#uc-center-container > div.sc-jcFjpl.eUKJSw > div > div > div > button.sc-gsDKAQ.yYuSQ'));
        // const acceptCookiesButton = element(by.deepCss('button[data-testid=uc-accept-all-button]'));

        

    })
    it('the title of the page should contain the word Vitoguide', () => {
         expect(browser.getTitle()).toContain('Vitoguide');

    });
    it('after clicking the button "try the demo" we go to the next page', function() {
        entryToDemoMode()
        expect(browser.getCurrentUrl()).toMatch('installations');
      });
    it('click menu button and check name of user', function() {
        openSideMenu();
        const userNameInfo = element(by.css('div.user-name'));
        browser.wait(ExpectedConditions.visibilityOf(userNameInfo));
        userNameInfo.getText().then((text)=>{
            expect(text).toEqual('Hans Zimmer')
        })
    });
    it('open side menu setting item and open setting page ', function() {
        clickSideMenuItem('settings')
        expect(browser.getCurrentUrl()).toMatch('settings');   
        
      });
    it('click units button and change units to Fahrenheit ', function() {
        const settingsButton = element.all(by.css('button.mat-focus-indicator span')).filter(function(elem,index){
                return elem.getText().then((text)=>{
                    return text ==='Fahrenheit';
                })
        });
        settingsButton.click();
        browser.sleep(10000);    
    });
    it('open side menu and select instalation item', function(){
        openSideMenu();
        clickSideMenuItem('installations');
        expect(browser.getCurrentUrl()).toMatch('installations');
        
    });
    it('filtering only working devices',function(){
        const filterWorkingButton = element(by.css('app-chip-filter[data-at-filter=working]'))
        filterWorkingButton.click()
        browser.sleep(10000); 
    })
    it('checking if the number of working devices is equal to the value on the button',function(){
        const numberOfResults = getAllInstalationItems();
        const numberFromButton = filterWorkingButtonNumber()
       
        expect(numberFromButton).toEqual(numberOfResults)
    })
    it('exit demo mode',function(){
        exitDemoMode();

        expect(browser.getCurrentUrl()).toMatch('home');
    })
  
});

