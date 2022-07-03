package test;

import drivers.driverFactory;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.testng.annotations.Test;

import static org.testng.AssertJUnit.assertEquals;
/* The next scenario is “Verify you can create account in E-commerce site and can share wishlist to other people using email”

        Detailed Test Case is below

/* Verify can create an account in e-Commerce site and can share wishlist to other poeple using email.
Test Steps:
1. Go to https://bitis.com.vn/account/register
2. Click on my account link
3. Click Create an Account link and fill New User information except Email ID
4. Click Register
5. Verify Registration is done. Expected account registration done.
6. Go to TV menu
7. Add product in your wish list - use product - LG LCD
8. Click SHARE WISHLIST
9. In next page enter Email and a message and click SHARE WISHLIST
10.Check wishlist is shared. Expected wishlist shared successfully.
*/
@Test
public class testcase6 {
    //step1

    public static void testLeftClickHandle() {
        //1. Init web-driver session
        WebDriver driver = driverFactory.getChromeDriver();
        try {
            //step1
            driver.get("https://bitis.com.vn/account/register");
            //dấu x
            By buttonClickPlace = new By.ByXPath("//*[@id='notifyCoupon']");
            WebElement buttonClickPlaceElem = driver.findElement(buttonClickPlace);
            buttonClickPlaceElem.click();

            //register
            By leftClickPlace = new By.ByXPath("//div[1]/div[6]/span[3]/a[1]");
            WebElement leftClickPlaceElem = driver.findElement(leftClickPlace);
            leftClickPlaceElem.click();

            //step4:
            //first name
            By name= new By.ByXPath("//div[1]/form[1]/div[1]/input[1]");
            WebElement nameEle = driver.findElement(name);
            nameEle.sendKeys("Nguyen");
//            Thread.sleep(2000);
            //last name
            By lastname= new By.ByXPath("//form[1]/div[2]/input[1]");
            WebElement lastnameEle = driver.findElement(lastname);
            lastnameEle.sendKeys("A");
//            Thread.sleep(2000);
            //email
            By email= new By.ByXPath("//form[1]/div[3]/input[1]");
            WebElement emailEle = driver.findElement(email);
            emailEle.sendKeys("trung@ethan-tech.com");
//            Thread.sleep(2000);
            //pass
            By pass= new By.ByXPath("//form[1]/div[4]/input[1]\n");
            WebElement passEle = driver.findElement(pass);
            passEle.sendKeys("Abc1234567");
//            Thread.sleep(2000);

            By rightClickPlace = new By.ByXPath("//div[1]/form[1]/div[5]/input[1]");

            WebElement rightClickPlaceElem = driver.findElement(rightClickPlace);
            rightClickPlaceElem.click();

        } catch (Exception e) {
            e.printStackTrace();
        }

//        //7. Quit browser session
//        driver.quit();
    }

}

