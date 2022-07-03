package test;

import drivers.driverFactory;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

import static org.testng.AssertJUnit.assertEquals;

/*
Test Steps:
1. Goto http://live.techpanda.org/
2. Click on �MOBILE� menu
3. In the list of all mobile , click on �ADD TO CART� for Sony Xperia mobile
4. Change �QTY� value to 1000 and click �UPDATE� button. Expected that an error is displayed
"The requested quantity for "Sony Xperia" is not available.
5. Verify the error message
6. Then click on �EMPTY CART� link in the footer of list of all mobiles. A message "SHOPPING CART IS EMPTY" is shown.
7. Verify cart is empty
*/
@Test
public class testcase8 {
    //step1

    public static void testLeftClickHandle() {
        //1. Init web-driver session
        WebDriver driver = driverFactory.getChromeDriver();
        try {
            driver.get("https://bitis.com.vn/");

            By leftClickPlace = new By.ByXPath("//*[@id='notifyCoupon']");

            WebElement leftClickPlaceElem = driver.findElement(leftClickPlace);
            leftClickPlaceElem.click();

            By addCart= new By.ByXPath("//section[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/a[1]/img[1]");
            WebElement add = driver.findElement(addCart);
            add.click();

            By ClickSize = new By.ByXPath("//div[3]/form[1]/div[1]/div[2]/span[1]");

            WebElement ClickSizeElem = driver.findElement(ClickSize);
            ClickSizeElem.click();
            By ClickBuy = new By.ByXPath("//div[1]/div[2]/div[3]/form[1]/div[4]/button[1]");

            WebElement ClickBuyElem = driver.findElement(ClickBuy);
            ClickBuyElem.click();

            By ClickBuyBitis = new By.ByXPath("//div[1]/div[2]/div[3]/form[1]/div[4]/button[1]");

            WebElement ClickBuyBitisElem = driver.findElement(ClickBuyBitis);
            ClickBuyBitisElem.click();

            Thread.sleep(2000);

            // This is to refresh the page and remove the triggered context me
        } catch (Exception e) {
            e.printStackTrace();
        }

        //7. Quit browser session
        driver.quit();
    }

}